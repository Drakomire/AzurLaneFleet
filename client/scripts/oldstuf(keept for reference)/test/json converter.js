// const shipJsonIn = Object;
const equipJsonIn = Object;

var shipJsonOut = {}
var equipJsonOut = {}

function sortShipData(){
    shipJsonIn.forEach(ship=>{
        let tempShip = {}
        //set difrent Ship names values
        tempShip.name={
            "cn":JSON.parse(ship.ship.name.cn),
            "jp":JSON.parse(ship.ship.name.jp),
            "en":ship?.ENname??parseCode(ship.code),
            "code":ship.code,
        }
        //set ship base stats
        tempShip.stats={
            "health": ship.ship.data[`${ship.id}1`].stats.hp,
            "armor": GetFromDict(armorDict,ship.ship.armor,lang??"en"),
            "reload": ship.ship.data[`${ship.id}1`].stats.rld,
            "luck": ship.ship.data[`${ship.id}1`].stats.luk,
            "firepower": ship.ship.data[`${ship.id}1`].stats.fp,
            "torpedo": ship.ship.data[`${ship.id}1`].stats.trp,
            "evasion": ship.ship.data[`${ship.id}1`].stats.eva,
            "speed": ship.ship.data[`${ship.id}1`].stats.spd,
            "antiair": ship.ship.data[`${ship.id}1`].stats.aa,
            "aviation": ship.ship.data[`${ship.id}1`].stats.avi,
            "oilConsumption": `${ship.ship.data[`${ship.id}1`].stats.oil} - ${ship.ship.data[`${ship.id}4`].stats.oil}`,
            "accuracy": ship.ship.data[`${ship.id}1`].stats.acc,
            "antisubmarineWarfare": ship.ship.data[`${ship.id}1`].stats.asw
        }
        // set ship extradata values
        tempShip.extraData={
            "shipID":ship.Uid,
            "rarity":{
                "string":"",
                "numeric":ship.ship.data[`${ship.id}1`].rarity,
            },
            "type":ship.ship.type,
            "growth":{
                "100":{
                    "health": ship.ship.data[`${ship.id}1`].stats_growth.hp,
                    "reload": ship.ship.data[`${ship.id}1`].stats.rld,
                    "luck": ship.ship.data[`${ship.id}1`].stats_growth.luk,
                    "firepower": ship.ship.data[`${ship.id}1`].stats_growth.fp,
                    "torpedo": ship.ship.data[`${ship.id}1`].stats_growth.trp,
                    "evasion": ship.ship.data[`${ship.id}1`].stats_growth.eva,
                    "speed": ship.ship.data[`${ship.id}1`].stats_growth.spd,
                    "antiair": ship.ship.data[`${ship.id}1`].stats_growth.aa,
                    "aviation": ship.ship.data[`${ship.id}1`].stats_growth.avi,
                    "accuracy": ship.ship.data[`${ship.id}1`].stats_growth.acc,
                    "antisubmarineWarfare": ship.ship.data[`${ship.id}1`].stats_growth.asw
                },
                "120":{
                    "health": ship.ship.data[`${ship.id}4`].stats_growth_extra.hp                   ??ship.ship.data[`${ship.id}1`].stats_growth_extra.hp,
                    "reload": ship.ship.data[`${ship.id}4`].stats_growth_extra.rld                  ??ship.ship.data[`${ship.id}1`].stats_growth_extra.rld,
                    "luck": ship.ship.data[`${ship.id}4`].stats_growth_extra.luk                    ??ship.ship.data[`${ship.id}1`].stats_growth_extra.luk,
                    "firepower": ship.ship.data[`${ship.id}4`].stats_growth_extra.fp                ??ship.ship.data[`${ship.id}1`].stats_growth_extra.fp,
                    "torpedo": ship.ship.data[`${ship.id}4`].stats_growth_extra.trp                 ??ship.ship.data[`${ship.id}1`].stats_growth_extra.trp,
                    "evasion": ship.ship.data[`${ship.id}4`].stats_growth_extra.eva                 ??ship.ship.data[`${ship.id}1`].stats_growth_extra.eva,
                    "speed": ship.ship.data[`${ship.id}4`].stats_growth_extra.spd                   ??ship.ship.data[`${ship.id}1`].stats_growth_extra.spd,
                    "antiair": ship.ship.data[`${ship.id}4`].stats_growth_extra.aa                  ??ship.ship.data[`${ship.id}1`].stats_growth_extra.aa,
                    "aviation": ship.ship.data[`${ship.id}4`].stats_growth_extra.avi                ??ship.ship.data[`${ship.id}1`].stats_growth_extra.avi,
                    "accuracy": ship.ship.data[`${ship.id}4`].stats_growth_extra.acc                ??ship.ship.data[`${ship.id}1`].stats_growth_extra.acc,
                    "antisubmarineWarfare": ship.ship.data[`${ship.id}4`].stats_growth_extra.asw    ??ship.ship.data[`${ship.id}1`].stats_growth_extra.asw
                },
                "kai":{
                    //retroTileData
                }
            }
        },
        //set empty equip slots
        tempShip.slots=ship.ship.slots,
        tempShip.items=[{},{},{},{},{}]
        //set icon bacground and border img source
        ship.extraData.icon=`client/shipicon/${ship.icon}`,// TODO need file extention?
        ship.extraData.borderSRC=`frame_${Math.round(tempShip.extraData.rarity.numeric)}.png`
        ship.extraData.backgroundSRC=`bg${Math.round(tempShip.extraData.rarity.numeric)}.png`

        // send data to shipJsonOut
        shipJsonOut[ship.Uid]=tempShip
    })
}

base+lvl100bonus*99+lvl120*19

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
        tempEquip.property=computeEquipProp(equip)
    })
}

function parseCode(shipCode){
    let splitcode = shipCode.split(" ")
    splitcode.shift()
    return splitcode.join(" ")
}

function computeEquipProp(equip){
    /* TODO
        calculate apropriate propertys
        num of shels per salvo
        damage per shell
        volly time 
        total reload
        stat bonuses provided
        skill effects
        time till damage arival min and max
        effective dps
        changes per enhancement level
    */
}