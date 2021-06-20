"""
This generates the JSON files used by the fleetmaker with Perseus
"""

import json
from perseus import Perseus
api = Perseus()

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
            "type" : ship.hull_type,
            "rarity" : ship_retrofit_rarity
        }]

        ship_json[ship.id] = {
		"nationality": ship.ship["nationality"],
		"type": ship.hull_id,
		"base_list": [
			1,
			1,
			1
		],
		"min_efficiency_list": [
			100,
			100,
			100
		],
		"efficiency_list": [
			100,
			100,
			100
		],
		"id": int(ship.id),
		"skin_id": int(ship.id),
		"star": ship.ship["data"][str(int(ship.getRetrofitShipID())*10+1)]["stars"],
		"rarity": ship_retrofit_rarity,
		"retro": 0,
		"uni_id": ship.id,
		"painting": ship_retrofit_image,
		"star_string": "★★★★",
		"rarity_string": "SR",
		"jp_name": ship.name_jp,
		"en_name": ship.name_en,
		"cn_name": ship.name_cn,
		"stats": ship.stats,
		"equip_1": ship.slots[0],
		"equip_2": ship.slots[1],
		"equip_3": ship.slots[2],
		"equip_4": ship.slots[3],
		"equip_5": ship.slots[4]
        }

    except IndexError:
        continue

ship_vue.sort(key=lambda x: x["name_en"])
ship_vue.sort(key=lambda x: x["rarity"], reverse=True)

f = open("ships.json","w")
f.write(json.dumps(ship_vue,ensure_ascii=False))
f.close()

f = open("ship_data.json","w")
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

f = open("gear.json","w")
f.write(json.dumps(gear_vue,ensure_ascii=False))
f.close()