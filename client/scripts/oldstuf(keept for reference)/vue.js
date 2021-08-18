/*
VUE componets. This is the stuff thats displayed to the screen.
*/

// Define a new component called button-counter
Vue.component('test-data-display', {
    data: {
        data : "Test string"
    },
    template: '{{ data }}'
  })
  new Vue({ el: '#test-data-display' })

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
    props: ["ship", "lang"],
    template: `
        <div class="col">
            <item-container
                v-for="item in ship.item"
                v-bind:key="item.id"
                v-bind:item="item"
                v-bind:lang="lang"
            ></item-container>
        </div>
    `
});

Vue.component("fleet-container", {
    props: ["fleet","fleets", "lang"],
    template: `
        <div>
          <div>
            <h3>Fleet {{fleet.name}}</h3>
          </div>
          <img class="imgbtn" v-bind:name="fleet.name" src="ui/130826-arrow-set/png/cancel-2.png" width="32" height="32" onclick="removeFleet(this);" />
          <img class="imgbtn" v-bind:name="fleet.name" src="ui/130826-arrow-set/png/up-arrow.png" width="32" height="32" onclick="moveFleetUp(this);" v-if="fleet.name != 1" />
          <img class="imgbtn" v-bind:name="fleet.name" src="ui/130826-arrow-set/png/download-1.png" width="32" height="32" onclick="moveFleetDown(this);" v-if="fleet.name != fleets.length" />
          <div class="row m-auto">
              <div v-if="fleet.surface" class="flex-col m-auto">
                  <ship-container
                      v-for="back_ship in fleet.back_ship"
                      v-bind:key="back_ship.id"
                      v-bind:ship="back_ship"
                      v-bind:name="back_ship.id"
                      v-bind:lang="lang"
                  ></ship-container>
              </div>
              <div v-if="fleet.surface" class="flex-col m-auto">
                  <ship-container
                      v-for="front_ship in fleet.front_ship"
                      v-bind:key="front_ship.id"
                      v-bind:ship="front_ship"
                      v-bind:name="front_ship.id"
                      v-bind:lang="lang"
                  ></ship-container>
              </div>
              <div v-if="!fleet.surface" class="flex-col m-auto">
                  <ship-container
                      v-for="sub in fleet.submarine"
                      v-bind:key="sub.id"
                      v-bind:ship="sub"
                      v-bind:name="sub.id"
                      v-bind:lang="lang"
                  ></ship-container>
              </div>
          </div>
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
