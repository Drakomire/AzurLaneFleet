<template>
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
    
</template>

<script>
export default {
    props: {
        fleet:Object,
        fleets:Object,
        lang:String
    }

}
</script>

