const shipJsonIn = Object;
const equipJsonIn = Object;

var shipJsonOut = {}
var equipJsonOut = {}

function sortShipData(){
    shipJsonIn.forEach(ship=>{
        let tempShip = {}
        //set difrent Ship names values
        tempShip.name={
            "cn":ship.CNname,
            "jp":ship.JPname,
            "en":ship?.ENname??parseCode(ship.code),
            "code":ship.code,
        }
        //set ship base stats
        tempShip.stats={
            "health": ship.hp,
            "armor": ship.armor,
            "reload": ship.reload,
            "luck": ship.luck,
            "firepower": ship.fp,
            "torpedo": ship.trp,
            "evasion": ship.eva,
            "speed": ship.spd,
            "antiair": ship.aa,
            "aviation": ship.avi,
            "oilConsumption": ship.cost,
            "accuracy": ship.acc,
            "antisubmarineWarfare": ship.asw
        }
        // set ship extradata values
        tempShip.extraData={
            "shipID":ship.Uid,
            "rarity":{
                "string":ship.rarity,
                "numeric":null,
            },
            "type":ship.type,
            "growth":{
                "100":{
                    "health": ship.hpGrowth100,
                    "armor": ship.armorGrowth100,
                    "reload": ship.reloadGrowth100,
                    "luck": ship.luckGrowth100,
                    "firepower": ship.fpGrowth100,
                    "torpedo": ship.trpGrowth100,
                    "evasion": ship.evaGrowth100,
                    "speed": ship.spdGrowth100,
                    "antiair": ship.aaGrowth100,
                    "aviation": ship.aviGrowth100,
                    "oilConsumption": ship.costGrowth100,
                    "accuracy": ship.accGrowth100,
                    "antisubmarineWarfare": ship.aswGrowth100
                },
                "120":{
                    "health": ship.hpGrowth120,
                    "armor": ship.armorGrowth120,
                    "reload": ship.reloadGrowth120,
                    "luck": ship.luckGrowth120,
                    "firepower": ship.fpGrowth120,
                    "torpedo": ship.trpGrowth120,
                    "evasion": ship.evaGrowth120,
                    "speed": ship.spdGrowth120,
                    "antiair": ship.aaGrowth120,
                    "aviation": ship.aviGrowth120,
                    "oilConsumption": ship.costGrowth120,
                    "accuracy": ship.accGrowth120,
                    "antisubmarineWarfare": ship.aswGrowth120
                },
                "kai":{
                    //retroTileData
                }
            }
        },
        //set empty equip slots
        tempShip.items=[{},{},{},{},{}]
        //set icon bacground and border img source
        ship.extraData.icon=`client/shipicon/${ship.icon}`,// TODO need file extention?
        ship.extraData.borderSRC=`frame_${Math.round(tempShip.extraData.rarity.numeric)}.png`
        ship.extraData.backgroundSRC=`bg${Math.round(tempShip.extraData.rarity.numeric)}.png`

        // send data to shipJsonOut
        shipJsonOut[ship.Uid]=tempShip
    })
}

function sortEquipData(){
    equipJsonIn.forEach(equip=>{
        let tempEquip = {}
        tempEquip.id = equip.id
        tempEquip.name={
            "en":equip.nameEN,
            "cn":equip.nameCN,
            "jp":equip.nameJP,
            "numeric":equip.id
        }
        tempEquip.icon=`client/equips/${equip.id}.png`
        tempEquip.type=equip.type,
        tempEquip.property=computeProperty(equip)
    })
}

function parseCode(shipCode){
    let splitcode = shipCode.split(" ")
    splitcode.shift()
    return splitcode.join(" ")
}