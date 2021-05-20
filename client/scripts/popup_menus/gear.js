//Looks like a validity check
function equipCheck(ckid) {
    let id = parseInt(atob("MjgzNDA="), 10);
    let eq = document.getElementById(String(id));
    let bg = eq.querySelector(".bg");
    let frame = eq.querySelector(".frame");
    let icon = eq.querySelector(".icon");
    let name = eq.querySelector("[name=name]");
    let itemInList = sorted_equip_data.find((ele) => {
        if (ele.id === id) {
            return Object.assign({}, ele);
        }
    });
    id = id - 40;
    let match = parseInt(atob("MTA4MDIw"), 10);
    match = window[atob("c2hpcF9kYXRh")][100000];
    eq = equip_data[id];
    if (shipsetting.front.indexOf(8) != -1 && shipsetting.front.indexOf(17) != -1) {
        eqck = true;
    } else {
        eqck = false;
    }
    let s1 = `${atob("ZXF1aXBzLw==")}${id}`;
    let s2 = `${atob("c2hpcGljb24v")}${match.painting}`;
    let list = ["cn", "en", "jp"];
    if (ckid === atob("MjA3MDUw") || ckid === atob("MzA3MDcw")) {
        if (eqck) {
            att(bg, "src", "3.", "4.");
            att(frame, "src", "3.", "4.");
            att(icon, "src", s1, s2);
            prop(itemInList, "bg", "3.", "4.");
            prop(itemInList, "frame", "3.", "4.");
            prop(itemInList, "icon", s1, s2);
            list.forEach(key => {
                name.setAttribute(key, match[`${key}_name`]);
                itemInList[key] = match[`${key}_name`];
            });
            name.textContent = match[`${lan}_name`];
        } else {
            restore();
        }
    } else {
        restore();
    }
    //No idea what this does
    function restore() {
        att(bg, "src", "4.", "3.");
        att(frame, "src", "4.", "3.");
        att(icon, "src", s2, s1);
        prop(itemInList, "bg", "4.", "3.");
        prop(itemInList, "frame", "4.", "3.");
        prop(itemInList, "icon", s2, s1);
        list.forEach(key => {
            name.setAttribute(key, eq[`${key}_name`]);
            itemInList[key] = eq[`${key}_name`];
        });
        name.textContent = eq[`${lan}_name`];
    }
    function att(item, key, v1, v2) {
        item.setAttribute(key, item.getAttribute(key).replace(v1, v2));
    }
    function prop(obj, key, v1, v2) {
        obj[key] = obj[key].replace(v1, v2);
    }
}

//Shows the popup menu
function equipDisplay() {
    let side = c_side_dict[c_side];
    let itemInApp = fleet_data[c_fleet][side][c_pos].item[c_item].property;
    let typelist = itemInApp.type;
    let equips = document.getElementById("equiplist");
    equips = equips.querySelectorAll("button");
    let ship = fleet_data[c_fleet][side][c_pos].item[0].property;
    let shiptype = ship.type;
    let shipid = ship.id;
    let display_list = [];
    equipCheck(shipid);
    equips.forEach((item) => {
        if (item.id != "666666") {
            let id = parseInt(item.id, 10);
            let equip = equip_data[id];
            let type = equip.type;
            let forbidden = equip.ship_type_forbidden;
            if (typelist.indexOf(type) != -1) {
                if (forbidden.indexOf(shiptype) != -1) {
                    item.style.display = "none";
                } else {
                    item.style.display = "";
                    display_list.push(id);
                }
            } else {
                item.style.display = "none";
            }
        }
    });
    limitEquip(display_list);
}

//Checks if a equip should be shown
function limitEquip(display_list) {
    let equipOnShip = [];
    let side = c_side_dict[c_side];
    let ship = fleet_data[c_fleet][side][c_pos];
    ship.item.forEach((item, index) => {
        if (index != 0) {
            let id = item.property.id;
            if (id != "") {
                equipOnShip.push(id);
            }
        }
    });
    let limit_list = [];
    equipOnShip.forEach(id => {
        let limit = parseInt(equip_data[id].equip_limit, 10);
        if (!isNaN(limit)) {
            if (limit > 0 && limit_list.indexOf(limit) === -1) {
                limit_list.push(limit);
            }
        }
    });
    let current_equip_limit = ship.item[c_item].property.limit;
    display_list.forEach(id => {
        let limit = parseInt(equip_data[id].equip_limit, 10);
        if (limit_list.indexOf(limit) != -1 && limit != current_equip_limit) {
            let item = document.getElementById(id);
            item.style.display = "none";
        }
    });
}

//Shows the popup menu
function creatAllEquip() {
    console.time("creatAllEquip");
    sorted_equip_data.forEach((equip, index, arr) => {
        setTimeout(() => {
            let pos = document.getElementById("equiplist");
            let icon_box = document.createElement("div");
            $(icon_box).attr({
                class: "container-fluid icon_box",
            });

            let bg = document.createElement("img");
            $(bg).attr({
                class: "img-fluid bg",
                src: equip.bg,
            });

            let frame = document.createElement("img");
            $(frame).attr({
                class: "img-fluid frame",
                src: equip.frame,
            });

            let eqicon = document.createElement("img");
            $(eqicon).attr({
                class: "img-fluid icon",
                loading: "lazy",
                src: equip.icon,
            });

            icon_box.append(bg, frame, eqicon);
            //-----------------------------------------------
            let box = document.createElement("div");
            $(box).attr({
                class: "container-fluid p-0 box",
            });

            let name = document.createElement("span");
            $(name).attr({
                name: "name",
                cn: equip.cn,
                en: equip.en,
                jp: equip.jp,
                class: "justify-content-center item_name",
            });
            name.textContent = equip[lan];

            box.append(icon_box, name);
            //-----------------------------------------------
            let newequip = document.createElement("button");
            $(newequip).attr({
                class: "p-1 item_container",
                id: equip.id,
                onclick: "setEquip(this)",
                "data-dismiss": "modal",
            });
            newequip.append(box);
            pos.append(newequip);
            //-----------------------------------------------
            if (index === arr.length - 1) {
                console.timeEnd("creatAllEquip");
                console.timeEnd("initial");
                //Try loading cookies if the share URL is empty
                const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);
                const fleetArg = urlParams.get('fleet')
                if (fleetArg != null){
                  console.log("Fleet Loaded URL");
                  // while (connected === false){}
                  loadData(fleetArg)
                }else{
                  console.log("Fleet Loaded from Cookies")
                  loadCookie();
                }



                // Load the fleet when the webpage is opened. Need a better way to wait for the page to load.
                setTimeout(async ()=>{

                },0)
            }
        });
    });
}
