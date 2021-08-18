from perseuspy.src.perseus import Perseus
import json
import time

print(Perseus)

api = Perseus()
ship_data_path = ["client/data/ship_data.js","./data/ship_data.json"]
equip_data_path = ["client/data/equip_data.js","./data/gear_data.json"]

last_time = time.time_ns()

debugmode = False


out = {}
for ship in api.getAllShips():
	if (debugmode):
		print(str((time.time_ns() - last_time) / 1000) + " - " + ship.name)
		last_time = time.time_ns()
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
		# "star_string": "★★★★",
		# "rarity_string": "SR",
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

for path in ship_data_path:
	f = open(path,"w",encoding="utf-8")
	if	path.split('.')[-1] == 'js':
		f.write(
			"var ship_data = " + json.dumps(out,ensure_ascii=False)
			)
	elif path.split('.')[-1] == 'json':
		f.write(
			json.dumps(out,ensure_ascii=False)
			)
	f.close()
if(debugmode == False):
	print(str((time.time_ns() - last_time) / 1000000000) + " - " + " finished loading ship data")



out = {}

last_time = time.time_ns()

for equip in api.getAllGear():
	if(debugmode):
		print(str((time.time_ns() - last_time) / 1000) + " - " + equip.name + " - " + str(equip.rarity))
		last_time = time.time_ns()
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
for path in equip_data_path:
	f = open(path,"w",encoding="utf-8")
	if	path.split('.')[-1] == 'js':
		f.write(
			"export default{" + json.dumps(out,ensure_ascii=False) + "}"
			)
	elif path.split('.')[-1] == 'json':
		f.write(
			json.dumps(out,ensure_ascii=False)
			)
	f.close()

if(debugmode == False):
	print(str((time.time_ns() - last_time) / 1000000000) + " - " + " finished loading equip data data")
