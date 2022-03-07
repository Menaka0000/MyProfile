function CustomerDTO(id, firstName,lastName, address, salary){
    var __id=id;
    var __firstName= firstName;
    var __lastName= lastName;
    var __address= address;
    var __salary = salary;

    this.setId= function (id){
        __id=id;
    }
    this.setFirstName = function (name){
        __firstName= name;
    }
    this.setLastName = function (name){
        __lastName= name;
    }
    this.setAddress = function(address){
        __address=address;
    }
    this.setSalary= function(salary){
        __salary=salary;
    }
    this.getId = function (){
        return __id;
    }
    this.getFirstName= function (){
        return __firstName;
    }
    this.getLastName= function (){
        return __lastName;
    }
    this.getAddress= function (){
        return __address;
    }
    this.getSalary= function (){
        return __salary;
    }
}