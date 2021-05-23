## root
### initiate.js
- initial()
- buildFleet()

### main.js
- createNewFleet()
- addFleet()
- removeFleet()
- moveFleetUp()
- moveFleetDown()
- emptyfleet()
- deleteFleet()
- resetFleet()
- setRetro()
- indexInObj()
- hideShipInFleet()
- setCurrent()
- setEquip()
- setShipAndEquip()
- copyData()
- emptyData()
- fixFleetOrder()

### utility.js
Utility functions and things that don't fit anywhere else.
<br>
Includes:
- sorting()
- setLang()

## /io
### load.js
- loadDataByID()
- loadData()
- parseIdData()
### save.js
- dumpDataID()

### cookies.js
Deprecated file. All the functions need to be rewritten but they are called correctly.
<br>
- saveCookie()
- getCookie()
- loadCookie()

### packet_handler.js
This runs when the client recieves a packet from the server.

## /popup_menus
### ships.js
- updateSearch()
- updateSetting()
- checksetting()
- isShipSelect()
- shipDisplay()
- creatAllShip()
- buildShipSelectOption()

### gear.js
- equipCheck()
- equipDisplay()
- limitEquip()
- creatAllEquip()
