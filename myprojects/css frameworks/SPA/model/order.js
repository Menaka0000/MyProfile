function orderDTO(orderId, customerId, date, time, total) {
    var __orderId = orderId;
    var __customerId = customerId;
    var __date = date;
    var __time = time;
    var __total = total;
    var cartItems;

    this.setOrderId = function (oId) {
        __orderId = oId;
    }
    this.setCustomerID = function (cId) {
        __customerId = cId;
    }
    this.setDate = function (date) {
        __date = date;
    }
    this.setTime = function (time) {
        __time = time;
    }
    this.setTotal = function (total) {
        __total = total;
    }
    this.setCartItem = function (cartItem) {
        cartItems = cartItem;
    }
    this.getOrderId = function () {
        return __orderId;
    }
    this.getCustomerId = function () {
        return __customerId;
    }
    this.getDate = function () {
        return __date;
    }
    this.getTime = function () {
        return __time;
    }
    this.getTotal = function () {
        return __total;
    }
    this.getCartItems = function () {
        return cartItems;
    }

}