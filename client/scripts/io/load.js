//Deprecated function to load from the text box
function loadDataByID() {
    let data = atob(document.getElementById("fleetdata").value);

    let textbox = document.getElementById("fleetdata");
    // textbox.value = "";

    if (!loadData(data)){
      message = "Error: Corrupted data";
      // textbox.value = message;
      console.log(message);
      // console.log(main_data);
      return;
    }

}

//Sends a requst to the server to get the data to load
//Client.js handles the rest
function loadData(data){
    client.send(JSON.stringify({
      type: "Fleet URL Load",
      payload: data,
      token: TOKEN
    }));
  return true;
}

//Loads a string created from dumpIdData()
function parseIdData(data) {
    deleteFleet();    //Add required fleets
    data = JSON.parse(data);
    for (i of data){
      //Check if surface fleet
      if (i[0].length == 3){
        addFleet(true);
      }else{
        addFleet(false);
      }
    }
    data.forEach((fleet, fleet_index) => {
        fleet.forEach((side, side_index) => {
            side.forEach((ship, ship_index) => {
                let empty = false;
                ship.forEach((item, item_index) => {
                    if (item === "") {
                        // set as empty ship/equip
                        if (item_index === 0) {
                            item = "000000";
                        } else {
                            item = 666666;
                        }
                    }
                    if (!empty) {
                        let item_name = `_${fleet_index}${side_index}${ship_index}${item_index}`;
                        let ship_item = { name: item_name, id: item };
                        setCurrent(ship_item);
                        if (item_index === 0) {
                            setShipAndEquip(ship_item);
                        } else {
                            setEquip(ship_item);
                        }
                        if (item === "000000") {
                            empty = true;
                        }
                    }
                });
            });
        });
    });
}
