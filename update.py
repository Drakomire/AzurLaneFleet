from perseuspy.src.perseus import Perseus
import json

print(Perseus)

api = Perseus()

out = {}
for ship in api.getAllShips():
    print(ship.name)
    try:
        if ship.retrofit:
            thumbnail = ship.skins[-1]["thumbnail"]
        else:
            thumbnail = ship.skins[0]["thumbnail"]
    except Exception as e:
        continue

    out[str(ship.id) + "0"] = {
		"nationality": ship.nationality,
		"type": ship.hull_id,
		"base_list": [
			1,
			1,
			1
		],
		"id": int(ship.id)*10,
		"skin_id": int(ship.id)*10,
		"star": 0,
		"rarity": ship.rarity_id,
		"retro": ship.retrofit,
		"uni_id": str(ship.id)+"0",
		"painting": thumbnail,
		"star_string": "★★★★",
		"rarity_string": "SR",
		"jp_name": ship.name_jp,
		"en_name": ship.name_en,
		"cn_name": ship.name_cn,
		# "stats": ship.stats,
		"equip_1": ship.slot_ids[0],
		"equip_2": ship.slot_ids[1],
		"equip_3": ship.slot_ids[2],
		"equip_4": ship.slot_ids[3],
		"equip_5": ship.slot_ids[4]
    }

f = open("js/ship_data.js","w",encoding="utf-8")
f.write(\
    "var ship_data = " + json.dumps(out,ensure_ascii=False)
    )
f.close()

out = {}
for equip in api.getAllGear():
    print(equip.name_en)
    out[str(equip.id + "0")] = {
        "nationality": equip.nationality_id,
        "type": equip.type_id,
        "attribute_2": None,
        "rarity": equip.rarity,
        "tech": 0,
        "ammo": 10,
        "ammo_icon": [],
        "id": int(equip.id)*10,
        "icon": equip.icon,
        "ship_type_forbidden": equip.ship_type_forbidden,
        "jp_name": equip.name_jp,
        "cn_name": equip.name_cn,
        # "tw_name": equip.name_tw,
        "en_name": equip.name_en,
        "equip_limit": equip.equip_limit
    }

f = open("js/equip_data.js","w",encoding="utf-8")
f.write(\
    "var equip_data = " + json.dumps(out,ensure_ascii=False)
    )
f.close()