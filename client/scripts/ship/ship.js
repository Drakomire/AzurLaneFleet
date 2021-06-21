//Ship data is not stored in the class to save space
var ship_data={}

class Ship{
    constructor(id,params){
        //Constructor does not require any stats to avoid async problems
        this.id = id
        this.limit_break = params.limit_break || 3
        this.level = params.level || 120
        this.affinity = params.affinity || 100
        this.oathed = params.oathed || false
        this.retrofit_nodes_completed = params.retrofit_nodes_completed || []
        this.equips = params.equips || [undefined,undefined,undefined,undefined,undefined]
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

    get names(){
        return ship_data[this.id].name
    }
    get slots(){
        return ship_data[this.id].slots
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
    get has_retrofit(){
        return ship_data[this.id].retrofit !== undefined
    }
    get retrofit(){
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
        if (this.retrofit){
            return "retrofit"
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
    get thumbnail(){
        if (this.retrofit){
            return ship_data[this.id].skin_thumbnails[ship_data[this.id].skin_thumbnails.length-1]
        }else{
            return ship_data[this.id].skin_thumbnails[0]
        }
    }
}