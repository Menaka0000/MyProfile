function itemDTO(id,name,description,qty,price){
    var __id=id;
    var __name=name;
    var __description=description;
    var __qty =qty;
    var __price = price;

    this.setID=function (id){
        __id=id;
    }
    this.setName=function (name){
        __name=name;
    }
    this.setDescription=function (description){
        __description=name;
    }
    this.setQty=function (qty){
        __qty=qty;
    }
    this.setPrice=function (price){
        __price=price;
    }
    this.getId=function (){
        return __id;
    }
    this.getName = function(){
        return __name;
    }
    this.getDescription = function(){
        return __description;
    }
    this.getQty = function (){
        return __qty;
    }
    this.getPrice = function (){
        return __price;
    }

}