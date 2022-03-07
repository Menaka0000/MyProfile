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
        let row = `<tr><td>${customerDB[i].getId()}</td><td>${customerDB[i].getFirstName()}</td><td>${customerDB[i].getLastName()}</td><td>${customerDB[i].getAddress()}</td><td>${customerDB[i].getSalary()}</td></tr>`
        $("#cusTBody").append(row);
    }
}

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getId() === id) {
            return customerDB[i];
        }
    }
    return false;
}

function updateCustomer(id,firstname, lastname, address , salary){
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getId() === id) {
           customerDB[i].setFirstName(firstname);
           customerDB[i].setLastName(lastname);
           customerDB[i].setAddress(address);
           customerDB[i].setSalary(salary);
           return true;
        }
    }
    return false;
}
function deleteCustomer(id){
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getId() === id) {
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