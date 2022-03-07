$("#btnItemSave").click(function (){
    let newItem = new itemDTO($("#txtItemId").val(),$("#txtItemName").val(),$("#txtItemDes").val(),$("#txtItemQty").val(),$("#txtItemPrice").val());
    if (!searchItem($("#txtItemId").val())) {
        if (checkIfValidItem()) {
            saveItem(newItem);
            loadAllItems();
            swal("Saved!", newItem.getItemId()+" Item was saved successfully", "success");
        }
    } else {
        swal({
            title: "Existing Item Id",
            text: "We found an existing ID that you have just entered, Do you want to update that item details !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    if(updateItem( $("#txtItemId").val(),$("#txtItemName").val(), $("#txtItemDes").val(),$("#txtItemQty").val(), $("#txtItemPrice").val())){
                        swal("Existing item has been Updated!", {
                            icon: "success",
                        });
                        $("#itemTBody").empty();
                        loadAllItems();
                        clearAllItems();
                    }else {
                        swal("something went wrong")
                    }

                } else {
                    swal("Change that id and try again!");
                }
            });
    }
});


$("#btnItemSearch").click(function (){
    if (!searchItem($("#txtItemId").val())) {
        let searchId = $("#txtItemId").val();
        swal("We couldn't able to find the item that you wish...")
        clearAllItems();
        $("#txtItemId").val(searchId);
        checkIfValidItem();

    }else {
        var typedItemID = $("#txtItemId").val();
        var srcItem = searchItem(typedItemID);
        $("#txtItemId").val(srcItem.getItemId());
        $("#txtItemName").val(srcItem.getItemName());
        $("#txtItemDes").val(srcItem.getItemDescription());
        $("#txtItemQty").val(srcItem.getItemQty());
        $("#txtItemPrice").val(srcItem.getItemPrice());
    }
});


$("#btnItemDelete").click(function () {
    if (!searchItem($("#txtItemId").val())) {
        let searchId = $("#txtItemId").val();
        swal("We couldn't able to find the customer that you wish...")
        clearAllItems();
        $("#txtItemId").val(searchId);
        checkIfValidItem();
    }else {
        deleteItem($("#txtItemId").val())
    }
});


const ItemIDRegEx = /^(I00-)[0-9]{1,3}$/;
const ItemNameRegEx = /^[A-z ]{3,20}$/;
const ItemDesRegEx = /^[0-9/A-z. ,]{7,}$/;
const ItemQtyRegEx = /^[0-9]{1,9}$/;
const ItemPriceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

$('#txtItemId,#txtItemName,#txtItemDes,#txtItemQty,#txtItemPrice').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtItemId,#txtItemName,#txtItemDes,#txtItemQty,#txtItemPrice').on('blur', function () {
    itemFormValid();
});

//focusing events
$("#txtItemId").on('keyup', function (eventOb) {
    setButtonOnItemForm();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }

    /* if (eventOb.key == "Control") {
         var typedCustomerID = $("#txtId").val();
         var srcCustomer = searchCustomer(typedCustomerID);
         $("#txtId").val(srcCustomer.getId());
         $("#txtFName").val(srcCustomer.getFirstName());
         $("#txtLName").val(srcCustomer.getLastName());
         $("#txtAddress").val(srcCustomer.getAddress());
         $("#txtSalary").val(srcCustomer.getSalary());
     }
 */

});

$("#txtItemName").on('keyup', function (eventOb) {
    setButtonOnItemForm();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#txtItemDes").on('keyup', function (eventOb) {
    setButtonOnItemForm();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});

$("#txtItemQty").on('keyup', function (eventOb) {
    setButtonOnItemForm();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});
$("#txtItemPrice").on('keyup', function (eventOb) {
    setButtonOnItemForm();
    if (eventOb.key == "Enter") {
        checkIfValidItem();
    }
});
// focusing events end
$("#btnItemSave").attr('disabled', true);




function clearAllItems() {
    $('#txtItemId,#txtItemName,#txtItemDes,#txtItemQty,#txtItemPrice').val("");
    $('#ItemIdChe,#ItemNameChe,#ItemDesChe,#ItemQtyChe,#ItemPriceChe').css('display', 'none');
    $('#txtItemId').focus();
    $("#btnItemSave").attr('disabled', true);
}


function itemFormValid() {
    var itemId = $("#txtItemId").val();
    $("#ItemIdCro").css('display', 'none');
    $("#ItemIdChe").css('display', 'block');
    // $("#lblcusid").text("");
    if (ItemIDRegEx.test(itemId)) {
        var itemName = $("#txtItemName").val();

        if (ItemNameRegEx.test(itemName)) {
            $("#ItemNameCro").css('display', 'none');
            $("#ItemNameChe").css('display', 'block');
            var itemDes = $("#txtItemDes").val();

            if (ItemDesRegEx.test(itemDes)) {
                $("#ItemDesCro").css('display', 'none');
                $("#ItemDesChe").css('display', 'block');
                var itemQty = $("#txtItemQty").val();

                if (ItemQtyRegEx.test(itemQty)) {
                    $("#ItemQtyCro").css('display', 'none');
                    $("#ItemQtyChe").css('display', 'block');
                    var itemPrice = $("#txtItemPrice").val();

                    if (ItemPriceRegEx.test(itemPrice)) {
                        $("#ItemPriceCro").css('display', 'none');
                        $("#ItemPriceChe").css('display', 'block');

                        return true;

                    } else {
                        $("#ItemPriceChe").css('display', 'none');
                        $("#ItemPriceCro").css('display', 'block');
                    }
                } else {
                    $("#ItemQtyChe").css('display', 'none');
                    $("#ItemQtyCro").css('display', 'block');
                    return false;
                }
            } else {
                $("#ItemDesChe").css('display', 'none');
                $("#ItemDesCro").css('display', 'block');
                return false;
            }
        } else {
            $("#ItemNameChe").css('display', 'none');
            $("#ItemNameCro").css('display', 'block');
            return false;
        }
    } else {
        $("#ItemIdChe").css('display', 'none');
        $("#ItemIdCro").css('display', 'block');
        return false;
    }
}



function checkIfValidItem() {
    var itemID = $("#txtItemId").val();
    if (ItemIDRegEx.test(itemID)) {
        $("#txtItemName").focus();
        var itemName = $("#txtItemName").val();
        if (ItemNameRegEx.test(itemName)) {
            $("#txtItemDes").focus();
            var itemDescription = $("#txtItemDes").val();
            if (ItemDesRegEx.test(itemDescription)) {
                $("#txtItemQty").focus();
                var itemQty = $("#txtItemQty").val();
                if (ItemQtyRegEx.test(itemQty)) {
                    $("#txtItemPrice").focus();
                    var price = $("#txtItemPrice").val();
                    var resp = ItemPriceRegEx.test(price);
                    if (resp) {
                        clearAllItems();
                        return true;
                    }
                } else {
                    $("#txtItemQty").focus();
                    return false;
                }
            } else {
                $("#txtItemDes").focus();
                return false;
            }
        } else {
            $("#txtItemName").focus();
            return false;
        }
    } else {
        $("#txtItemId").focus();
        return false;
    }
}

function setButtonOnItemForm() {
    let b = itemFormValid();
    if (b) {
        $("#btnItemSave").attr('disabled', false);
    } else {
        $("#btnItemSave").attr('disabled', true);
    }
}