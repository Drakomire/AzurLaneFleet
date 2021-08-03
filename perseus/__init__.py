"""
Import requirements
"""

from typing import Generator
from PIL import Image
from io import BytesIO
import requests
from ._util import Lang, _APIObject
from ._ships.ship import _Ship
from ._gear.gear import _Gear
from ._ships import Pos

#Erros so user can catch them
from ._util._erros import PerseusAPIError, PerseusAPIConnectionError, PerseusAPIPathNotFoundError, PerseusAPIReturnError

#Set up the API class
class Perseus(_APIObject):
    def __init__(self, url="http://perseusapi.duckdns.org:5000"):
        super().__init__(url)

    def Ship(self, *args, **kwargs):
        return _Ship(self.url,*args,**kwargs)

    def Gear(self,*args,**kwargs):
        return _Gear(self.url,*args,**kwargs)

    def update(self):
        self.initiate()

    def getAllShipNames(self,lang: Lang=Lang.EN):
        return self._getFromAPI(f"ship/all_names?{lang=}")

    def getAllShips(self,*args,**kwargs) -> Generator:
        for i in self._getFromAPI(f"ship/all_ids"):
            yield self.Ship(i,*args,**kwargs)

    def getAllGear(self,*args,**kwargs):
        for i in self._getFromAPI(f"gear/all_ids"):
            yield self.Gear(i//10,*args,**kwargs)

    def downloadImage(self,url):
        req = requests.get(url)
        if req.status_code == 200:
            return Image.open(BytesIO(req.content))
        else:
            req = requests.get("https://raw.githubusercontent.com/Drakomire/perseus-data/master/AzurLaneImages/assets/artresource/atlas/squareicon/unknown.png")
            return Image.open(BytesIO(req.content))
