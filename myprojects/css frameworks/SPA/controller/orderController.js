function loadIds() {
    let select = document.getElementById("dropdown1");
    loadCusDetails(select.options[select.selectedIndex].value)
}

function loadItemIds() {
    let select = document.getElementById("dropdown2");
    loadItemDetails(select.options[select.selectedIndex].value);
}

var cartItems = [];

$("#btnAddToCart").click(function () {
    let qtyForSale = parseInt($("#orderQtyForSale").val());
    let stock = parseInt($("#qtyOnStock").val());
    let updatedStockQty = $("#qtyOnStock").val() - $("#orderQtyForSale").val();
    if (ItemQtyRegEx.test(String(qtyForSale))) {
        if (stock >= qtyForSale) {
            if (!cartValidate($("#orderItemId").val())) {
                let costForItem = $("#orderItemPrice").val() * $("#orderQtyForSale").val();
                let cartItem1 = new cartItem($("#orderItemId").val(), $("#orderQtyForSale").val(), $("#orderItemPrice").val(), costForItem);
                cartItems.push(cartItem1);
                updateItemQty($("#orderItemId").val(), updatedStockQty);
                $("#qtyOnStock").val(updatedStockQty);
                $("#orderTBody").append(`<tr><td>${$("#orderItemId").val()}</td><td>${$("#orderItemName").val()}</td><td>${$("#orderItemDescription").val()}</td><td>${$("#orderQtyForSale").val()}</td><td>${$("#orderItemPrice").val()}</td><td>${costForItem}</td></tr>`);

            } else {

                swal({
                    title: "Confirmation",
                    text: "This item is already in the cart, Do you want to add more!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            let itemForUpdate = cartValidate($("#orderItemId").val());
                            let newQtyForSale = parseInt(itemForUpdate.getQtyForSale()) + parseInt($("#orderQtyForSale").val());
                            itemForUpdate.setQtyForSale(newQtyForSale);
                            let newCost = parseInt(itemForUpdate.getCItemPrice()) * newQtyForSale;
                            itemForUpdate.setCItemCost(newCost);

                            var table = document.getElementById('orderTBody');
                            var rowLength = table.rows.length;

                            for (var i = 0; i < rowLength; i += 1) {
                                var row = table.rows[i];
                                let rowId = $(row.cells[0]).text();
                                console.log(rowId);
                                typeof ($(row.cells[0]).val());
                                let cartItemID = cartValidate($("#orderItemId").val()).getCItemId();
                                console.log(cartItemID);
                                if (rowId === cartItemID) {
                                    row.cells[3].innerText = String(newQtyForSale);
                                    row.cells[5].innerText = String(newCost);
                                }

                                //your code goes here, looping over every row.
                                //cells are accessed as easy

                                /* var cellLength = row.cells.length;
                                 for(var y=0; y<cellLength; y+=1){
                                     var cell = row.cells[y];
                                     //do something with every cell here
                                 }*/
                            }
                            $("#qtyOnStock").val(updatedStockQty);
                            updateItemQty($("#orderItemId").val(), updatedStockQty);
                            swal("cart was Updated!","");
                        }
                    });
            }
        } else {
            swal("Stock quantity is exceeded!", "");
        }
    } else {
        swal("The format is incorrect!", "");
    }
});

function cartValidate(itemID) {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].getCItemId() === itemID) {
            return cartItems[i];
        }
    }
    return false;
}

function  loadItemFromCart(id){
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].getCItemId() === id) {
            $("#orderItemId").val(cartItems[i].getCItemId());
            $("#qtyOnStock").val(cartItems[i].getQtyOnStock());
        }
    }
}

function loadMissingDetails(id){
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemId() === id) {
            $("#orderItemName").val(itemDB[i].getItemName());
            $("#orderItemDescription").val(itemDB[i].getItemDescription());
            $("#orderItemPrice").val(itemDB[i].getItemPrice());
        }
    }
}

function  updateCart(){

}