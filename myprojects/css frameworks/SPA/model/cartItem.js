function cartItem(id,name,description,qtyForSale,price){
    var __id=id;
    var __qtyForSale =qtyForSale;
    var __price = price;

    this.setCItemID=function (id){
        __id=id;
    }
    this.setQtyForSale=function (qty){
        __qtyForSale=qty;
    }
    this.setCItemPrice=function (price){
        __price=price;
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

}