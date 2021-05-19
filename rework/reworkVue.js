/*
VUE componets. This is the stuff thats displayed to the screen.
*/

Vue.component("item-container", {
    props: ["item", "lang"],
    template: `
        <button
          class="p-1 item_container"

          v-bind:name="item.id"
          v-bind:pos="item.property.pos"
          v-bind:data-target="item.property.target"

          onclick="setCurrent(this)"
          data-toggle="modal"
          >
            <div class="container-fluid p-0 box">
              <div class="icon_box">
                <img class="img-fluid bg" v-bind:src="item.property.bg">
                <img class="img-fluid frame" v-bind:src="item.property.frame">
                <img class="img-fluid icon" v-bind:src="item.property.icon">
                <span class="d-flex justify-content-start text-monospace itemq" v-text="item.property.quantity">
              </div>
              <span class="justify-content-center item_name"
                v-text="item.property[lang]"
              ></span>
            </div>
        </button>
    `
});

Vue.component("ship-container", {
    props: ["ship", "name", "lang"],
    template: `
        <div class="shipWrap" id="{{name}}">
            <div class="ship">
                <div class="lable">{{item.property[lang]}}</div>
            </div>
            <item-container
                v-for="item in ship.item"
                v-bind:key="item.id"
                v-bind:item="item"
                v-bind:lang="lang"
            ></item-container>
        </div>
    `
});
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
Vue.component("fleet-group"),{
    props: {
        ships:Object,
        shipgroup:String,
        lang:String,
    },
    template:`
    <div class="shipgroup {{shipgroup}}">
        <fleet-shipWrap
            v-for="ship of ships"
            v-bind:ship="ship.value"
            v-bind:shipPos="ship.key"
            v-bind:lang="lang"
        >
        </fleet-shipWrap>
    </div>
    `
}
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
        <shipwrap-equipWrap
        ></shipwrap-equipWrap>
        <shipwrap-statWrap
        ></shipwrap-statWrap>
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
        <img
    </div>
    `
})

Vue.component("fleet-container", {
    props: {
        fleet:Object,
        fleetKey:String,
        lang:String
    },
    template: `
        <div class="fleetWrap">

            <input class="DetailToggle" type="checkbox" name="details" id="Fleet-{{fleetKey}}-Details">

            <div class="fleetHeader">

                <h3 class="fleet title">Fleet {{fleetKey}}</h3>

                <fleet-header-buttons
                v-bind:fleetKey="fleetKey"
                v-bind:lang="lang"
                ></fleet-header-buttons>

            </div>
            <fleet-group
                v-for"group in fleet"
                v-bind:ships="group.value"
                v-bind:shipgroup="group.key"
                v-bind:lang="lang"
            >
            </fleet-group>

        </div>
    `
});

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
