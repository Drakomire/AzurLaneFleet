    const shipTypeDict = [
    {
        "index":["Destroyer",1,"DD","驅逐","驅逐"],
        "numeric":1,
        "en":"Destroyer",
        "code":"DD",
        "cn":"驅逐",
        "jp":"驅逐"
    },
    {
        "index":["Light Cruiser",2,"CL","輕巡","軽巡"],
        "numeric":2,
        "en":"Light Cruiser",
        "code":"CL",
        "cn":"輕巡",
        "jp":"軽巡"
    },
    {
        "index":["Heavy Cruiser",3,"CA","重巡","重巡"],
        "numeric":3,
        "en":"Heavy Cruiser",
        "code":"CA",
        "cn":"重巡",
        "jp":"重巡"
    },
    {
        "index":["Large Cruiser",18,"CB","超巡","超甲巡"],
        "numeric":18,
        "en":"Large Cruiser",
        "code":"CB",
        "cn":"超巡",
        "jp":"超甲巡"
    },
    {
        "index":["Submarine",8,"SS","潛艇","潜水艦"],
        "numeric":8,
        "en":"Submarine",
        "code":"SS",
        "cn":"潛艇",
        "jp":"潜水艦"
    },
    {
        "index":["Submarine Carrier",17,"SSV","潛母","潜水空母"],
        "numeric":17,
        "en":"Submarine Carrier",
        "code":"SSV",
        "cn":"潛母",
        "jp":"潜水空母"
    },
    {
        "index":["Battlecruiser",4,"BC","戰巡","巡洋戦艦"],
        "numeric":4,
        "en":"Battlecruiser",
        "code":"BC",
        "cn":"戰巡",
        "jp":"巡洋戦艦"
    },
    {
        "index":["Battleship",5,"BB","戰列","戦艦"],
        "numeric":5,
        "en":"Battleship",
        "code":"BB",
        "cn":"戰列",
        "jp":"戦艦"
    },
    {
        "index":["Light Carrier",6,"CVL","輕航","軽空母"],
        "numeric":6,
        "en":"Light Carrier",
        "code":"CVL",
        "cn":"輕航",
        "jp":"軽空母"
    },
    {
        "index":["Carrier",7,"CV","航母","空母"],
        "numeric":7,
        "en":"Carrier",
        "code":"CV",
        "cn":"航母",
        "jp":"空母"
    },
    {
        "index":["Monitor",13,"BM","重砲","砲艦"],
        "numeric":13,
        "en":"Monitor",
        "code":"BM",
        "cn":"重砲",
        "jp":"砲艦"
    },
    {
        "index":["Repair Ship",12,"AR","維修","工作"],
        "numeric":12,
        "en":"Repair Ship",
        "code":"AR",
        "cn":"維修",
        "jp":"工作"
    },
    {
        "index":["Other",0,"NaP","其他","その他"],
        "numeric":0,
        "en":"Other",
        "code":"NaP",
        "cn":"其他",
        "jp":"その他"
    },
]

const equipTypeDict = []

const nationalDict = []

const armorDict = [
    {
        "index":["light",1,"",""],
        "numeric":1,
        "en":"light",
        "cn":"",
        "jp":""
    },
    {
        "index":["medium",2,"",""],
        "numeric":2,
        "en":"medium",
        "cn":"",
        "jp":""
    },
    {
        "index":["heavy",3,"",""],
        "numeric":3,
        "en":"heavy",
        "cn":"",
        "jp":""
    },

]

const rartityDict = [
    {
        "index":[2,"common","C"],
        "numeric":2,
        "en":"common",
        "enCode":"C",
        "cn":"",
        "jp":""
    },
    {
        "index":[3,"rare","R"],
        "numeric":3,
        "en":"rare",
        "enCode":"R",
        "cn":"",
        "jp":""
    },
    {
        "index":[4,"elite","E"],
        "numeric":4,
        "en":"elite",
        "enCode":"E",
        "cn":"",
        "jp":""
    },
    {
        "index":[5,"super rare","SR","SSR"],
        "numeric":5,
        "en":"super rare",
        "enCode":"SR",
        "cn":"",
        "jp":""
    },
    {
        "index":[6,"ultra rare","UR"],
        "numeric":6,
        "en":"ultra rare",
        "enCode":"UR",
        "cn":"",
        "jp":""
    },
]

    // {
    //     "index":["",,"","",""],
    //     "numeric":,
    //     "en":"",
    //     "code":"",
    //     "cn":"",
    //     "jp":""
    // },
function GetFromDict(dictToUse,SearchFor,ReturnAlt){
    dictToUse.forEach(entry=>{
        if(entry.index.includes(SearchFor)){
            return entry[ReturnAlt]
        }
    })
}