let [ship_nation, ship_type, ship_rarity] = buildShipSelectOption();
let c_fleet = "";
let c_side = "";
let c_pos = "";
let c_item = "";
let nation_list = [];
let type_list = [];
let rarity_list = [];
let retrofit = true;
//Empty ship data variable for fleet creation
// var ship_data = [];
var default_fleet = [];
var fleet_data = [];
fleet_data = buildFleet();
last_saved_fleet = [];

let c_side_dict = {
  0: "front_ship",
  1: "back_ship",
  2: "submarine",
}

let sorted_ship_data = [];
let lan = "en";
let sorted_equip_data = [];
let shipsetting = {
    nation: [],
    front: [],
    back: [],
    submarine: [],
    rarity: [],
};
let front = [1, 2, 3, 18, 19];
let back = [4, 5, 6, 7, 10, 12, 13];
let submarine = [8,17]
let c_ships = [];
let version = 0.03;
let eqck = false;
let search = "";

//---------------------------------------------
// let fleet_number = "1";
// console.log(fleet_number)
let ALF = new Vue({
    el: "#AzurLaneFleetApp",
    data: {
        fleets: fleet_data,
        lang: lan,
    },
});

console.log(ALF)

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
uiAdjust();

// var string = "This is my compression test.";
// alert("Size of sample is: " + string.length);
// var compressed = LZString.compress(string);
// alert("Size of compressed sample is: " + compressed.length);
// string = LZString.decompress(compressed);
// alert("Sample is: " + string);


function uiAdjust() {
    // insert space between fleet
    let fleet = document.getElementsByName("fleet_0");
    // let br = document.createElement("br");
    // fleet[0].insertAdjacentElement("afterend", br);
}

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

function addFleet(surface){
  fleet_data.push(createNewFleet(fleet_data.length,surface));
  dumpDataID()
}

function removeFleet(item){
  let name = item.name;
  fleet_data.splice(name-1,1);
  fixFleetOrder();
  dumpDataID();
}
function moveFleetUp(item){
  let name = item.name-1;
  if (name != 0){
    [fleet_data[name],fleet_data[name-1]] = [fleet_data[name-1],fleet_data[name]]
    fixFleetOrder();
    dumpDataID();
  }
}
function moveFleetDown(item){
  let name = item.name-1;
  if (name != fleet_data.length-1){
    [fleet_data[name],fleet_data[name+1]] = [fleet_data[name+1],fleet_data[name]]
    fixFleetOrder();
    dumpDataID();
  }
}

function emptyfleet() {
  let data = [];
  for (i in fleet_data){
    console.log(fleet_data[i])
    data.push([[[""],[""],[""]],[[""],[""],[""]],[[""],[""],[""]]]);
  }
  data = JSON.stringify(data);
  parseIdData(data);
}

function deleteFleet(){
  fleet_data.splice(0,fleet_data.length);
  dumpDataID();
}

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

function setCurrent(item) {
    //Clear the search bar
    document.getElementById("ship search bar").value = "";
    updateSearch();
    let pos = item.name;
    [c_fleet, c_side, c_pos, c_item] = [pos[1], pos[2], pos[3], pos[4]];
    if (c_item === "0") {
        //ship
        let shiplist = document.getElementById("shiplist");
        shiplist = shiplist.querySelectorAll("button");
        if (c_side === "0") {
            // show front type
            ship_type.forEach((item) => {
                if (front.indexOf(item.id) === -1) {
                    if (item.id === 0) {
                        item.display = true;
                    } else {
                        item.display = false;
                    }
                } else {
                    item.display = true;
                }
            });
        } else if (c_side === "1") {
            // show back type
            ship_type.forEach((item) => {
                if (back.indexOf(item.id) === -1) {
                    if (item.id === 0) {
                        item.display = true;
                    } else {
                        item.display = false;
                    }
                } else {
                    item.display = true;
                }
            });
        } else if (c_side === "2") {
            // show submarine type
            ship_type.forEach((item) => {
                if (submarine.indexOf(item.id) === -1) {
                    if (item.id === 0) {
                        item.display = true;
                    } else {
                        item.display = false;
                    }
                } else {
                    item.display = true;
                }
            });
        }
        shipDisplay();
    } else {
        // equip
        equipDisplay();
    }
}

function sorting(arr, key, descen) {
    if (descen) {
        arr.sort((a, b) => { return a[key] < b[key] ? 1 : -1; });
    } else {
        arr.sort((a, b) => { return a[key] > b[key] ? 1 : -1; });
    }
    return arr;
}

function setlang(item) {
    let key = item.id;
    //Lang is removed from cookies for now
    lan = ALF.lang = shipSelect.lang = equipSelect.lang = key;
    let names = document.querySelectorAll("[name=name]");
    names.forEach((name) => {
        name.textContent = name.getAttribute(key);
    });
    saveCookie("lan", key);
}

function setEquip(item) {
    let id = parseInt(item.id, 10);
    let side = c_side_dict[c_side];
    let itemInApp = fleet_data[c_fleet][side][c_pos].item[c_item].property;
    if (id === 666666) {
        // reset
        itemInApp.cn = itemInApp.type_cn;
        itemInApp.en = itemInApp.type_en;
        itemInApp.jp = itemInApp.type_jp;
        itemInApp.frame = itemInApp.bg = "";
        itemInApp.icon = "ui/empty.png";
        itemInApp.id = "";
    } else {
        // copy data
        let copylist = ["cn", "en", "jp", "icon", "frame", "bg", "id", "limit"];
        let itemInList = sorted_equip_data.find((ele) => {
            if (ele.id === id) {
                return Object.assign({}, ele);
            }
        });
        copylist.forEach(key => itemInApp[key] = itemInList[key]);
    }
    saveCookie("fleet", dumpDataID());
}

function setShipAndEquip(item) {
    let side = c_side_dict[c_side];
    let shipInApp = fleet_data[c_fleet][side][c_pos];

    let shipInList = sorted_ship_data.find((ele) => {
        if (ele.id === item.id) {
            return Object.assign({}, ele);
        }
    });

    //Some fleets may not exist so ignore if they don't
    try{
      var app_item = shipInApp.item;
    }catch{
      return;
    }
    let shipCopyList = ["cn", "en", "jp", "icon", "frame", "bg", "id", "type", "rarity", "star", "base"];
    let addquantitylist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13,]; // add bb main gun
    let parsetype = {
        1: { cn: "驅逐砲", en: "DD Gun", jp: "駆逐砲" },
        2: { cn: "輕巡砲", en: "CL Gun", jp: "軽巡砲" },
        3: { cn: "重巡砲", en: "CA Gun", jp: "重巡砲" },
        4: { cn: "戰艦砲", en: "BB Gun", jp: "戦艦砲" },
        5: { cn: "魚雷", en: "Torpedo", jp: "魚雷" },
        6: { cn: "防空砲", en: "Anti-Air Gun", jp: "対空砲" },
        7: { cn: "戰鬥機", en: "Fighter", jp: "戦闘機" },
        8: { cn: "攻擊機", en: "Torpedo Bomber", jp: "攻撃機" },
        9: { cn: "爆擊機", en: "Dive Bomber", jp: "爆撃機" },
        10: { cn: "設備", en: "Auxiliary", jp: "設備" },
        11: { cn: "超巡砲", en: "CB Gun", jp: "超巡砲" },
        12: { cn: "水上機", en: "Seaplane", jp: "水上機" },
        13: { cn: "潛艇魚雷", en: "Submarine Torpedo", jp: "潜水艦魚雷" },
        14: { cn: "爆雷", en: "Depth Charge", jp: "爆雷" }, //Sonar is not a unique type
        15: { cn: "反潛機", en: "ASW Bomber", jp: "対潜機" },
        17: { cn: "直升機", en: "ASW Helicopter", jp: "ヘリ" },
        18: { cn: "貨物", en: "Cargo", jp: "積載" }
    };
    for (let index in app_item) {
        app_item = shipInApp.item[index].property;
        if (item.id === "000000") {
            // empty ship/equip
            if (index === "0") {
                //ship
                shipCopyList.forEach(key => app_item[key] = "");
                app_item.icon = shipInList.icon;
                app_item.base = [];
            } else {
                //equip
                for (let key in app_item) {
                    app_item[key] = "";
                }
                app_item.icon = "ui/icon_back.png";
                app_item.fb = [];
                app_item.type = [];
                app_item.target = "";
                app_item.quantity = "";
            }
        } else {
            //copy ship data & equip setting
            if (index === "0") {
                //ship
                shipCopyList.forEach(key => app_item[key] = shipInList[key]);
            } else {
                //equip
                for (let key in app_item) {
                    app_item[key] = "";
                }
                let typelist = shipInList[`e${index}`];
                app_item.type = typelist;
                app_item.icon = "ui/empty.png";
                let typestr_cn = "";
                let typestr_en = "";
                let typestr_jp = "";
                let itemindex = parseInt(index, 10) - 1;
                let quantity = shipInApp.item[0].property.base[itemindex];

                if (typelist.some(eqtype => addquantitylist.indexOf(eqtype) != -1)) {
                    if (quantity != undefined) {
                        app_item.quantity = quantity;
                    }
                }

                // go through all type in ship's equip type list
                typelist.forEach((type, index) => {
                    typestr_cn += parsetype[type].cn;
                    typestr_en += parsetype[type].en;
                    typestr_jp += parsetype[type].jp;
                    if (typelist.length > 1 && index < typelist.length - 1) {
                        typestr_cn += "/";
                        typestr_en += "/";
                        typestr_jp += "/";
                    }
                });

                app_item.cn = app_item.type_cn = typestr_cn;
                app_item.en = app_item.type_en = typestr_en;
                app_item.jp = app_item.type_jp = typestr_jp;
                app_item.target = "#equipselect";
            }
        }
    }
    saveCookie("fleet", dumpDataID());
}

function copyData() {
  if (JSON.stringify(fleet_data) != last_saved_fleet){
    client.send(JSON.stringify({
      type: "Fleet URL Request",
      payload: dumpDataID(),
      token: TOKEN
    }));
    // let textbox = document.getElementById("fleetdata");
    // textbox.value = "set=";
    last_saved_fleet = JSON.stringify(fleet_data);
  }else{
      let textbox = document.getElementById("fleetdata");
      // textbox.value = "Please change your fleet before requesting an URL!";
  }
}

function emptyData() {
    let text = document.getElementById("fleetdata");
    text.value = "";
}

function initial() {
    console.time("initial");
    //creat sortred ship list
    console.time("sortship");
    let newlist = [];
    let pos = 0;
    let empty = {};
    let parseData = {
        id: "uni_id",
        cn: "cn_name", en: "en_name", jp: "jp_name",
        type: "type",
        nationality: "nationality",
        rarity: "rarity",
        star: "star",
        retro: "retro",
        base: "base_list",
        e1: "equip_1", e2: "equip_2", e3: "equip_3", e4: "equip_4", e5: "equip_5",
    };
    for (let index in ship_data) {
        let item = Object.assign({}, ship_data[index]);
        let newitem = {};
        // parse data
        for (let key in parseData) {
            newitem[key] = item[parseData[key]];
        }
        // set other data
        newitem.icon = item.painting;
        newitem.bg = `ui/bg${item.rarity - 1}.png`;
        newitem.frame = `ui/frame_${item.rarity - 1}.png`;
        // creat empty ship
        if (pos === 0) {
            empty = Object.assign({}, newitem);
            for (let key in empty) {
                empty[key] = "";
            }
            empty.id = "000000";
            empty.en = "Remove";
            empty.cn = "移除";
            empty.jp = "除隊";
            empty.icon = "ui/empty.png";
        }
        newlist.push(newitem);
        pos++;
    }
    newlist = sorting(newlist, 'type', true);
    newlist = sorting(newlist, 'nationality', true);
    newlist = sorting(newlist, 'rarity', true);
    // add emptyship to top
    newlist.unshift(empty);
    sorted_ship_data = Object.assign([], newlist);
    console.timeEnd("sortship");
    //creat sortred equip list
    console.time("sortequip");
    newlist = [];
    pos = 0;
    parseData = {
        id: "id",
        cn: "cn_name", en: "en_name", jp: "jp_name",
        type: "type",
        nationality: "nationality",
        rarity: "rarity",
        fb: "ship_type_forbidden",
        limit: "equip_limit",
    };
    for (let index in equip_data) {
        let item = Object.assign({}, equip_data[index]);
        let newitem = {};
        // parse data
        for (let key in parseData) {
            newitem[key] = item[parseData[key]];
        }
        // set other data
        newitem.icon = `equips/${item.icon}.png`;
        if (item.rarity != 1) {
            newitem.bg = `ui/bg${item.rarity - 1}.png`;
            newitem.frame = `ui/frame_${item.rarity - 1}.png`;
        } else {
            newitem.bg = `ui/bg${item.rarity}.png`;
            newitem.frame = `ui/frame_${item.rarity}.png`;
        }
        // creat empty equip
        if (pos === 0) {
            empty = Object.assign({}, newitem);
            for (let key in empty) {
                empty[key] = "";
            }
            empty.id = "666666";
            empty.en = "Remove";
            empty.cn = "移除";
            empty.jp = "外す";
            empty.icon = "ui/empty.png";
        }
        newlist.push(newitem);
        pos++;
    }
    newlist = sorting(newlist, "nationality", true);
    newlist = sorting(newlist, "type", true);
    newlist = sorting(newlist, "rarity", true);
    newlist.unshift(empty);
    sorted_equip_data = Object.assign([], newlist);
    console.timeEnd("sortequip");
    // console.log(newlist)
    creatAllShip();
}

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

function buildFleet() {
    console.time("buildFleet");
    for (let i = 0; i < 6; i++) {
        let item = [];
        if (i === 0) {
            let ship = {
                id: "",
                icon: "ui/empty.png",
                type: "",
                star: "",
                rarity: "",
                en: "",
                cn: "",
                jp: "",
                target: "#shipselect",
                bg: "",
                frame: "",
                base: [],
                quantity: "",
            };
            item = ship;
        } else {
            let eq = {
                id: "",
                icon: "ui/icon_back.png",
                type: [],
                star: "",
                rarity: "",
                en: "", cn: "", jp: "",
                target: "",
                bg: "",
                frame: "",
                fb: [],
                type_cn: "", type_en: "", type_jp: "",
                limit: "",
                quantity: "",
            };
            item = eq;
        }
        default_fleet.push({ id: i, property: [], });
        default_fleet[i].property = Object.assign({}, item);
    }

    let newfleet = [];
    newfleet.push(createNewFleet(0,true));
    // newfleet.push(createNewFleet(1,true));
    console.timeEnd("buildFleet");
    return newfleet;
}
