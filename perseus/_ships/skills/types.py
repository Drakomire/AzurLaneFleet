def next(func):
    def wrapper(ship,triggers,time,next,pos,**arg_list):
        return func(ship,next,pos,**arg_list)
    return wrapper

@next
def addSkill(ship,skills,pos,**kwargs):
    out = []
    for skill in skills:
        skill_type,arg_list,next = skill
        out += EFFECT_TYPES[skill_type](ship,None,None,next,pos,**arg_list)
    return out

@next
def addBuff(ship,buffs,pos,**kwargs):
    if "ship_type_list" in kwargs:
        if ship.hull_id not in kwargs["ship_type_list"]: return []
    if "nationality" in kwargs:
        if ship.nationality_id != kwargs["nationality"]: return []

    out = []
    for buff in buffs:
        buff_type,triggers,arg_list,time,next = buff
        #Check if ship passes triggers
        if not "onAttach" in triggers:
            if not pos in triggers:
                continue

        out += EFFECT_TYPES[buff_type](ship,triggers,time,next,pos,**arg_list)
    return out


def attr(func):
    def wrapper(ship,triggers,time,next,pos,**arg_list):

        return [{
            "duration":time,
            "effect" : func(**arg_list)
    
        }]
    return wrapper

@attr
def BattleBuffAddAttrRatio(attr: str="",number: int=0) -> str:
    return {attr:number/10000}

@attr
def BattleBuffAddAttr(attr: str="",number: int=0) -> str:
    return {attr:number}

@attr
def BattleBuffHP(maxHPRatio: int=0):
    return {"hp":maxHPRatio}

@attr
def BattleSkillFire(emitter: str="", weapon_id: int=0):
    return {emitter:weapon_id}
    
EFFECT_TYPES = {
    #Skill Cast Types
    "BattleBuffCastSkill" : addSkill,
    "BattleBuffAddBuff" : addBuff,
    "BattleBuffField" : addBuff,
    "BattleSkillAddBuff" : addBuff,


    #Skill Effect Types
    "BattleBuffAddAttrRatio" : BattleBuffAddAttrRatio,
    "BattleBuffAddAttr" : BattleBuffAddAttr,
    "BattleBuffHP" : BattleBuffHP,
    "BattleSkillFire" : BattleSkillFire,
}
