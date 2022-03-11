function loadIds(){
    var select = document.getElementById("dropdown1");
    loadCusDetails(select.options[select.selectedIndex].value)
}

function loadItemIds(){
    var select = document.getElementById("dropdown2");
    loadItemDetails(select.options[select.selectedIndex].value)
}
var cartItems = new Array();
$("#btnAddToCart").click(function (){
    var qtyForSale = $("#orderQtyForSale").val();
    if (ItemNameRegEx.test(qtyForSale)) {
        if (qtyForSale<=$("#qtyOnStock").val()){
            var cartItem = new cartItem("");
        }else {
            swal("Stock quantity is exceeded!", "warning");
        }
    }else {
        swal("The format is incorrect!", "warning");
    }
});