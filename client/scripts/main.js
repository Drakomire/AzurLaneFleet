let [ship_nation, ship_type, ship_rarity] = buildShipSelectOption();
// let c_fleet = "";
// let c_side = "";
// let c_pos = "";
// let c_item = "";
let nation_list = [];
let type_list = [];
let rarity_list = [];
let retrofit = true;

//Global variables to track where the user clicked. Best way I could think of doing this because there isn't a way to change setShipAndEquip()'s parameters
var fleet_pos = 0
var ship_pos = ""
var group = ""
var equip_pos = 0

var defaultShip = null
Ship.build(0,{},ship => { //"ship" is the class
    //Checks if the ship has a retrofit?
    defaultShip = ship
    fleet_data.push(newFleet(true));
})

// new fleet creation code for testing
function newFleet(type,fleets=[]) {
    let fleet = {
        "name":`${fleets.length+1}`,
    }
    if(type==true){
        fleet.surface = {
            flagship:defaultShip,
            leftFlank:defaultShip,
            rightFlank:defaultShip,
            vanguardLead:defaultShip,
            vanguardMid:defaultShip,
            vanguardBack:defaultShip,
        }
    }else if(type==false){
        fleet.subs = {
            flagSub:defaultShip,
            leftSub:defaultShip,
            rightSub:defaultShip,
        }
    }

    // for(let prop in fleet){
    //     if(typeof fleet[prop] =="object"){
    //         console.log(prop)
    //         for(let ship in fleet[prop]){
    //             for(let index=0;index<fleet[prop][ship].items.length;index++){
    //                 fleet[prop][ship].items[index]=defaultEquip
    //             }
    //         }
    //     }
    // }

    // console.log(JSON.stringify(fleet))
    return fleet
}

var default_fleet = [];
var fleet_data = [];

last_saved_fleet = [];

let c_side_dict = {
  0: "front_ship",
  1: "back_ship",
  2: "submarine",
}

let sorted_ship_data = [];
let lan = "en";
let sorted_equip_data = [];
// let front = [1, 2, 3, 18, 19];
// let back = [4, 5, 6, 7, 10, 12, 13];
// let submarine = [8,17]
// let c_ships = [];
let version = 0.03;
let eqck = false;
let search = "";

//---------------------------------------------
// let fleet_number = "1";
let ALF = new Vue({
    el: "#AzurLaneFleetApp",
    data: {
        fleets: fleet_data,
        lang: lan,
    },
});

let shipSelect = new Vue({
    el: "#shipselect",
    data: {
        nation: ship_nation,
        type: ship_type,
        rarity: ship_rarity,
        shiplist: sorted_ship_data,
        lang: lan
    }
});

let equipSelect = new Vue({
    el: "#equipselect",
    data: {
        equips: sorted_equip_data,
        lang: lan,
    }
});
//---------------------------------------------

//This function made a gap between the fleets.
//Its disabled now because I don't want that
/**
uiAdjust();
function uiAdjust() {
    insert space between fleet
    let fleet = document.getElementsByName("fleet_0");
    let br = document.createElement("br");
    fleet[0].insertAdjacentElement("afterend", br);
}
**/

/*This function creates a new fleet
 *@param {int} number - The fleet ID. This is 0 for the first fleet and counts up.
 *@param {boolean} surface - True if surface fleet, false if sub fleet.\
 *@returns {Dictionary} - the fleet. This should be put in fleet_data.
 */
function createNewFleet(number,surface){
    let new_ship_data = [];
    let front = [];
    let back = [];
    let submarine = [];
    let i = number;
    let max = surface? 6 : 3;
    for (let x = 0; x < max; x++) {
        let new_data = [];
        if (!surface){
            for (let index in default_fleet) {
                let new_value = `_${i}2${x}${index}`;
                let new_prop = Object.assign({}, default_fleet[index].property);
                new_data.push({ id: new_value, property: new_prop, });
                new_prop.pos = "submarine";
            }
            new_ship_data = { id: `fleet_${i}_submarine${x}`, item: new_data, };
            submarine.push(new_ship_data);
        }else if (x < 3) {
            for (let index in default_fleet) {
                let new_value = `_${i}0${x}${index}`;
                let new_prop = Object.assign({}, default_fleet[index].property);
                new_data.push({ id: new_value, property: new_prop, });
                new_prop.pos = "front";
            }
            new_ship_data = { id: `fleet_${i}_front_ship${x}`, item: new_data, };
            front.push(new_ship_data);
        } else {
            for (let index in default_fleet) {
                let new_value = `_${i}1${x - 3}${index}`;
                let new_prop = Object.assign({}, default_fleet[index].property);
                new_data.push({ id: new_value, property: new_prop, });
                new_prop.pos = "back";
            }
            new_ship_data = { id: `fleet_${i}_back_ship${x - 3}`, item: new_data, };
            back.push(new_ship_data);
        }
    }
    // document.getElementById()
    return { id: `fleet_${i}`, name: fleet_data.length+1, surface: surface, front_ship: front, back_ship: back, submarine: submarine};
}

//Simplifies creation of a new fleet that is appended to the end of the list.
//Used by add fleet buttons
function addFleet(surface){
    fleet_data.push(newFleet(surface,fleet_data));
    dumpDataID()
}

//Remove fleet button
function removeFleet(item){
    let index = parseInt(item.getAttribute("name"))
    fleet_data.splice(index,1);
  dumpDataID();
}
//Moves the fleet up one
function moveFleetUp(item){
  let index = parseInt(item.getAttribute("name"));
  if (index != 0){
    let Moved = fleet_data.splice(index,1);
    fleet_data.splice(index-1,0,Moved[0]);
    // dumpDataID();
  }
}
//Moves the fleet down one
function moveFleetDown(item){
    let index = parseInt(item.getAttribute("name"));
    if (index != fleet_data.length-1){
        let Moved = fleet_data.splice(index,1);
        fleet_data.splice(index+1,0,Moved[0]);
        dumpDataID();
    }
}

//Removes all the fleets that are currently in use
// TODO: This is written really poorly but I just wanted to get it working
function emptyfleet() {
  let surface = [];
  for (i of fleet_data){
    surface.push(i["surface"]);
  }
  deleteFleet();
  for (i of surface){
    addFleet(i);
  }
}

//Clears all the fleets
function deleteFleet(){
  fleet_data.splice(0,fleet_data.length);
  dumpDataID();
}

//Clears all the fleets then adds the default fleet
function resetFleet() {
  deleteFleet();
  addFleet(true);
}

function setRetro(item) {
    $(item).button("toggle");
    let newvalue = (item.value === "1") ? "0" : "1";
    retrofit = (item.value === "1") ? false : true;
    item.value = newvalue;
    shipDisplay();
}

//I have no idea what this function does
//etheralda: it seems to return a array holding ither values of an object or keys of an object to then get the numerical index of the value or key in the object
function indexInObj(obj, getvalue = false) {
    let new_list = [];
    if (getvalue) {
        for (let index in obj) {
            new_list.push(index, obj[index]);
        }
    } else {
        for (let index in obj) {
            new_list.push(index);
        }
    }
    return new_list;
}


//I think this removes a ship
function hideShipInFleet() {
    let shipInFleet = [];
    for (let side in fleet_data[c_fleet]) {
        if (side != "id") {
            fleet_data[c_fleet][side].forEach(ship => {
                let id = ship.item[0].property.id;
                if (id != "") {
                    shipInFleet.push(id);
                }
            });
        }
    }
    shipInFleet.forEach(id => {
        let ship = document.getElementById(id);
        ship.style.display = "none";
    });
}

//Opens the popup menu for ships or equips depending on the item name
function setCurrent(item) {
    if(item.classList.contains("ship")){
        ship_pos = item.parentElement.getAttribute("pos")
        group = item.parentElement.parentElement.getAttribute("type")
        fleet_pos = item.parentElement.parentElement.parentElement.id
        let sideSeaker = [["vanguardLead","vanguardMid","vanguardBack"], ["flagship","leftFlank","rightFlank"], ["flagSub","leftSub","rightSub"]]
        let shipSide = -1
        sideSeaker.forEach(side=>{
            if(side.includes(ship_pos)){
                shipSide = (sideSeaker.indexOf(side))
            }
        })
        shipDisplay(shipSide,ship_pos,fleet_pos);
    }else if(item.classList.contains("equip")){
        let equip_types = JSON.parse(item.getAttribute("equip_types"))
        ship_pos = item.parentElement.parentElement.getAttribute("pos")
        group = item.parentElement.parentElement.parentElement.getAttribute("type")
        fleet_pos = item.parentElement.parentElement.parentElement.parentElement.id
        equip_pos = item.getAttribute("equip_slot")
        equipDisplay(equip_types);
    }
}
function echoData(data){
    console.log(JSON.parse(data))
    let dataTarget = document.getElementById("shipPlacementData")
    console.log(`fleet : ${dataTarget.getAttribute("targetFleet")}\n side : ${dataTarget.getAttribute("targetSide")}\n ship Position : ${dataTarget.getAttribute("targetPos")}\n ship chosen : ${JSON.parse(data)[`${lan}_name`]}`)
}
function setShipAndEquip(item) {
    //Stuff runs asynchronously so it needs to use seperate variables. If the original changes while stuff is running, thigs will break.
    let ship_pos_temp = ship_pos
    let fleet_pos_temp = fleet_pos
    let group_temp = group

    //Example of how to use the Ship Class
    Ship.build(parseInt(item.id),{},ship => { //"ship" is the class
        //Force all retrofit nodes to be complete if the ship has one
        if (ship.has_retrofit)
            ship.retrofit_nodes_completed = ship.retrofit_node_letters

        //Assign the ship to a fleet
        fleet_data[fleet_pos_temp][group_temp][ship_pos_temp] = ship
    })
}

function setEquip(item) {
    //Vue wasn't updating until I did this.
    let equips = fleet_data[fleet_pos][group][ship_pos].setEquip(equip_pos,new Equip(item.id))



    console.log(equips)
}

//Creates a sharable URL
function copyData() {
  if (JSON.stringify(fleet_data) != last_saved_fleet){
    let textbox = document.getElementById("fleetdata");
    requestFleetUrl((res) => {
        textbox.value = "https://azurfleetmaker.com/?fleet="+res
    });

    last_saved_fleet = JSON.stringify(fleet_data);
  }else{
      let textbox = document.getElementById("fleetdata");
      // textbox.value = "Please change your fleet before requesting an URL!";
  }
}

//Deprecated. Clears the text box.
function emptyData() {
    let text = document.getElementById("fleetdata");
    text.value = "";
}

//This renames all the items so that the program correctly knows where items are.
function fixFleetOrder(){
    fleet_data.forEach((item, i) => {
    let n = item.id.split("_")[1];
    item.id = `fleet_${i}`
    item.name = `${i+1}`;
    for (key in item){
      if (key == "front_ship" || key == "back_ship" || key == "submarine"){
        item[key].forEach((j, loc) => {
          //Set the id
          j.id = j.id.split("_");
          j.id[1] = `${i}`;
          j.id = j.id.join("_");
          //Fix the ships
          j.item.forEach((gear, gearLoc) => {
              gear.id = gear.id.split("");
              gear.id[1] = `${i}`;
              gear.id = gear.id.join("");
          });
      });

      }

    }
  });
}

// function for testing
function getFleetDamageData(fleetDetails){
    let fleetDamageData={}
    let fleetType = (fleetDetails.surface)?"surface":"sub";
    Object.keys(fleetDetails[fleetType]).forEach(ship=>{
        let shipdata = fleetDetails[fleetType][ship]
        fleetDamageData[ship]={
            "fp":shipdata.stats.fp,
            "rld":shipdata.stats.rld,
            "fpBonus":1,
            //TODO equip stats
            "equipFP":65+25+70+55,
            "equipRLD":0,
            "equip_1_rof_base":24.22,
            "equip_1_dmg_base":167,
            "equip_1_dmg_mod":1.05,
            "equip_1_dmg_base":167,
            "equip_1_preload":shipdata.preloads[0],

            "equip_2_rof_base":1.53,
            "equip_2_dmg_base":15,
            "equip_2_preload":shipdata.preloads[1],
        }
        if([7,8,18].includes(shipdata.hull_id)){// to set values incase of 3 damage equips
            fleetDamageData[ship].equip_3_rof_base = null
            fleetDamageData[ship].equip_3_dmg_base = null
            fleetDamageData[ship].equip_3_preload = null
        }
    })
    console.log(fleetDamageData)
}