//refreshes the popup menu when a letter changes in the search bar
//I wrote this one so I hope its good
function updateSearch(query){
  search = document.getElementById("ship search bar").value;
  shipDisplay();
}

//Updated when you press a selection button
function updateSetting(item) {
    $(item).button("toggle");
    let strlist = item.name.split("_");
    let type = strlist[1];
    let value = parseInt(strlist[2], 10); //type int
    if (type === "nation") {
        checksetting("nation", value);
    } else if (type === "type") {
        if (c_side === "0") {
            checksetting("front", value);
        } else if (c_side === "1") {
            checksetting("back", value);
        } else if (c_side === "2") {
            checksetting("submarine", value);
        }
    } else if (type === "rarity") {
        checksetting("rarity", value);
    }
    shipDisplay();
}

//I think this one checks if the ship is in the "fleet section"
//ie checks if when you click on a main fleet box it shows main fleet ships
//etc

let shipsetting = {
    nation: [],
    front: [],
    back: [],
    submarine: [],
    rarity: [],
};

//Updates shipsetting when a setting that is NOT the search bar is changed.
function checksetting(key, value) {
    let index = shipsetting[key].indexOf(value);
    if (value > -1) {
        if (index === -1) {
            shipsetting[key].push(value);
        } else {
            shipsetting[key].splice(index, 1);
        }
    } else {
        if (index === -1) {
            shipsetting.back.push(0);
            shipsetting.front.push(0);
        } else {
            index = shipsetting.front.indexOf(0);
            shipsetting.front.splice(index, 1);
            index = shipsetting.back.indexOf(0);
            shipsetting.back.splice(index, 1);
        }
    }
}

//Checks if a ship is selected
function isShipSelect(nation, type, rarity, retro, name, targetSide) {
    let indicator_nation = false;
    let indicator_type = false;
    let indicator_rarity = false;
    let other_nation = [98, 101, 103, 104, 105, 106, 107, 108, 109, 110];
    let other_front = [19];
    let other_back = [10];

    let lang = shipSelect.lang;
    let s = search;

    //Regex search to find the characters
    search = search.replace(/[^A-Za-z]/gi, '.')
    let regex = new RegExp(`${search}`,'i');
    if (!regex.test(name)){
      return false;
    }

    //Sort ship list by hull class
    if (c_side === "0" && !front.includes(type)) {
        return false;
    }
    if (c_side === "1" && !back.includes(type)) {
        return false;
    }
    if (c_side === "2" && !submarine.includes(type)) {
        return false;
    }

    //Not sure what this one is
    if (c_side === "0") {
        if (shipsetting.front.includes(type)|| shipsetting.front.length === 0) {
            indicator_type = true;
        } else if (shipsetting.front.includes(0)&& other_front.includes(type)) {
            indicator_type = true;
        }
    }
    if (c_side === "1") {
        if (shipsetting.back.indexOf(type) != -1 || shipsetting.back.length === 0) {
            indicator_type = true;
        } else if (shipsetting.back.indexOf(0) != -1 && other_back.indexOf(type) != -1) {
            indicator_type = true;
        }
    }
    if (c_side === "2") {
        if (shipsetting.submarine.indexOf(type) != -1 || shipsetting.submarine.length === 0) {
            indicator_type = true;
        } else if (shipsetting.submarine.indexOf(0) != -1 && other_back.indexOf(type) != -1) {
            indicator_type = true;
        }
    }

    if (shipsetting.nation.indexOf(nation) != -1 || shipsetting.nation.length === 0) {
        indicator_nation = true;
    }
    if (shipsetting.nation.indexOf(0) != -1 && other_nation.indexOf(nation) != -1) {
        indicator_nation = true;
    }
    if (shipsetting.rarity.indexOf(rarity) != -1 || shipsetting.rarity.length === 0) {
        indicator_rarity = true;
    }
    if (indicator_nation && indicator_type && indicator_rarity) {
        if (retrofit && retro === 1) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

//This adds the ships to the popup menu
function shipDisplay(targetSide) {
    let shiplist = document.getElementById("shiplist");
    shiplist = shiplist.querySelectorAll("button");
    shiplist.forEach((item) => {
        if (item.id != "000000") {
            let id = parseInt(item.id, 10);
            let nation = ship_data[id].nationality;
            let type = ship_data[id].type;
            let rarity = ship_data[id].rarity;
            let retro = ship_data[id].retro;
            let name = ship_data[id][shipSelect.lang+"_name"];
            //Turns the display on if the ship is valid
            if (isShipSelect(nation, type, rarity, retro, name, targetSide)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        }
    });
    //I prefer to allow duplicate ships
    // hideShipInFleet();
}

//Adds the ships from data/ship_data.js to the pop up menu.
function creatAllShip() {
    console.time("creatAllShip");
    sorted_ship_data.forEach((ship, index, arr) => {
        setTimeout(() => {
            let pos = document.getElementById("shiplist");
            let icon_box = document.createElement("div");
            $(icon_box).attr({
                class: "icon_box row",
            });

            let icon = document.createElement("img");
            $(icon).attr({
                class: "img-fluid icon",
                loading: "lazy",
                src: ship.icon,
            });

            let bg = document.createElement("img");
            $(bg).attr({
                class: "img-fluid bg",
                src: ship.bg,
            });

            let frame = document.createElement("img");
            $(frame).attr({
                class: "img-fluid frame",
                src: ship.frame,
            });

            icon_box.append(icon, bg, frame);
            //-----------------------------------------------
            let box = document.createElement("div");
            $(box).attr({
                class: "container-fluid p-0 box",
            });

            let name = document.createElement("span");
            $(name).attr({
                name: "name",
                cn: ship.cn,
                en: ship.en,
                jp: ship.jp,
                class: "justify-content-center item_name",
            });
            name.textContent = ship[lan];

            box.append(icon_box, name);
            //-----------------------------------------------
            let newship = document.createElement("button");
            $(newship).attr({
                class: "p-1 item_container",
                id: ship.id,
                onclick: "setShipAndEquip(this)",
                "data-dismiss": "modal",
            });
            newship.append(box);
            pos.append(newship);
            //-----------------------------------------------
            if (index === arr.length - 1) {
                console.timeEnd("creatAllShip");
                creatAllEquip();
            }
        });
    });
}

//Adds the header options to the pop up menu. The search bar is NOT included here.
function buildShipSelectOption() {
    console.time("buildShipSelectOption");
    let nation = [
        { id: 1, cn: "白鷹", en: "Eagle Union", jp: "ユニオン", code: "USS" },
        { id: 2, cn: "皇家", en: "Royal Navy", jp: "ロイヤル", code: "HMS" },
        { id: 3, cn: "重櫻", en: "Sakura Empire", jp: "重桜", code: "IJN" },
        { id: 4, cn: "鐵血", en: "Iron Blood", jp: "鉄血", code: "KMS" },
        { id: 5, cn: "東煌", en: "Dragon Empery", jp: "東煌", code: "PRAN/ROC" },
        { id: 6, cn: "撒丁帝國", en: "Sardegna Empire", jp: "サディア", code: "RN" },
        { id: 7, cn: "北方聯合", en: "Northen Parliament", jp: "北連", code: "SN" },
        { id: 8, cn: "自由鳶尾", en: "Iris Libre", jp: "アイリス", code: "FFNF" },
        { id: 9, cn: "維希教廷", en: "Vichya Dominion", jp: "ヴィシア", code: "MNF" },
        { id: 0, cn: "其他", en: "Other", jp: "その他", code: "" },
    ];
    nation.forEach((item) => { item.name = `ship_nation_${item.id}`; });

    let type = [
        { id: 1, cn: "驅逐", en: "Destroyer", jp: "駆逐", code: "DD", pos: "front" },
        { id: 2, cn: "輕巡", en: "Light Cruiser", jp: "軽巡", code: "CL", pos: "front" },
        { id: 3, cn: "重巡", en: "Heavy Cruiser", jp: "重巡", code: "CA", pos: "front" },
        { id: 18, cn: "超巡", en: "Large Cruiser", jp: "超甲巡", code: "CB", pos: "front" },

        { id: 8, cn: "潛艇", en: "Submarine", jp: "潜水艦", code: "SS", pos: "sub" },
        { id: 17, cn: "潛母", en: "Submarine Carrier", jp: "潜水空母", code: "SSV", pos: "sub" },

        { id: 4, cn: "戰巡", en: "Battlecruiser", jp: "巡洋戦艦", code: "BC", pos: "back" },
        { id: 5, cn: "戰列", en: "Battleship", jp: "戦艦", code: "BB", pos: "back" },
        { id: 6, cn: "輕航", en: "Light Carrier", jp: "軽空母", code: "CVL", pos: "back" },
        { id: 7, cn: "航母", en: "Carrier", jp: "空母", code: "CV", pos: "back" },
        { id: 13, cn: "重砲", en: "Monitor", jp: "砲艦", code: "BM", pos: "back" },
        { id: 12, cn: "維修", en: "Repair Ship", jp: "工作", code: "AR", pos: "back" },
        { id: 0, cn: "其他", en: "Other", jp: "その他", code: "" },
    ];
    type.forEach((item) => {
        item.name = `ship_type_${item.id}`;
        item.display = "false";
    });

    let rarity = [
        { id: 2, cn: "普通", en: "Normal", jp: "N" },
        { id: 3, cn: "稀有", en: "Rare", jp: "R" },
        { id: 4, cn: "精銳", en: "Elite", jp: "SR" },
        { id: 5, cn: "超稀有", en: "Super Rare", jp: "SSR" },
        { id: 6, cn: "海上傳奇", en: "Rainbow", jp: "UR" },
    ];
    rarity.forEach((item) => {
        item.name = `ship_rarity_${item.id}`;
    });
    console.timeEnd("buildShipSelectOption");
    return [nation, type, rarity];
}
