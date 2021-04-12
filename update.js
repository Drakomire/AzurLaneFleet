const { checkForNewUpdate } = require("@azurapi/azurapi") //es5
checkForNewUpdate()
const azurlane = require('@azurapi/azurapi') //ES5


//Equipment IDs
//1 - DD guns
//2 - CL guns
//3 - CA guns
//4 - BB guns
//5 - Torpedoes
//6 - AA guns
//7 - Fighters
//8 - Torpedo Bombers
//9 - Dive Bombers
//10 - Aux Gear
//11 - CB Guns
//12 - Seaplane
//13 - Submarine Torps
//14 - ASW Gear
//15 - ASW Bomber
//16 - DNE
//17 - ASW Helicopter
//18 - Munition Ship Aux

//Hull Class IDs
//0 - Other
//1 - DD
//2 - CL
//3 - CA
//4 - BC
//5 - BB
//6 - CVL
//7 - CV
//8 - SS
//9 - Null
//10 - Null
//11 - Null
//12 - AR
//13 - BM
//14 - Null
//15 - Null
//16 - Null
//17 - SSV
//18 - CB
//19 - AE

var fs = require('fs');

//Prase the JSON
let json = fs.readFileSync('js/ship_data_old.json');
ship_data_json = JSON.parse(json);


setTimeout(async ()=>{
  let ships = azurlane.getAllShips;

  let out = {};
  for (i in ships){
    s = ships[i];
    rarity = {
      "Decisive" : 6,
      "Ultra Rare" : 6,
      "Priority" : 5,
      "Super Rare" : 5,
      "Elite" : 4,
      "Rare" : 3,
      "Normal" : 2

    }[s.rarity];

    //Hull Class IDs
    //0 - Other
    //1 - DD
    //2 - CL
    //3 - CA
    //4 - BC
    //5 - BB
    //6 - CVL
    //7 - CV
    //8 - SS
    //9 - Null
    //10 - Null
    //11 - Null
    //12 - AR
    //13 - BM
    //14 - Null
    //15 - Null
    //16 - Null
    //17 - SSV
    //18 - CB
    //19 - AE

    hullClass = {
      "Destroyer" : 1,
      "Light Cruiser" : 2,
      "Heavy Cruiser" : 3,
      "Battlecruiser" : 4,
      "Battleship" : 5,
      "Light Carrier" : 6,
      "Aircraft Carrier" : 7,
      "Submarine" : 8,
      "Repair" : 12,
      "Monitor" : 13,
      "Submarine Carrier" : 17,
      "Large Cruiser" : 18,
      "Munition Ship" : 19,

    }[s.hullType]

    if (s.names.en == "I-13"){
        hullClass = 17;
    }
    if (s.names.en == "Kashino"){
        hullClass = 19;
    }

    //Faction
    //Faction IDs
    //1 - Eagle Union
    //2 - Royal Navy
    //3 - Sakura Empire
    //4 - Ironblood
    //5 - Eastern Radiance
    //6 - Sardegna Empire
    //7 - North Union
    //8 - Iris Libre
    //9 - Vichya Dominion
    //10 - Other
    faction = {
      "Eagle Union" : 1,
      "Royal Navy" : 2,
      "Sakura Empire" : 3,
      "Iron Blood" : 4,
      "Dragon Empery" : 5,
      "Sardegna Empire" : 6,
      "Northern Parliament" : 7,
      "Iris Libre" : 8,
      "Vichya Dominion" : 9




    }[s.nationality];
    if (faction === undefined){
      faction = 106;
    }

    //Equipment IDs
    //1 - DD guns
    //2 - CL guns
    //3 - CA guns
    //4 - BB guns
    //5 - Torpedoes
    //6 - AA guns
    //7 - Fighters
    //8 - Torpedo Bombers
    //9 - Dive Bombers
    //10 - Aux Gear
    //11 - CB Guns
    //12 - Seaplane
    //13 - Submarine Torps
    //14 - ASW Gear
    //15 - ASW Bomber
    //16 - DNE
    //17 - ASW Helicopter
    //18 - Munition Ship Aux

    slots = s.slots;
    slot = [[],[],[],[10],[10]]
    for (j in slots){
        if (slots[j].type.includes("DD")) slot[j].push(1);
        if (slots[j].type.includes("CL")) slot[j].push(2);
        if (slots[j].type.includes("CA")) slot[j].push(3);
        if (slots[j].type.includes("BB")) slot[j].push(4);
        if (slots[j].type.includes("Torpedoes") && !slots[j].type.includes("Submarine Torpedoes")) slot[j].push(5);
        if (slots[j].type.includes("Anti-Air")) slot[j].push(6);
        if (slots[j].type.includes("Fighters")) slot[j].push(7);
        if (slots[j].type.includes("Torpedo Bombers")) slot[j].push(8);
        if (slots[j].type.includes("Dive Bombers")) slot[j].push(9);
        if (slots[j].type.includes("Auxiliaries")) slot[j].push(10);
        if (slots[j].type.includes("CB")) slot[j].push(11);
        if (slots[j].type.includes("Seaplane")) slot[j].push(12);
        if (slots[j].type.includes("Submarine Torpedoes")) slot[j].push(13);
        if (slots[j].type.includes("Cargo")) slot[j].push(18);
    }

    if (s.names.en == "Koln"){
        slot[3].push(17);
        slot[4].push(17);
    }

    //Give CVLs and Warspite ASW aux
    if (s.hullType == "Light Carrier" || s.names.en == "Warspite"){
      slot[3].push(15);
      slot[4].push(15);
    }
    //Give DDs and CLs ASW gear
    if (s.hullType == "Light Cruiser" || s.hullType == "Destroyer"){
      slot[3].push(14);
      slot[4].push(14);
    }

    out[`${i}`] = {
        "nationality": faction,
        "type": hullClass,
        "base_list": [      //This can't be fully working until Azur API changes that
            0,
            0,
            0
        ],
        "id": i,
        "skin_id": i,
        "star": s.stars.value,
        "rarity": rarity,
        "retro": 0,
        "uni_id": `${i}`,
        "painting": s.thumbnail,
        "star_string":s.stars.stars,
        "rarity_string": "SR",
        "jp_name": s.names.jp,
        "en_name": s.names.en,
        "cn_name": s.names.cn,
        "stats" : s.stats.level120Retrofit || s.stats.level120,
        "equip_1": slot[0],
        "equip_2": slot[1],
        "equip_3": slot[2],
        "equip_4": slot[3],
        "equip_5": slot[4]
      }
    if (s.retrofit !== undefined){
      out[`${i}`].rarity+=1;
      //Get retrofit image
      shipName = '';
      for (j in ship_data_json){
          if ((ship_data_json[j].cn_name.replace(".改","").replace("改","") == s.names.cn) && ship_data_json[j].retro == 0){
              shipName = ship_data_json[j].painting;
          }
      }

      out[`${i}`].painting = `https://raw.githubusercontent.com/x94fujo6rpg/AzurLaneFleet/master/shipicon/${shipName}.png`;


    }
  }


  fs.writeFile('js/ship_data.js', 'var ship_data = '+JSON.stringify(out, null, '\t'), err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
  })

  output = {};


}, 1000);
