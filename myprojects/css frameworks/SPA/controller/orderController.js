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
                totalCalculate();
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
                            console.log(newCost);
                            itemForUpdate.setCItemCost(newCost);
                            totalCalculate();
                            console.log(itemForUpdate.getCItemCost()+'fuck you');
                            var table = document.getElementById('orderTBody');
                            var rowLength = table.rows.length;

                            for (var i = 0; i < rowLength; i += 1) {
                                var row = table.rows[i];
                                let rowId = $(row.cells[0]).text();

                                typeof ($(row.cells[0]).val());
                                let cartItemID = cartValidate($("#orderItemId").val()).getCItemId();

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

$("#btnPlaceOrder").attr('disabled', true);

function cartValidate(itemID) {
    for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].getCItemId() === itemID) {
            return cartItems[i];
        }
    }
    return false;
}

$("#btnPlaceOrder").click(function (){
    placeOrder();
});

function placeOrder(){
   if(orderIdValidate()){
       var newOrder= new orderDTO($("#orderId").val(),$("#orderCusId").val(),$("#date").val(),$("#time").val(),$("#total"),cartItems);
       saveOrder(newOrder);
       swal($("#orderId").val()+" order has been placed successfully!", "");
   }
}
const OrderIDRegEx = /^(O00-)[0-9]{1,3}$/;

function orderIdValidate() {
    if (OrderIDRegEx.test($("#orderId").val())) {
        $("#orderCro").css('display', 'none');
        $("#orderChe").css('display', 'block');
        return true;
    }else {
        $("#orderCro").css('display', 'block');
        $("#orderChe").css('display', 'none');
        return false;
    }
}

$('#orderId').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$("#orderId").on('keyup', function (eventOb) {
    setButtonOnOrderForm();
    orderIdValidate();
    if (eventOb.key == "Enter") {
        orderIdValidate();
    }
});

function setButtonOnOrderForm() {
    let b = orderIdValidate();
    if (b) {
        $("#btnPlaceOrder").attr('disabled', false);
    } else {
        $("#btnPlaceOrder").attr('disabled', true);
    }
}
function totalCalculate(){
    let total=0;
    for (let i = 0; i<cartItems.length; i++){
        total+=cartItems[i].getCItemCost();
    }
    console.log(total);
    $("#total").empty();
    $("#total").text(total);
}

