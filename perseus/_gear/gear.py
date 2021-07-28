from .._util import _APIObject

class _Gear(_APIObject):
    def __init__(self,url,gear_id,level=10):
        super().__init__(url)
        res = self._getFromAPI(f"gear/{gear_id}")

        self.id = str(gear_id)
        self.gear = res
        self.level = level

    @property
    def name(self):
        return self.nameEN

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
    def nationality_id(self):
        return self.gear["nationality"]

    @property
    def equip_limit(self):
        return self.gear["equip_limit"]
