var damageData = [
    [//vanguard lead damage
        [5,30],//main gun
        [32,300],//secondary gun/torpedo
        [25,150],//barage / skill
    ],
    [
        [6,40],
        [1.5,12],
        [24,240]
    ],
    [
        [4,25],
        [8,50],
        [26,160]
    ],
    [
        [18,300],
        [4,25],
        [19,150]
    ],
    [
        [22,270],
        [4,25],
        [23,125]
    ],
    [
        [20,240],
        [4,25],
        [21,100]
    ]
]
var damageDate2 = {
    "flagship":{
        "fp":{}
    }
}
function getFleetDamageData(fleetDetails){
    let fleetDamageData={}
    let fleetType = (fleetDetails.surface)?"surface":"sub";
    Object.keys(fleetDetails[fleetType]).forEach(ship=>{
        let shipdata = fleetDetails[fleetType][ship]
        fleetDamageData[ship]={
            "fp":shipdata.stats.fp,
            "rld":shipdata.stats.rld,
            //TODO equip stats
            "equipFP":65+25+70+55,
            "equipRLD":0,
            "equip_1_rof_base":24.22,
            "equip_1_dmg_base":167*1.05*3*shipdata.base_list[0],//damage*weponmod*numofprojectiles*numofmounts
            "equip_1_preload":shipdata.preloads[0],

            "equip_2_rof_base":1.53,
            "equip_2_dmg_base":15*1.10*4*shipdata.base_list[1],//damage*weponmod*numofprojectiles*numofmounts
            "equip_2_preload":shipdata.preloads[1],
        }
        if([7,8,18].includes(shipdata.hull_id)){// to set values incase of 3 damage equips
            fleetDetails[ship].equip_3_rof_base = null
            fleetDetails[ship].equip_3_dmg_base = null//damage*weponmod*numofprojectiles*numofmounts
            fleetDetails[ship].equip_3_preload = null
        }
    })
    console.log(fleetDamageData)
}