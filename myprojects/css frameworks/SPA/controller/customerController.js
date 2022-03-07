$("#btnCusSave").click(function () {
    let newCustomer = new CustomerDTO($("#txtId").val(), $("#txtFName").val(), $("#txtLName").val(), $("#txtAddress").val(), $("#txtSalary").val());
    if (!searchCustomer($("#txtId").val())) {
        if (checkIfValid()) {
            saveCustomer(newCustomer);
            loadAllCustomers();
            swal("Saved!", newCustomer.getCusId()+" customer was saved successfully", "success");
        }
    } else {
        swal({
            title: "Existing customer Id",
            text: "We found an existing ID that you have just entered, Do you want to update that customer details !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    if(updateCustomer( $("#txtId").val(),$("#txtFName").val(), $("#txtLName").val(),$("#txtAddress").val(), $("#txtSalary").val())){
                        swal("Existing customer has been Updated!", {
                            icon: "success",
                        });
                        $("#cusTBody").empty();
                        loadAllCustomers();
                        clearAll();
                    }else {
                        swal("something went wrong")
                    }

                } else {
                    swal("Change that id and try again!");
                }
            });
    }


});

$("#btnCusSearch").click(function () {
    if (!searchCustomer($("#txtId").val())) {
        let searchId = $("#txtId").val();
        swal("We couldn't able to find the customer that you wish...")
        clearAll();
        $("#txtId").val(searchId);
        checkIfValid();

    }else {
         var typedCustomerID = $("#txtId").val();
                   var srcCustomer = searchCustomer(typedCustomerID);
                   $("#txtId").val(srcCustomer.getCusId());
                   $("#txtFName").val(srcCustomer.getCusFirstName());
                   $("#txtLName").val(srcCustomer.getCusLastName());
                   $("#txtAddress").val(srcCustomer.getCusAddress());
                   $("#txtSalary").val(srcCustomer.getCusSalary());
    }
});

$("#btnCusDelete").click(function () {
    if (!searchCustomer($("#txtId").val())) {
        let searchId = $("#txtId").val();
        swal("We couldn't able to find the customer that you wish...")
        clearAll();
        $("#txtId").val(searchId);
        checkIfValid();
    }else {
        deleteCustomer($("#txtId").val())
    }
});



const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtCusId,#txtFName,#txtLName,#txtAddress,#txtSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault();
    }
});

$('#txtCusId,#txtFName,#txtLName,#txtAddress,#txtSalary').on('blur', function () {
    formValid();
});

//focusing events
$("#txtId").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
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

$("#txtFName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtLName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});
$("#txtSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});
// focusing events end
$("#btnCusSave").attr('disabled', true);

function clearAll() {
    $('#txtId,#txtFName,#txtLName,#txtAddress,#txtSalary').val("");
    $('#cusIdChe,#cusFirstNameChe,#cusLastNameChe,#cusAddressChe,#cusSalaryChe').css('display', 'none');
    $('#txtId').focus();
    $("#btnCusSave").attr('disabled', true);
}

function formValid() {
    var cusID = $("#txtId").val();
    $("#cusIdCro").css('display', 'none');
    $("#cusIdChe").css('display', 'block');
    // $("#lblcusid").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusFName = $("#txtFName").val();

        if (cusNameRegEx.test(cusFName)) {
            $("#cusFirstNameCro").css('display', 'none');
            $("#cusFirstNameChe").css('display', 'block');
            var cusLName = $("#txtLName").val();

            if (cusNameRegEx.test(cusLName)) {
                $("#cusLastNameCro").css('display', 'none');
                $("#cusLastNameChe").css('display', 'block');
                var cusAddress = $("#txtAddress").val();

                if (cusAddressRegEx.test(cusAddress)) {
                    $("#cusAddressCro").css('display', 'none');
                    $("#cusAddressChe").css('display', 'block');
                    var cusSalary = $("#txtSalary").val();

                    if (cusSalaryRegEx.test(cusSalary)) {
                        $("#cusSalaryCro").css('display', 'none');
                        $("#cusSalaryChe").css('display', 'block');

                        return true;

                    } else {
                        $("#cusSalaryChe").css('display', 'none');
                        $("#cusSalaryCro").css('display', 'block');
                    }
                } else {
                    $("#cusAddressChe").css('display', 'none');
                    $("#cusAddressCro").css('display', 'block');
                    return false;
                }
            } else {
                $("#cusLastNameChe").css('display', 'none');
                $("#cusLastNameCro").css('display', 'block');
                return false;
            }
        } else {
            $("#cusFirstNameChe").css('display', 'none');
            $("#cusFirstNameCro").css('display', 'block');
            return false;
        }
    } else {
        $("#cusIdChe").css('display', 'none');
        $("#cusIdCro").css('display', 'block');
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#txtId").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtFName").focus();
        var firstName = $("#txtFName").val();
        if (cusNameRegEx.test(firstName)) {
            $("#txtLName").focus();
            var lastName = $("#txtLName").val();
            if (cusNameRegEx.test(lastName)) {
                $("#txtAddress").focus();
                var address = $("#txtAddress").val();
                if (cusAddressRegEx.test(address)) {
                    $("#txtSalary").focus();
                    var salary = $("#txtSalary").val();
                    var resp = cusSalaryRegEx.test(salary);
                    if (resp) {
                        clearAll();
                        return true;
                    }
                } else {
                    $("#txtAddress").focus();
                    return false;
                }
            } else {
                $("#txtLName").focus();
                return false;
            }
        } else {
            $("#txtFName").focus();
            return false;
        }
    } else {
        $("#txtId").focus();
        return false;
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnCusSave").attr('disabled', false);
    } else {
        $("#btnCusSave").attr('disabled', true);
    }
}

