from .types import EFFECT_TYPES, addBuff

def parse(ship,buff,pos):
    return addBuff(ship,None,None,buff._game_effect,pos)