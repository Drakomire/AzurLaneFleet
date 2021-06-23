//Ship data is not stored in the class to save space
var ship_data={}

// const defaultEquip ={
//     "id":-1,
//     "name":{
//         "en":"empty",
//     },
//     "icon":"../ui/icon_back.png",
//     "type":-1,
//     "property":{},
// }

class Ship{
    constructor(id,params){
        //Constructor does not require any stats to avoid async problems
        this.id = id
        //Adding and subtracting one allows for 0 as a valid value
        this.limit_break = (params.limit_break+1 || 3+1)-1
        this.level = params.level || 120
        this.affinity = (params.affinity+1 || 100+1) -1
        this.oathed = params.oathed || false
        this.retrofit_nodes_completed = params.retrofit_nodes_completed || []
        this._equips = params.equips || [new Equip(0),new Equip(0),new Equip(0),new Equip(0),new Equip(0)]
        this.empty = id == 0
    }

    static build(id,params,callback){
        //Request ship data from the server if the client doesn't already have it
        let ship = new Ship(id,params)
        if (ship_data[id] == undefined){
            //Request data from server then run build callback
            requestShipData(id, (res) => {
                ship_data[id] = res
                callback(ship)
            })
        }else{
            //Run callback without data request
            callback(ship)
        }
    }

    set equips(val){
        this._equips = val
    }
    get equips(){
        return this._equips
    }

    setEquip(i,value){
        let temp = this._equips
        temp[i] = value
        this._equips = [...temp]
    }

    get name(){
        return ship_data[this.id].name
    }
    get slots(){
        return ship_data[this.id].slots
    }
    get rarity(){
        return ship_data[this.id]["data"][this.index].rarity-1+this.is_retrofit
    }
    get base_list(){
        return ship_data[this.id]["data"][this.index].base_list
    }
    get preloads(){
        return ship_data[this.id]["data"][this.index].preloads
    }
    get hull_id(){
        return ship_data[this.id].type
    }
    get armor_id(){
        return ship_data[this.id].armor
    }
    get nationality_id(){
        return ship_data[this.id].nationality
    }
    get stats(){
        return calculateStats(this)
    }
    get retrofit_stats(){
        let out = {}
        for (let node of this.retrofit_nodes){
            if (this.retrofit_nodes_completed.includes(node.letter)){
                for (let effect of node.effect){
                    let key = Object.keys(effect)[0]
                    if (out[key] === undefined){
                        out[key] = effect[key]
                    }else{
                        out[key] += effect[key]
                    }
                }
            }
        }
    
        //Round to place before floating point error is an issue to make sure everything displays cleanly
        for (let key in out){
            out[key] = Math.round(out[key] * 10000) / 10000
        }
    
        return out
    }
    get equip_stats(){
        return {}
    }
    get has_retrofit(){
        return ship_data[this.id].retrofit !== undefined
    }
    get is_retrofit(){
        if (!this.has_retrofit) return false
        for (let node of ship_data[this.id].retrofit) {
            //Modernization nodes have a skin ID
            if (node.skin_id != 0 && this.retrofit_nodes_completed.includes(node.letter)){
                return true
            }
        };
        return false
    }
    get index(){
        if (this.is_retrofit){
            //Only some retrofitted ships have the "retrofit" section
            return ship_data[this.id]["data"]["retrofit"]? "retrofit":`${this.limit_break}`
        }else{
            return `${this.limit_break}`
        }
    }
    get retrofit_nodes(){
        let out = []
        if (!this.has_retrofit){
            return []
        }
        ship_data[this.id].retrofit.forEach(node => {
            out.push(node)
        });
        return out
    }
    get retrofit_node_letters(){
        let out = []
        ship_data[this.id].retrofit.forEach(node => {
            out.push(node.letter)
        });
        return out
    }

    //Ship images
    get thumbnail(){
        if (this.is_retrofit){
            return ship_data[this.id].skin_thumbnails[ship_data[this.id].skin_thumbnails.length-1]
        }else{
            return ship_data[this.id].skin_thumbnails[0]
        }
    }
    get background(){
        if (!this.empty) return 'ui/bg'+this.rarity+'.png'
        else return "hide"
    }
    get border(){
        if (!this.empty) return 'ui/frame_'+this.rarity+'.png'
        else return "hide"
    }
}