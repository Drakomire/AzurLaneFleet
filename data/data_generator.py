"""
This generates the JSON files used by the fleetmaker with Perseus
"""

import perseus
import json

# from data import perseus

api = perseus.Perseus()

STAT_KEYWORDS = {
  "durability": "hp",
  "cannon" : "fp",
  "antiaircraft" : "aa",
  "torpedo" : "trp",
  "air" : "avi",
  "reload" : "rld",
  "dodge" : "eva",
  "hit" : "acc"
}


#Open the retrofit file
f = open("perseus/ships/data/retrofit.json", "r", encoding='utf-8')
retrofit = json.loads(f.read())
f.close()

ship_vue = []
ship_json = {}
for ship in api.getAllShips():
    try:
        ship_retrofit_image = ship.skins[0]["thumbnail"] if not ship.retrofit else ship.skins[len(ship.skins)-1]["thumbnail"]
        ship_retrofit_rarity = ship.ship["data"][str(int(ship.getRetrofitShipID())*10+1)]["rarity"]-1

        if ship.retrofit:
            ship_retrofit_rarity+=1

        ship_vue += [{
            "id" : ship.id,
            "thumbnail" : ship_retrofit_image,
            "name_en" : ship.name_en or ship.name_cn,
            "name_jp" : ship.name_jp,
            "name_cn" : ship.name_cn,
            "nationality" : ship.ship["nationality"],
            "type" : ship.hull_id,
            "rarity" : ship_retrofit_rarity

        }]

        ship_json[ship.id] = ship.ship
        ship_json[ship.id]["data"] = {(int(k)%10-1 if count < 4 else "retrofit"):v for count,(k,v) in enumerate(ship.ship["data"].items())}

        if ("retrofit" in ship_json[ship.id]):
            for node in ship_json[ship.id]["retrofit"]:
                node["max_level"] = retrofit[str(node["node"])]["max_level"]
                node["use_ship"] = retrofit[str(node["node"])]["use_ship"]
                node["gear_score"] = retrofit[str(node["node"])]["gear_score"]
                node["skin_id"] = retrofit[str(node["node"])]["skin_id"]
                node["effect"] = retrofit[str(node["node"])]["effect"]

                for effect in node["effect"]:
                    key = list(effect.keys())
                    key = key[0]
                    stat_key = key
                    if key in STAT_KEYWORDS:
                        stat_key = STAT_KEYWORDS[key]
                    effect[stat_key] = effect[key]
                    if (stat_key != key): del effect[key]

                node["ship_id"] = retrofit[str(node["node"])]["ship_id"]
                node["name"] = retrofit[str(node["node"])]["name"]
                node["condition_id"] = retrofit[str(node["node"])]["condition_id"]
                node["star_limit"] = retrofit[str(node["node"])]["star_limit"]
                node["level_limit"] = retrofit[str(node["node"])]["level_limit"]

    except IndexError:
        print(ship.name)
        continue

ship_vue.sort(key=lambda x: x["name_en"])
ship_vue.sort(key=lambda x: x["rarity"], reverse=True)

f = open("ships.json","w", encoding='utf-8')
f.write(json.dumps(ship_vue,ensure_ascii=False))
f.close()

f = open("ship_data.json","w", encoding='utf-8')
f.write(json.dumps(ship_json,ensure_ascii=False))
f.close()

gear_vue = []
gear_json = {}

for gear in api.getAllGear():
    try:
        gear_vue += [{
            "id" : gear.id,
            "name_en" : gear.name,
            "name_jp" : gear.name_jp,
            "name_cn" : gear.name_cn,
            "icon" : gear.icon,
            "rarity" : gear.rarity-1
        }]

        gear_json[gear.id] = {
        "nationality": gear.nationality,
        "type": gear.type_id,
        "attribute_2": None,
        "rarity": gear.rarity,
        "tech": 0,
        "ammo": 10,
        "ammo_icon": [],
        "id": int(gear.id),
        "icon": gear.id,
        "ship_type_forbidden": gear.ship_type_forbidden,
        "jp_name": gear.name_jp,
        "cn_name": gear.name_cn,
        "en_name": gear.name_en,
        "equip_limit": gear.equip_limit
    },

    except IndexError:
        continue

gear_vue.sort(key=lambda x: x["rarity"], reverse=True)

f = open("gear.json","w", encoding='utf-8')
f.write(json.dumps(gear_vue,ensure_ascii=False))
f.close()