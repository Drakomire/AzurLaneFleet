
    //Clear the search bar
    document.getElementById("ship search bar").value = "";
    updateSearch();
    [c_fleet, c_side, c_pos, c_item] = [item.parentElement.parentElement.parentElement.parentElement.id, sidecheck, poscheck, itemCheck] ;
    if (!c_item) {
        //ship
        let shiplist = document.getElementById("shiplist");
        shiplist = shiplist.querySelectorAll("button");
        if (c_side === "0") {
            // show front type
            ship_type.forEach((item) => {
                if (front.indexOf(item.id) === -1) {
                    if (item.id === 0) {
                        item.display = true;
                    } else {
                        item.display = false;
                    }
                } else {
                    item.display = true;
                }
            });
        } else if (c_side === "1") {
            // show back type
            ship_type.forEach((item) => {
                if (back.indexOf(item.id) === -1) {
                    if (item.id === 0) {
                        item.display = true;
                    } else {
                        item.display = false;
                    }
                } else {
                    item.display = true;
                }
            });
        } else if (c_side === "2") {
            // show submarine type
            ship_type.forEach((item) => {
                if (submarine.indexOf(item.id) === -1) {
                    if (item.id === 0) {
                        item.display = true;
                    } else {
                        item.display = false;
                    }
                } else {
                    item.display = true;
                }
            });
        }
        shipDisplay();
    } else {
        // equip
        equipDisplay();
    }