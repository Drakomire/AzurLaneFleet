import json
import os
from .nicknames import *
from .stats import *
from .retrofit import *
from .skills import *
from .__init__ import *

class Ship:
    def __init__(self,ship,
    level: int=120,
    limit_break : int=3,
    enhancements : bool=True,
    affinity: int=100,
    oathed :bool=False,
    retrofit :bool=True,
    nicknames :bool=False
    ):
        """
        :param ship: The ship's ID as int or name as String
        :param level:
        :param limit_break:
        :param enhancements: Boolean whether enhancements are used.
        :param affinity:
        :param oathed: Boolean if oathed.
        :param retrofit: Boolean if retrofit. Turns to false if the ship doesn't have a retrofit.

        Config Options
        :param nicknames: Boolean if nicknames DB should be used.

        :return: None
        """

        if (type(ship) == int):
            self.id = str(ship)
            #Check if retrofited ship ID. Convert to normal ship ID.
            if self.id in retrofit_id_lookup_table:
                self.id = str(retrofit_id_lookup_table[self.id])
        else:
            #Nicknames
            if (nicknames):
                ship = getNickname(ship).lower()
            else:
                ship = ship.lower()

            if (ship in lookup_table):
                self.id = str(lookup_table[ship])
                self.ship = ships[self.id]
            else:
                raise UnknownShipError('Ship name is not valid')

        try:
            self.ship = ships[self.id]
            self.level = level
            self.limit_break = limit_break
            self.affinity = affinity
            self.oathed = oathed
            self.enhancements = enhancements

            #Turn retrofit to false by defualt if the ship does not have one
            if (retrofit == True):
                retrofit = "retrofit" in self.ship

            self.retrofit = retrofit

        except KeyError:
            raise UnknownShipError('Ship ID is not valid')

    @property
    def _full_id(self):
        index = self.getRetrofitShipID() * self.retrofit + self.id * (not self.retrofit)
        return str(int(index)*10 + self._limit_break)

    @property
    def name(self):
        return self.name_en

    @property
    def name_en(self):
        try:
            return self.ship["name"]["en"]
        except:
            return None

    @property
    def name_jp(self):
        try:
            return self.ship["name"]["jp"]
        except:
            return None

    @property
    def name_cn(self):
        try:
            return self.ship["name"]["cn"]
        except:
            return None

    @property
    def stats(self):
        '''
        :return: ship stats as per documentation
        '''
        try:
            return Stats.getStats(self)
        except:
            return "Invalid Limit Break"

    @property
    def limit_break(self):
        """
        :return: ship limit break value 0-3.
        """
        return self._limit_break-1

    @limit_break.setter
    def limit_break(self, val):
        """
        :return: set the _limit_break to 1-4.
        """
        self._limit_break = val+1

    @property
    def retrofit_id(self):
        """
        :return: ID of the retrofitted version of the ship
        """
        return str(self.getRetrofitShipID())

    @property
    def retrofit_nodes(self):
        """
        :return: Array of IDs of every retrofit node
        """
        if "retrofit" in self.ship:
            return self.ship["retrofit"]
        else:
            return None

    def getRetrofitStats(self):
        """
        :return: stat boost from full retrofit.
        """
        try:
            return Retrofit.getRetrofitStats(self)
        except KeyError:
            return None

    def getRetrofitShipID(self):
        """
        :return: Retrofited ship ID if the ship has one. Otherwise returns regular ID.
        """
        return Retrofit.getRetrofitShipID(self)

    @property
    def hull_type(self):
        """
        :return: Hull type name in game.
        """
        return types[str(self.hull_id)]["en"]

    @property
    def hull_id(self):
        """
        :return: the hull type ID
        """
        if "retrofit" in self.ship and self.retrofit:
            try: return self.ship["data"][self.getRetrofitShipID()]["type"]
            except KeyError: return self.ship["type"]
        else:
            return self.ship["type"]

    @property
    def armor_type(self):
        """
        :return: armor name as in game
        """
        return ARMOR_TYPE[self.armor_id]

    @property
    def armor_id(self):
        """
        :return: the ID for the armor type
        """
        return self.ship["armor"]

    def getSkills(self,level=0):
        return Skill.getSkills(self,level=level)

    @property
    def skins(self):
        out = []
        for thumbnail in self.ship["skin_thumbnails"]:
            thumbnail = thumbnail.split("/")
            thumbnail[len(thumbnail)-1] = thumbnail[len(thumbnail)-1].lower()
            thumbnail = '/'.join(thumbnail)
            out += [{
                "thumbnail" : thumbnail
            }]
        return out

    @property
    def stats_growth(self):
        try:
            return self.ship["data"][str(int(self.getRetrofitShipID())*10+4)]["stats_growth"]
        except:
            return self.ship["data"][str(int(self.getRetrofitShipID())*10+1)]["stats_growth"]

    @property
    def stats_growth_extra(self):
        try:
            return self.ship["data"][str(int(self.getRetrofitShipID())*10+4)]["stats_growth_extra"]
        except:
            return self.ship["data"][str(int(self.getRetrofitShipID())*10+1)]["stats_growth_extra"]

    @property
    def hunting_range(self):
        return self.ship["hunting_range"]

    @property
    def base_list(self):
        return self.ship["data"][self._full_id]["base_list"]

    @property
    def slots(self):
        return self.ship["slots"]

    def __str__(self):
        return str(self.name)
#
# s = Ship("Hyuuga",retrofit=False)
# print(s.id)
# print(s.getRetrofitShipID())
# print(s.stats)
