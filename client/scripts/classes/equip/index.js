class Equip{
    constructor(id){
        this.id = id
        if (this.id == 0){
            this.empty = true
        }else{
            this.empty = false
        }
    }
    get name(){
        return {
            "en" : equip_data[this.id].en_name
        }
    }
    get type(){
        return equip_data[this.id].type
    }
    get property(){
        return {}
    }
    get icon(){
        return equip_data[this.id].icon
    }
    get rarity(){
        return equip_data[this.id].rarity
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