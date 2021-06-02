const defaultShip ={
    "name":{
        "cn":"",
        "jp":"",
        "en":""
    },
    "stats":{
        "health": 0,
        "armor": "none",
        "reload": 0,
        "luck": 0,
        "firepower": 0,
        "torpedo": 0,
        "evasion": 0,
        "speed": 0,
        "antiair": 0,
        "aviation": 0,
        "oilConsumption": 0,
        "accuracy": 0,
        "antisubmarineWarfare": 0
    },
    "extraData":{
        "rarity":"",
        "icon":"",
        "type":"",
        "equipBonus":{
        }
    },
    "items":[{
    },{
    },{
    },{
    },{
    }]
}
const defaultEquip ={
    "ID":-1,
    "Name":{
        "en":"none",
    },
    "Type":-1,
    "Property":{},
}
function newFleet(type,fleets=[]) {
    let fleet = {
        "id":fleets.length,
        "name":`${fleets.length+1}`,
    }
    if(type=="surface"){
        fleet.surface = {
            flagship:defaultShip,
            leftflank:defaultShip,
            rightflank:defaultShip,
            vanguardLead:defaultShip,
            vanguardMid:defaultShip,
            vanguardBack:defaultShip,
        }
    }else if(type=="subs"){
        fleet.subs = {
            flagSub:defaultShip,
            leftSub:defaultShip,
            rightSub:defaultShip,
        }
    }
    for(let prop in fleet){
        if(typeof fleet[prop] =="object"){
            console.log(prop)
            for(let ship in fleet[prop]){
                for(let index=0;index<fleet[prop][ship].items.length;index++){
                    fleet[prop][ship].items[index]=defaultEquip
                }
            }
        }
    }
    return fleet
}
var fleets=[]

var test1 = ()=>{console.log(fleets)};
var test2 = ()=>{fleets.push(newFleet("surface",fleets))};
var test3 = ()=>{fleets.push(newFleet("subs",fleets))};
