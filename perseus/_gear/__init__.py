import json
import os

script_dir = os.path.dirname(__file__)

def __init__():
    f = open(os.path.join(script_dir,"data/gear.json"), "r", encoding='utf-8')
    global gear
    gear = json.loads(f.read())
    f.close()