//refreshes the popup menu when a letter changes in the search bar
//I wrote this one so I hope its good
function updateSearch(){
  search = document.getElementById("ship search bar").value;
  let regx = new RegExp(`${search}`,'gi')
  document.getElementById("shiplist").setAttribute("NS",search)
  Array.from(document.getElementById("shiplist").children).forEach(ship=>{
    if(search ===""){
        ship.classList.remove("NS")
    }
    else if((ship.children[0].children[1].getAttribute("en")).match(regx)){
        ship.classList.add("NS")
    }else{
        ship.classList.remove("NS")
    }
  })
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

    let other_nation = [98, 101, 103, 104, 105, 106, 107, 108, 109, 110];
    let other_front = [19];
    let other_back = [10];

    let lang = shipSelect.lang;
    let s = search;

    //Sort ships by rarity
    if (!shipsetting.rarity.includes(rarity) && shipsetting.rarity.length != 0){
        return false;
    }

    // //Sort ships by hull class
    // if (shipsetting.front.includes(type) && shipsetting.front.length != 0){
    //     return false;
    // }

    //Sort ships by nation
    if (shipsetting.nation.includes(nation) && shipsetting.nation.length != 0){
        return false;
    }

    //Sort ship list by hull class
    if (targetSide === 0 && !front.includes(type)) {
        return false;
    }
    if (targetSide === 1 && !back.includes(type)) {
        return false;
    }
    if (targetSide === 2 && !submarine.includes(type)) {
        return false;
    }

    //Regex search to find the characters
    search = search.replace(/[^A-Za-z]/gi, '.')
    let regex = new RegExp(`${search}`,'i');
    if (!regex.test(name)){
      return false;
    }


    return true
}

//turns on and off the display for a cetain ship
function shipDisplay(targetSide,shipPos,fleetPos) {
    let shiplist = document.getElementById("shiplist");
    let placementData = document.getElementById("shipPlacementData");
    shiplist.setAttribute("type","-")
    placementData.setAttribute("targetpos",shipPos)
    placementData.setAttribute("targetfleet",fleetPos)
    placementData.setAttribute("targetside",targetSide)
    let ship_type_select = document.querySelectorAll("#shiptype.container")
    Array.from(ship_type_select[0].children).forEach(selector=>{
        selector.classList.remove("active")
    })



    //disababled due to using css classes for sorting
    // shiplist = shiplist.querySelectorAll("button");
    // shiplist.forEach((item) => {
    //     if (item.id != "000000") {
    //         let id = parseInt(item.id, 10);
    //         let nation = ship_data[id].nationality;
    //         let type = ship_data[id].type;
    //         let rarity = ship_data[id].rarity;
    //         let retro = ship_data[id].retro;
    //         let name = ship_data[id][shipSelect.lang+"_name"];
    //         //Turns the display on if the ship is valid

    //         if (isShipSelect(nation, type, rarity, retro, name, targetSide)) {
    //             item.style.display = "";
    //         } else {
    //             item.style.display = "none";
    //         }
    //     }
    // });
    //I prefer to allow duplicate ships
    // hideShipInFleet();
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
        item.display = "false";
    });

    let rarity = [
        { id: 1, cn: "普通", en: "Normal", jp: "N" },
        { id: 2, cn: "稀有", en: "Rare", jp: "R" },
        { id: 3, cn: "精銳", en: "Elite", jp: "SR" },
        { id: 4, cn: "超稀有", en: "Super Rare", jp: "SSR" },
        { id: 5, cn: "海上傳奇", en: "Rainbow", jp: "UR" },
    ];
    console.timeEnd("buildShipSelectOption");
    return [nation, type, rarity];
}

function sortNationality(item){
    let shipselect = document.getElementById("shiplist")
    let nat = shipselect.getAttribute("nat")
    let regex = new RegExp(`-${item.value}-`,'g')
    if(regex.test(nat)){
        shipselect.setAttribute("nat",nat.replace(`-${item.value}-`,'-'))
        item.classList.remove("active")
    }else{
        shipselect.setAttribute("nat",(nat+`${item.value}-`))
        item.classList.add("active")
    }
}
function sortType(item){
    let shipselect = document.getElementById("shiplist")
    let type = shipselect.getAttribute("type")
    let regex = new RegExp(`-${item.value}-`,'g')
    if(regex.test(type)){
        shipselect.setAttribute("type",(type.replace(`-${item.value}-`,'-')))
        item.classList.remove("active")
    }else{
        shipselect.setAttribute("type",(`${type}${item.value}-`))
        item.classList.add("active")
    }
}
function sortRarity(item){
    let shipselect = document.getElementById("shiplist")
    let rarity = shipselect.getAttribute("rarity")
    let regex = new RegExp(`-${item.value}-`,'g')
    if(regex.test(rarity)){
        shipselect.setAttribute("rarity",rarity.replace(`-${item.value}-`,'-'))
        item.classList.remove("active")
    }else{
        shipselect.setAttribute("rarity",(rarity+`${item.value}-`))
        item.classList.add("active")
    }
}