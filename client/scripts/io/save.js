// Turns the selected items into a string
// This string can later be loaded with parseIdData()
function dumpDataID() {
    let data = [];
    fleet_data.forEach(fleet => {
        let fleetdata = [];
        for (let side in fleet) {
            let sidedata = [];
            if (side != "id" && side != "surface" && side != "name") {
                fleet[side].forEach(ship => {
                    let shipdata = [];
                    ship.item.forEach(item => {
                        shipdata.push(item.property.id);
                    });
                    sidedata.push(shipdata);
                });
                fleetdata.push(sidedata);
            }
        }
        data.push(fleetdata);
    });
    data = JSON.stringify(data);
    // let hash = CryptoJS.SHA3(data, { outputLength: 256 }).toString();
    // data = `${data}!${version}!${hash}`;
    // let textbox = document.getElementById("fleetdata");
    // textbox.value = "drakomire.github.io/AzurLaneFleet?fleet="+btoa(data);
    return data;
}
