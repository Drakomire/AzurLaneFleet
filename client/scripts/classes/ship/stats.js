function calculateSingleStat(ship,stat){
    attr = ship_data[ship.id]["data"][ship.index]["stats"][stat]
    attrs_growth = ship_data[ship.id]["data"][ship.index]["stats_growth"][stat]
    attrs_growth_extra = ship_data[ship.id]["data"][ship.index]["stats_growth_extra"][stat]

    affinity_multiplier = 1

    if (stat != "spd" && stat != "luk"){
        if (ship.oathed){
            if (ship.affinity < 200){
                affinity_multiplier = 1.09
            }
            else{
                affinity_multiplier = 1.12
            }
        }
        else if (ship.affinity <= 60){
            affinity_multiplier = 1
        }
        else if (ship.affinity <= 80){
            affinity_multiplier = 1.01
        }
        else if (ship.affinity <= 99){
            affinity_multiplier = 1.03
        }
        else if (ship.affinity <= 100){
            affinity_multiplier = 1.06
        }
    }

    value = attr + (ship.level-1)*attrs_growth/1000 + (ship.level-100)*(attrs_growth_extra/1000)

    if (ship_data[ship.id].enhancement[stat] !== undefined){
        value += ship_data[ship.id].enhancement[stat]
    }

    value = Math.floor(value*affinity_multiplier)

    retro_stats = ship.retrofit_stats
    if (retro_stats[stat] !== undefined){
        value += retro_stats[stat]
    }

    return value
}

function getOilCost(ship){
    //Submarines use a different oil cost equation than other hull classes
    max_cost = ship_data[ship.id]["data"][ship.index]["oil"]
    console.log(max_cost)
    if ([8,17].includes(ship.hull_id))
      return Math.floor((max_cost+1)*(100+Math.min(ship.level,99))/200)
    else
      return Math.floor(max_cost*(100+Math.min(ship.level,99))/200)+1
}

function calculateStats(ship){
    out = {
        "hp": calculateSingleStat(ship,"hp"),
        "fp": calculateSingleStat(ship,"fp"),
        "trp": calculateSingleStat(ship,"trp"),
        "aa": calculateSingleStat(ship,"aa"),
        "avi": calculateSingleStat(ship,"avi"),
        "rld": calculateSingleStat(ship,"rld"),
        "acc": calculateSingleStat(ship,"acc"),
        "eva": calculateSingleStat(ship,"eva"),
        "spd": calculateSingleStat(ship,"spd"),
        "luk": calculateSingleStat(ship,"luk"),
        "oil" : getOilCost(ship)
    }
    //Submarine only stats
    if ([8,17].includes(ship.hull_id)){
        out.oxy = ship_data[ship.id]["data"][ship.index]["stats"]["oxy"]
    }
    return out
}