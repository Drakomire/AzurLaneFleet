from functools import lru_cache, cached_property
from sys import maxsize
from .nicknames import *
from .stats import *
from .retrofit import *
from .skill_descript import SkillDescript as Skill
from .skill import Skill
from .__init__ import STAT_KEYWORDS
from .._util import _APIObject, Lang

class _Ship(_APIObject):
    @lru_cache(maxsize=70)
    def __init__(self,
    url,
    ship,
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

        super().__init__(url)
        res = self._getFromAPI(f"ship/{ship}?{nicknames=}")

        self.ship = res
        self.level = level
        self.limit_break = limit_break
        self.enhancements = enhancements
        self.affinity = affinity
        self.oathed = oathed
        self.retrofit = retrofit

        self.id = str(self.ship["id"])

    @property
    def _full_id(self):
        #Bulins don't have any limit breaks
        lb = self._limit_break
        if self.id in ["10000", "10001", "10002"]:
            lb = 1
        index = self.getRetrofitShipID() * self.retrofit + self.id * (not self.retrofit)
        return str(int(index)*10 + lb)

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
    def rarity_id(self):
        return self.ship["data"][self._full_id]["rarity"]

    @property
    def rarity(self):
        return self.ship["data"][self._full_id]["rarity_name"]

    @property
    def ship_class(self):
        tags = self.ship["data"][self._full_id]["tags"]
        if len(tags)==1:
            return tags[0].replace("-"," ")
        for tag in tags:
            if "Class" in tag:
                tmp = tag.replace("-"," ")
                if tmp == "Plan Class":
                    #Wiki uses the ship's name for PR.
                    return self.name
                else:
                    return tmp

        return self.name



    @property
    def stats(self):
        '''
        :return: ship stats as per documentation
        '''
        # try:
        return Stats.getStats(self)
        # except:
        #     return "Invalid Limit Break"

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
    def limit_break_text(self):
        return self.ship["limit_break_text"]

    @property
    def efficiency(self) -> list:
        return self.ship["data"][self._full_id]["efficiency"]

    @property
    def has_retrofit(self) -> bool:
        return "retrofit" in self.ship

    @property
    def retrofit(self) -> bool:
        return self._retrofit

    @retrofit.setter
    def retrofit(self, val: bool) -> None:
        if self.has_retrofit:
            self._retrofit = val
        else:
            self._retrofit = False

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

    @lru_cache(maxsize=1)
    def getRetrofitStats(self):
        """
        :return: stat boost from full retrofit.
        """
        try:
            return Retrofit.getRetrofitStats(self)
        except KeyError:
            return None

    def getRetrofitShipID(self) -> int:
        """
        :return: Retrofited ship ID if the ship has one. Otherwise returns regular ID.
        """
        return Retrofit.getRetrofitShipID(self)

    @property
    def hull_type(self):
        """
        :return: Hull type name in game.
        """
        return self.ship["data"][self._full_id]["type_name"][Lang._value(Lang.EN)]


    @property
    def hull_id(self):
        """
        :return: the hull type ID
        """
        if "retrofit" in self.ship and self.retrofit:
            try: return self.ship["data"][self._full_id]["type"]
            except KeyError: return self.ship["type"]
        else:
            return self.ship["type"]

    @property
    def armor_type(self):
        """
        :return: armor name as in game
        """
        return self.ship["armor_name"]

    @property
    def armor_id(self):
        """
        :return: the ID for the armor type
        """
        return self.ship["armor"]

    @property
    def skills(self):
        out = []
        for index,skill in enumerate(self.ship["skills"]):
            out += [
                Skill(self,index)
            ]
        return out

    @lru_cache
    def getSkills(self,lang=Lang.EN,level=0):
        return Skill.getSkills(self,lang=lang,level=level)

    @lru_cache
    def getAllOutAssaults(self,lang=Lang.EN):
        lang = Lang._value(lang)
        tmp = self.ship["all_out_assaults"]
        if tmp == []: return None
        else: return [
            {
                "name" : aoa["name"][lang],
                "description" : aoa["desc"][lang]
            }
            for aoa in tmp
            ]

    @lru_cache
    def getFormattedSkills(self):
        return Skill.prettyPrintSkills(self)

    @property
    def skins(self):
        return self.ship["skins"]

    @property
    def stats_growth(self):
        return self.ship["data"][self._full_id]["stats_growth"]

    @property
    def stats_growth_extra(self):
        return self.ship["data"][self._full_id]["stats_growth_extra"]

    @property
    def hunting_range(self):
        return self.ship["hunting_range"]

    @property
    def base_list(self):
        return self.ship["data"][self._full_id]["base_list"]

    @property
    def slot_ids(self):
        return self.ship["data"][self._full_id]["slots"]

    @property
    def team_type(self):
        return self.ship["data"][self._full_id]["team_type"]

    @property
    def slot_names(self):
        return self.ship["data"][self._full_id]["slot_names"]

    @property
    def nationality(self):
        return self.ship["nationality_name"]

    @property
    def nationality_id(self):
        return self.ship["nationality"]
