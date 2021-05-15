/*
This functionality is currently broken. Its not added to index.html because of that.
*/

function saveCookie(ckey, cvalue, expday = 365) {
    let time = new Date();
    let exp = expday * 1000 * 60 * 60 * 24;
    time.setTime(time.getTime() + exp);
    exp = time.toUTCString();
    document.cookie = `${ckey}=${cvalue};`;
}

function getCookie() {
    let cookie = document.cookie;
    let new_list = {};
    cookie = cookie.split("; ");
    cookie.forEach(data => {
        let [key, value] = data.split("=");
        new_list[key] = value;
    });
    return new_list;
}

function loadCookie() {
    let clist = getCookie();
    if (clist.lan) {
        let button = document.getElementById(clist.lan);
        button.click();
    } else {
        saveCookie("lan", lan);
    }

    if (clist.fleet) {
        let data = document.getElementById("fleetdata");
        data.value = clist.fleet;
        loadDataByID();
    } else {
        saveCookie("fleet", dumpDataID());
    }
}
