class Gear:
    def __init__(self,id,level=10):
        from .__init__ import gear

        self.id = str(id)
        self.gear = gear[self.id]
        self.level = level

    @property
    def name(self):
        return self.nameEN

    @property
    def nameEN(self):
        try:
            return self.gear["name_EN"]
        except:
            return None

    @property
    def nameJP(self):
        try:
            return self.gear["name_JP"]
        except:
            return None

    @property
    def nameCN(self):
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

