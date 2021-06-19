from .__init__ import *

class Gear:
    def __init__(self,id,level=10):
        self.id = str(id)
        self.gear = gear[self.id]
        self.level = level

    @property
    def name(self):
        return self.name_en

    @property
    def name_en(self):
        try:
            return self.gear["name_EN"]
        except:
            return None

    @property
    def name_jp(self):
        try:
            return self.gear["name_JP"]
        except:
            return None

    @property
    def name_cn(self):
        try:
            return self.gear["name_CN"]
        except:
            return None

    @property
    def rarity(self):
        return self.gear["rarity"]

    @property
    def type_id(self):
        return self.gear["type"]

    @property
    def ship_type_forbidden(self):
        return self.gear["ship_type_forbidden"]

    @property
    def attribute(self):
        return self.gear["attribute"]

    @property
    def icon(self):
        return self.gear["image"]

    @property
    def nationality(self):
        return self.gear["nationality"]

    @property
    def equip_limit(self):
        return self.gear["equip_limit"]
