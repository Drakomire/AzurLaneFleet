/*
VUE componets. This is the stuff thats displayed to the screen.
*/

// main fleet component
Vue.component("fleet-container", {
    props: {
        fleet:Object,
        fleets:Array,
        lang:String
    },
    template: `
        <div class="fleetWrap" v-bind:id="fleets.indexOf(fleet)">

            <input class="DetailToggle" type="checkbox" name="details" v-bind:id="fleet.name">

            <div class="fleetHeader">

                <h3 class="fleet title">{{fleet.name}}</h3>

                <fleet-header-buttons
                    v-bind:fleet="fleet"
                    v-bind:fleets="fleets"
                    v-bind:lang="lang"
                ></fleet-header-buttons>

            </div>
            <div class="shipGroup surface" v-if="fleet.surface">
                <fleet-shipWrap
                    v-for="(ship, shipPos) in fleet.surface"
                    v-bind:ship="ship"
                    v-bind:shipPos="shipPos"
                    v-bind:lang="lang"
                ></fleet-shipWrap>
            </div>
            
            <div class="shipGroup sub" v-if="fleet.subs"> 
                <fleet-shipWrap
                    v-for="(ship, shipPos) in fleet.subs"
                    v-bind:ship="ship"
                    v-bind:shipPos="shipPos"
                    v-bind:lang="lang"
                ></fleet-shipWrap>
            </div>

        </div>
    `
});

//fleet container sub components
Vue.component("fleet-header-buttons",{
    props: {
        fleet:Object,
        fleets:Array,
        lang:String
    },
    template:`
    <div class="buttonWrap">

        <div 
        class="button delete"
        v-bind:name="fleets.indexOf(fleet)"
        onclick="removeFleet(this);"
        >
        X</div>

        <div 
        class="button prev"
        v-bind:name="fleets.indexOf(fleet)"
        v-if="fleets.indexOf(fleet)!==0"
        onclick="moveFleetUp(this);"
        >
        ˄</div>

        <div 
        class="button next"
        v-bind:name="fleets.indexOf(fleet)"
        v-if="fleets.indexOf(fleet)!== fleets.length-1"
        onclick="moveFleetDown(this);"
        >
        ˅</div>

        <div
        class="button more" >
            <label 
            v-bind:for="fleet.name"
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
    <div class="shipWrap"v-bind:class="shipPos" v-bind:pos="shipPos">
        <shipwrap-ship
            v-bind:ship="ship"
            v-bind:lang="lang"
        ></shipwrap-ship>
        <div class="equipWrap">
            <shipwrap-equip
                v-for="(item, key) in ship.items"
                v-bind:item="item"
                v-bind:equip_slot="key"
                v.bind:extraData="ship.extraData.slots[key]"
                v-bind:lang="lang"
            ></shipwrap-equip>
        </div>
        <div class="statWrap">
            <shipwrap-stat
                v-for="(value, key) in ship.stats"
                v-bind:statName="key"
                v-bind:statValue="value"
                v-bind:statEquip="ship.extraData.equipBonus[key]"
                v.bind:statRetro="ship.extraData.retroBonus[key]"
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
    <div class="ship" onclick="setCurrent(this)" data-target="#shipselect" data-toggle="modal">
    <img class="icon" v-bind:src="ship.extraData.iconSRC"/>
    <img class="border" v-bind:src="ship.extraData.BorderSRC"/>
    <img class="background" v-bind:src="ship.extraData.backgroundSRC"/>
    <div class="lable" >{{ship.name[lang]}}</div>
    </div>
    `
})
Vue.component("shipwrap-equip",{
    props:{
        item:Object,
        equip_slot:Number,
        extraData:Object||undefined,
        lang:String
    },
    template:`
    <div class="equip" v-bind:equip_slot="equip_slot" onclick="setCurrent(this)" data-target="#equipselect" data-toggle="modal">
        <img class="icon" v-bind:src="item.icon"/>
        <div class="toplablesWrap">
            <div class="toplable" >{{item.property.efficiency}}</div>
            <div class="toplable" >{{item.property.quantity}}</div>
        </div>
        <div class="lable">{{item.name[lang]}}</div>
    </div>
    `
})
Vue.component("shipwrap-stat",{
    props:{
        statName:String,
        statValue:Number||String,
        statEquip:Number||String||undefined,
        statRetro:Number||String||undefined,
        lang:String
    },
    template:`
    <div class="stat">
    {{statRetro}}
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
                v-if="(typeof(statValue)==='number')"
                v-text="statValue+((statEquip!=null&&statEquip>0)?statEquip:0)+((statRetro!==null&&statRetro>0)?statRetro:0)"
            ></div>

            <div class="totalStat" v-else
            >{{((statEquip&&statEquip!==null)?statEquip:((statRetro&&statRetro!==null)?statRetro:statValue))}}</div>

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
