function cartItem(id,qtyForSale,price,cost){
    var __id=id;
    var __qtyForSale =qtyForSale;
    var __price = price;
    var __cost = cost;

    this.setCItemID=function (id){
        __id=id;
    }
    this.setQtyForSale=function (qty){
        __qtyForSale=qty;
    }
    this.setCItemPrice=function (price){
        __price=price;
    }
    this.setCItemCost=function (cost){
        __price=cost;
    }
    this.getCItemId=function (){
        return __id;
    }
    this.getQtyForSale = function (){
        return __qtyForSale;
    }
    this.getCItemPrice = function (){
        return __price;
    }
    this.getCItemCost = function (){
        return __cost;
    }

}