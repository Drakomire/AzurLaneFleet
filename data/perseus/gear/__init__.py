import json
import os

script_dir = os.path.dirname(__file__)

f = open(os.path.join(script_dir,"data/gear.json"), "r")
gear = json.loads(f.read())
