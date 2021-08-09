from .._util import Lang

class SkillDescript:
    @staticmethod
    def getSkillAtLevel(skill,level :int, lang: str) -> dict:
        lang = Lang._value(lang)
        description = skill["desc"][lang]
        for index,val in enumerate(skill["desc_add"]):
            max_level = len(skill["desc_add"][index])
            r = ""
            if (level != 0):
                if (len(val[level-1]) == 1):
                    r = val[level-1][0]
                else:
                    r = val[level-1][0] + " (" + val[level-1][1] + ")"
            else:
                r = val[0][0] + " (" + val[max_level-1][0] + ")"

            description = description.replace("$" + str(index+1), r)

        return {
            "name" : skill["name"][lang],
            "description" : description,
            "id" : skill["id"]
        }

    @staticmethod
    def getSkills(ship,level=0,lang=Lang.EN):
        """
        :param ship: Ship object
        :returns: 2d array of skills
        """
        out = []
        for skill in ship.ship["skills"]:
            out += [SkillDescript.getSkillAtLevel(skill,level,lang)]
        return out

    @staticmethod
    #The function is designed for bots and printing to the wiki. For that reason, only english is supported.
    def prettyPrintSkills(ship) -> dict:
        skills = ship.getSkills()
        skills_jp = ship.getSkills(lang=Lang.JP)
        skills_cn = ship.getSkills(lang=Lang.CN)

        aoa = ship.getAllOutAssaults()
        aoa_jp = ship.getAllOutAssaults(lang=Lang.JP)
        aoa_cn = ship.getAllOutAssaults(lang=Lang.CN)

        out = [
        {
            "name" : skills[i]["name"],
            "name_jp" : skills_jp[i]["name"],
            "name_cn" :  skills_cn[i]["name"],
            "description" : skills[i]["description"],
        }
        for i in range(len(skills))
        ]
        
        if aoa != None:
            #First and second AoA are class barrages.
            #Third AoA belongs to retrofits.

            for i,val in enumerate(aoa):
                aoa[i] = val["description"].split(" ")

            level_one_occurrence = aoa[0][-7]
            level_two_occurrence = aoa[1][-7]

            barrage_name = ship.ship_class

            out += [{
                "name" : "All out Assault",
                "name_jp" : aoa_jp[-1]["name"],
                "name_cn" : aoa_cn[-1]["name"],
                "description" : f"Every {level_one_occurrence} ({level_two_occurrence}) times the main gun is fired, trigger Full Barrage - {barrage_name} I (II)."
            }]

            if len(aoa) > 2:
                retrofit_occurrence = aoa[2][-7]
                out[-1]["description"] += f"\n(Upon retrofit) Every {retrofit_occurrence} times the main gun is fired, trigger Full Barrage - {barrage_name}. "

        return out
