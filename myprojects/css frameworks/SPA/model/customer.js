function CustomerDTO(id, firstName,lastName, address, salary){
    var __id=id;
    var __firstName= firstName;
    var __lastName= lastName;
    var __address= address;
    var __salary = salary;

    this.setCusId= function (id){
        __id=id;
    }
    this.setCusFirstName = function (name){
        __firstName= name;
    }
    this.setCusLastName = function (name){
        __lastName= name;
    }
    this.setCusAddress = function(address){
        __address=address;
    }
    this.setCusSalary= function(salary){
        __salary=salary;
    }
    this.getCusId = function (){
        return __id;
    }
    this.getCusFirstName= function (){
        return __firstName;
    }
    this.getCusLastName= function (){
        return __lastName;
    }
    this.getCusAddress= function (){
        return __address;
    }
    this.getCusSalary= function (){
        return __salary;
    }
}