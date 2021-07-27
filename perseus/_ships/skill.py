from .retrofit import Retrofit
from .skills.parser import parse
from .__init__ import Pos

class Skill:
    @staticmethod
    def apply_skill(ship, gear, *skills, pos: Pos = Pos.UNKOWN) -> list:
        #TODO allow gaer

        out = []
        for skill in skills:
            out += parse(ship,skill,Pos._skillDef(pos))
        return out

    def __init__(self,ship,loc) -> None:
        self.data = ship.ship["skills"][loc]

    @property
    def id(self):
        return self.data["id"]

    @property
    def _game_effect(self) -> list:
        return self.data["game_effect"]

    @property
    def description(self):
        return self.data["description"]["en"]