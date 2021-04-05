const { checkForNewUpdate } = require("@azurapi/azurapi") //es5
checkForNewUpdate()
const azurlane = require('@azurapi/azurapi') //ES5


setTimeout(()=>{
  console.log(azurlane.getShipByEnglishName('Z23'))
  output = {};

  output[name] = {
      "nationality": 2,
      "type": 5,
      "base_list": [
          3,
          3,
          1
      ],
      "id": 205034,
      "skin_id": 205030,
      "star": 5,
      "rarity": 4,
      "retro": 0,
      "uni_id": "205030",
      "painting": "naerxun",
      "star_string": "★★★★★",
      "rarity_string": "SR",
      "jp_name": "ネルソン",
      "en_name": "Nelson",
      "cn_name": "纳尔逊",
      "equip_1": [
          4
      ],
      "equip_2": [
          1,
          2
      ],
      "equip_3": [
          6
      ],
      "equip_4": [
          10
      ],
      "equip_5": [
          10
      ]
  }




}, 200);
