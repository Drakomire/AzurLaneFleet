
function createNewFleet(number,surface){
    let max = surface? 6 : 3;
    for (let x = 0; x < max; x++) {
        let new_data = [];
        if (!surface){
            for (let index in default_fleet) {
            }
            new_ship_data = { id: `fleet_${number}_submarine${x}`, item: new_data, };
            submarine.push(new_ship_data);
        }else {
            for (let index in default_fleet) {
                let new_prop = Object.assign({}, default_fleet[index].property);
                new_data.push({ id: new_value, property: new_prop, });
                new_prop.pos = "back";
            }
            new_ship_data = { id: `fleet_${number}_back_ship${x - 3}`, item: new_data, };
            back.push(new_ship_data);
        }
    }
    // document.getElementById()
    return { id: `fleet_${number}`, name: number+1, surface: surface, submarine: submarine};
}

//Adds the first fleet to the website
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
