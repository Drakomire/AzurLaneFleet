"""
Download constants and open files
This should be rerun when init() is run to refresh the data
"""


import json
import os
from .nicknames import *

#Constants
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

ARMOR_TYPE = {
  1 : "Light",
  2 : "Medium",
  3 : "Heavy"
}

SHIP_LOCATION = {
  1: "Vanguard",
  2: "Vanguard",
  3: "Vanguard",
  4: "Main Fleet",
  5: "Main Fleet",
  6: "Main Fleet",
  7: "Main Fleet",
  8: "Submarine",
  9: "Vanguard",
  10: "Main Fleet",
  11: "Vanguard",
  12: "Main Fleet",
  13: "Main Fleet",
  17: "Submarine",
  18: "Vanguard",
  19: "Vanguard"
}

class UnknownShipError(Exception):
  pass

#Files
script_dir = os.path.dirname(__file__)

f = open(os.path.join(script_dir,"data/skills.json"), "r")
skills = json.loads(f.read());

f = open(os.path.join(script_dir,"data/ships.json"), "r")
ships = json.loads(f.read());

f = open(os.path.join(script_dir,"data/types.json"), "r")
types = json.loads(f.read());

f = open(os.path.join(script_dir,"data/lookup_table.json"), "r")
lookup_table = json.loads(f.read());

f = open(os.path.join(script_dir,"data/retrofit_id_lookup_table.json"), "r")
retrofit_id_lookup_table = json.loads(f.read());
f.close()

f = open(os.path.join(script_dir,"data/retrofit.json"), "r")
retrofit = json.loads(f.read());
f.close()

f = open(os.path.join(script_dir,"data/nicknames.json"), "r")
nicknames = json.loads(f.read());
f.close()
