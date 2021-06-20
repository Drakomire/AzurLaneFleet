const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const fs = require('fs')
const temp = require('temp')

const ship_json = JSON.parse(fs.readFileSync('./data/ships.json').toString())
const equip_json = JSON.parse(fs.readFileSync('./data/gear.json').toString())

//Popup Menu VUE object
const ship_popup = new Vue({
    data: {
      ships: ship_json
    },
    template: `
    <div id="shiplist" class="container-fluid row m-0 p-0" type="-" nat="-" rarity="-" NS="" targetSide="" targetPos="" targetFleet="">
        <button class="p-1 item_container" id="000000" onclick="setShipAndEquip(this)" data-dismiss="modal">
            <div class="container-fluid p-0 box">
            <div class="icon_box row"><img class="img-fluid icon" loading="lazy" src="ui/empty.png"><img class="img-fluid bg" src=""><img class="img-fluid frame" src=""></div>
            <span name="name" cn="移除" en="Remove" jp="除隊" class="justify-content-center item_name">Remove</span>
        </div>
    </button>
      <button v-for="ship in ships" class="p-1 item_container tosort" :type="ship.type" :nat="ship.nationality" :rarity="ship.rarity" :id="ship.id" onclick="setShipAndEquip(this)" data-dismiss="modal">
        <div class="container-fluid p-0 box">
          <div class="icon_box row"><img class="img-fluid icon" loading="lazy" :src="ship.thumbnail" onError="this.onerror=null;this.src='https://raw.githubusercontent.com/Drakomire/perseus-data/master/AzurLaneImages/assets/artresource/atlas/squareicon/unknown.png';">
            <img class="img-fluid bg" :src="'ui/bg'+ship.rarity+'.png'"><img class="img-fluid frame" :src="'ui/frame_'+ship.rarity+'.png'">
          </div>
          <span name="name" :cn="ship.name_cn" :en="ship.name_en" :jp="ship.name_jp" class="justify-content-center item_name">{{ ship.name_en }}</span>
        </div>
      </button>
    </div>
  `
})
renderer.renderToString(ship_popup, (err, html) => {
    module.exports.ship_popup_html = html
});

//Gear menu VUE object
const equip_popup = new Vue({
    data: {
        equips : equip_json
    },
    template:`
        <div id="equiplist" class="container-fluid row m-0 p-0" style="width: 101%">
            <button class="p-1 item_container" id="666666" onclick="setEquip(this)" data-dismiss="modal">
                <div class="container-fluid p-0 box">
                    <div class="container-fluid icon_box"><img class="img-fluid bg" src=""><img class="img-fluid frame" src=""><img class="img-fluid icon" loading="lazy" src="ui/empty.png"></div>
                    <span name="name" cn="移除" en="Remove" jp="外す" class="justify-content-center item_name">Remove</span>
                </div>
            </button>
            <button v-for="equip in equips" class="p-1 item_container" :id="equip.id" onclick="setEquip(this)" data-dismiss="modal">
                <div class="container-fluid p-0 box">
                    <div class="container-fluid icon_box"><img class="img-fluid bg" :src="'ui/bg'+(equip.rarity || 1)+'.png'">
                    <img class="img-fluid frame" :src="'ui/frame_'+(equip.rarity || 1)+'.png'">
                    <img class="img-fluid icon" loading="lazy" :src="equip.icon"></div>
                    <span name="name" :cn="equip.name_cn" :en="equip.name_en" :jp="equip.name_jp" class="justify-content-center item_name">{{ equip.name_en }}</span>
                </div>
            </button>
        </div>
    `
})
renderer.renderToString(equip_popup, (err, html) => {
    module.exports.equip_popup_html = html
});