"""
Import requirements
"""

from .download import init as initiate
initiate()
from .ships.ship import Ship, ships
from .gear.gear import Gear, gear

#Set up the API class
class Perseus:
    def __init__(self):
        pass

    def initiate(self,**kwargs):
        initiate(**kwargs)

    @property
    def Ship(self):
        return Ship

    @property
    def Gear(self):
        return Gear

    def getAllShips(self,*args,**kwargs):
        out = []
        for key in ships:
            out += [Ship(int(key),**kwargs)]
        return out

    def getAllGear(self,*args,**kwargs):
        out = []
        for key in gear:
            out += [Gear(int(key),**kwargs)]
        return out
