/*
VUE componets. This is the stuff thats displayed to the screen.
*/

// main fleet component
Vue.component("fleet-container", {
    props: {
        fleet:Object,
        lang:String
    },
    template: `
        <div class="fleetWrap">

            <input class="DetailToggle" type="checkbox" name="details" id="{{fleet.name}}">

            <div class="fleetHeader">

                <h3 class="fleet title">{{fleet.name}}</h3>

                <fleet-header-buttons
                v-bind:fleetKey="fleetKey"
                v-bind:lang="lang"
                ></fleet-header-buttons>

            </div>
            <div class="shipGroup surface" v-if="fleet.surface">
                <fleet-shipWrap
                    v-for="(ship, shipPos) in fleet.surface"
                    v.bind:ship="ship"
                    v.bind:shipPos="shipPos"
                    v.bind:lang="lang"
                ></fleet-shipWrap>
            </div>
            
            <div class="shipGroup sub" v-if="fleet.sub"> 
                <fleet-shipWrap
                    v-for="(ship, shipPos) in fleet.sub"
                    v.bind:ship="ship"
                    v.bind:shipPos="shipPos"
                    v.bind:lang="lang"
                ></fleet-shipWrap>
            </div>

        </div>
    `
});

//fleet container sub components
Vue.component("fleet-Header-Buttons",{
    props: ["fleet", "lang"],
    template:`
    <div class="btnWrap">

        <div 
        class="btn delete"
        v-bind:name="fleet.name"
        onclick="removeFleet(this);"
        >
        X</div>

        <div 
        class="btn prev"
        v-bind:name="fleet.name"
        v-if="fleet.name != 1"
        onclick="moveFleetUp(this);"
        >
        ˄</div>

        <div 
        class="btn next"
        v-bind:name="fleet.name"
        v-if="fleet.name != fleets.length"
        onclick="moveFleetDown(this);"
        >
        ˅</div>

        <div
        class="btn more" >
            <label 
            for="Fleet-{{fleet.name}}-Details"
            >
            ☰</label>
        </div>

    </div>
    `
}) 
Vue.component("fleet-shipWrap",{
    props:{
        ship:Object,
        shipPos:String,
        lang:String
    },
    template:`
    <div class="shipWrap {{shipPos}}">
        <shipwrap-ship
            v-bind:ship="ship"
            v-bind:lang="lang"
        ></shipwrap-ship>
        <div class="equipWrap">
            <shipwrap-equip
                v-for="item in ship.item"
                v-bind:item="item"
                v.bind:extraData="ship.extraData.slots[item.key] ? ship.extraData.slots[item.key] : null"
                v-bind:lang="lang"
            ></shipwrap-equip>
        </div>
        <div class="statWrap">
            <shipwrap-stat
                v-for="(value, key) in ship.stats"
                v-bind:statName="key"
                v-bind:statValue="value"
                v-bind:statEquip="ship.extraData.equipBonus[key] ? ship.extraData.equipBonus[key] : null"
                v.bind:statRetro="ship.extraData.retroBonus[key] ? ship.extraData.retroBonus[key] : null"
                v-bind:lang="lang"
            ></shipwrap-stat>
        </div>
    </div>
    `
})
Vue.component("shipwrap-ship",{
    props:{
        ship:Object,
        lang:String
    },
    template:`
    <div class="ship">
    <img class="icon" v-bind:src="ship.extraData.iconSRC"/>
    <img class="border" v-bind:src="ship.extraData.BorderSRC"/>
    <img class="background" v-bind:src="ship.extraData.backgroundSRC"/>
    <div class="lable" >{{ship.name}}</div>
    </div>
    `
})
Vue.component("shipwrap-equip",{
    props:{
        item:Object,
        extraData:Object||null,
        lang:String
    },
    template:`
    <div class="equip">
        <img class="icon" v-bind:src="item.extraData.iconSRC"/>
        <img class="border" v-bind:src="item.extraData.BorderSRC"/>
        <img class="background" v-bind:src="item.extraData.backgroundSRC"/>
        <div class="toplablesWrap">
            <div class="toplable" >{{item.efficiency}}</div>
            <div class="toplable" >{{item.quantity}}</div>
        </div>
        <div class="lable">{{item.name}}</div>
    </div>
    `
})
Vue.component("shipwrap-stat",{
    props:{
        statName:String,
        statValue:Number||String,
        statEquip:Number||String||null,
        statRetro:Number||String||null,
        lang:String
    },
    template:`
    <div class="stat">
        <div class="stat-name">{{statName}}</div>
        <div class="stat-values">
            <div class="hoverStats"
            v-if="(typeof(statValue)=='number'&&(typeof(statEquip)=='number'||typeof(statRetro)=='number'))"
            >
                <div class="baseStat"
                v-if="(typeof(statValue)=='number')"
                >{{statValue}}</div>
                <p
                v-if="(typeof(statEquip)=='number')"
                >+</p>
                <div class="equipStat"
                v-if="(typeof(statEquip)=='number')"
                >{{statEquip}}</div>
                <p
                v-if="(typeof(statRetro)=='number')"
                >+</p>
                <div class="retroStat"
                v-if="(typeof(statRetro)=='number')"
                >{{statRetro}}</div>
            </div>
            <div class="totalStat"
            v-if="(typeof(statValue)=='number')"
            >{{statValue+statEquip+statRetro}}</div>
            <div class="totalStat"
            v-if="(typeof(statValue)=='string')"
            >{{(statEquip)?statEquip:(statRetro)?statRetro:statValue}}</div>
        </div>
    </div>
    `
})

// selection components
Vue.component("ship-nation-button", {
    props: ['nation', "lang"],
    template: `
        <button
            type="button"
            class="btn btn-outline-light btn-sm"
            onclick="updateSetting(this)"
        ></button>
    `
});
Vue.component("ship-type-button", {
    props: ['type', "lang"],
    template: `
        <button
            type="button"
            class="btn btn-outline-light btn-sm"
            onclick="updateSetting(this)"
        ></button>
    `
});
Vue.component("ship-rarity-button", {
    props: ['rarity', "lang"],
    template: `
        <button
            type="button"
            class="btn btn-outline-light btn-sm"
            onclick="updateSetting(this)"
        ></button>
    `
});
