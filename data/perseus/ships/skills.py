class Skill:
    @staticmethod
    def getSkillAtLevel(skill,level :int):
        description = skill["desc"]
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
            "name" : skill["name"],
            "description" : description,
            "id" : skill["id"]
        }

    @staticmethod
    def getSkills(ship,level=0):
        """
        :param ship: Ship object
        :returns: 2d array of skills
        """
        out = []
        for skill in ship.ship["skills"]:
            out += [Skill.getSkillAtLevel(skill,level)]
        return out
