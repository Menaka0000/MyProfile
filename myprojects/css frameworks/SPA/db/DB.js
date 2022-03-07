var customerDB= new Array();
var itemDB= new Array();
var OrderDB=new Array();

function saveCustomer(customer){
    customerDB.push(customer);
    $("#cusTBody > tr").click(function () {
        $("#txtId").val($(this).children(":eq(0)").text());
        $("#txtFName").val($(this).children(":eq(1)").text());
        $("#txtLName").val($(this).children(":eq(2)").text());
        $("#txtAddress").val($(this).children(":eq(3)").text());
        $("#txtSalary").val($(this).children(":eq(4)").text());
        // checkIfValid();
    });
}

function loadAllCustomers(){
    $("#cusTBody").empty();
    for (let i = 0; i < customerDB.length; i++) {
        let row = `<tr><td>${customerDB[i].getCusId()}</td><td>${customerDB[i].getCusFirstName()}</td><td>${customerDB[i].getCusLastName()}</td><td>${customerDB[i].getCusAddress()}</td><td>${customerDB[i].getCusSalary()}</td></tr>`
        $("#cusTBody").append(row);
    }
}

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCusId() === id) {
            return customerDB[i];
        }
    }
    return false;
}

function updateCustomer(id,firstname, lastname, address , salary){
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCusId() === id) {
           customerDB[i].setCusFirstName(firstname);
           customerDB[i].setCusLastName(lastname);
           customerDB[i].setCusAddress(address);
           customerDB[i].setCusSalary(salary);
           return true;
        }
    }
    return false;
}
function deleteCustomer(id){
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCusId() === id) {
            swal({
                title: "Do you really want to remove this customer!",
                text: "This will remove all the details of that customer and you can't get it back!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        customerDB.splice(i, 1);
                        swal("Deleted!", id+" customer was deleted successfully", "success");
                        $("#cusTBody").empty();
                        loadAllCustomers();
                        clearAll();
                    }
                });
        }
    }
    return false;
}



/*Item Script*/

function searchItem(id) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemId() === id) {
            return itemDB[i];
        }
    }
    return false;
}

function loadAllItems(){
    $("#itemTBody").empty();
    for (let i = 0; i < itemDB.length; i++) {
        let row = `<tr><td>${itemDB[i].getItemId()}</td><td>${itemDB[i].getItemName()}</td><td>${itemDB[i].getItemDescription()}</td><td>${itemDB[i].getItemQty()}</td><td>${itemDB[i].getItemPrice()}</td></tr>`
        $("#itemTBody").append(row);
    }
}

function saveItem(item){
    itemDB.push(item);
    $("#itemTBody > tr").click(function () {
        $("#txtItemId").val($(this).children(":eq(0)").text());
        $("#txtItemName").val($(this).children(":eq(1)").text());
        $("#txtItemDes").val($(this).children(":eq(2)").text());
        $("#txtItemQty").val($(this).children(":eq(3)").text());
        $("#txtItemPrice").val($(this).children(":eq(4)").text());
        // checkIfValid();
    });
}


function updateItem(id,name, des, qty , price){
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemId() === id) {
            itemDB[i].setItemName(name);
            itemDB[i].setItemDescription(des);
            itemDB[i].setItemQty(qty);
            itemDB[i].setItemPrice(price);
            return true;
        }
    }
    return false;
}

function deleteItem(id){
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemId() === id) {
            swal({
                title: "Do you really want to remove this item!",
                text: "This will remove all the details of that item and you can't get it back!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        itemDB.splice(i, 1);
                        swal("Deleted!", id+" item was deleted successfully", "success");
                        $("#itemTBody").empty();
                        loadAllItems();
                        clearAllItems();
                    }
                });
        }
    }
    return false;
}