import math
from os import stat
from .__init__ import *

class Stats:
    @staticmethod
    def calculateStat(stat,ship):
        '''
        :param stat: the stat to calculate.
        :param ship: the Ship class for the ship to calculate the stats of.
        :return: ships stats at the current level
        '''
        index = ship._full_id

        attr = ship.ship["data"][index]["stats"][stat]
        attrs_growth = ship.ship["data"][index]["stats_growth"][stat]
        attrs_growth_extra = ship.ship["data"][index]["stats_growth_extra"][stat]

        #Set defualt affinity_multiplier
        affinity_multiplier = 1

        if (stat != "spd" and stat != "luk"):
            if (ship.oathed):
                if (ship.affinity < 200):
                    affinity_multiplier = 1.09
                else:
                    affinity_multiplier = 1.12
            elif (ship.affinity <= 60):
                affinity_multiplier = 1
            elif (ship.affinity <= 80):
                affinity_multiplier = 1.01
            elif (ship.affinity <= 99):
                affinity_multiplier = 1.03
            elif (ship.affinity <= 100):
                affinity_multiplier = 1.06

        value = attr + (ship.level-1)*attrs_growth/1000 + (ship.level-100)*(attrs_growth_extra/1000)
        # Add enhancement values to the stat
        if (stat in ship.ship["enhancement"] and ship.enhancements):
            value += ship.ship["enhancement"][stat]

        value = math.floor(value*affinity_multiplier)

        #Add retrofit stat boost if retrofit
        if (ship.retrofit):
            retroStats = ship.getRetrofitStats()
            if (stat in retroStats):
                value += retroStats[stat]

        return value


    @staticmethod
    def getMaxOilCost(ship):
        '''
        :param ship: the Ship class for the ship to calculate the oil cost of.
        :return: ships oil cost at the current limit break. Rewrite is required to factor in level.
        '''
        index = ship._full_id
        return ship.ship["data"][index]["oil"]

    @staticmethod
    def getOilCostAtLevel(ship):
      #Submarines use a different oil cost equation than other hull classes
      max_cost = Stats.getMaxOilCost(ship)
      if (SHIP_LOCATION[ship.hull_id] == "Submarine"):
        return math.floor((max_cost+1)*(100+min(ship.level,99))/200)
      else:
        return math.floor(max_cost*(100+min(ship.level,99))/200)+1

    @staticmethod
    def getHuntingRange(ship):
        try: return ship.ship["hunting_range"]
        except: return None

    @staticmethod
    def getOxy(ship):
        index = ship._full_id
        try: return ship.ship["data"][index]["stats"]["oxy"]
        except: return None

    @staticmethod
    def getStats(ship):
        '''
        :param ship: the Ship class to calculate the stats of.
        :return: the stats for the ship as written in documentation.
        '''
        out = {
          "hp": Stats.calculateStat("hp",ship),
          "fp": Stats.calculateStat("fp",ship),
          "trp": Stats.calculateStat("trp",ship),
          "aa":  Stats.calculateStat("aa",ship),
          "avi": Stats.calculateStat("avi",ship),
          "rld": Stats.calculateStat("rld",ship),
          "acc": Stats.calculateStat("acc",ship),
          "eva": Stats.calculateStat("eva",ship),
          "spd": Stats.calculateStat("spd",ship),
          "luk": Stats.calculateStat("luk",ship),
          "asw": Stats.calculateStat("asw",ship),
          "oil" : Stats.getOilCostAtLevel(ship)
        }

        if (SHIP_LOCATION[ship.hull_id] == "Submarine"):
            out["oxy"] = Stats.getOxy(ship)
            # out["hunting_range"] = Stats.getHuntingRange(ship)

        return out

