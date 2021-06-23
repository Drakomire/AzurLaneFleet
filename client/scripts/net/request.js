if (location.host ==  'localhost:3000'){
    url = 'http://' + location.host
  }else{
    url = 'https://' + location.host
  }

function requestShipData(id,callback){
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200)
        {
            callback(JSON.parse(request.responseText));
        }
    }; 
    request.open( "GET", url + "/ship_data?id="+id, true );
    request.send(null);
}

function requestFleetUrl(callback){
    var request = new XMLHttpRequest();
    request.open( "POST", url + "/fleet", true );
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200)
      {
          callback(request.responseText);
      }
    }; 
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify(fleet_data));
}

function requestFleetData(urlData,callback){
  var request = new XMLHttpRequest();
  request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200)
      {
          callback(request.responseText);
      }
  }; 
  request.open( "GET", url + "/fleet_url_load?url="+urlData, true );
  request.send(null);
}