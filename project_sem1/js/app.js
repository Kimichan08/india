// khai bao app bang cu phap angular.module('ten app', ['module(option)'])

var app = angular.module('myApp', ["ngRoute"])

//dinh nghia controller cho angularjs app, theo ten cua ng-controll
/*syntax: app.controller('ten ctrl', function(cac params su dung, mac dinh phai co $scope){
    cac code thuc thi trong day
}) 
*/
app.controller('myCtrl', function ($scope, $http, $location) {
    $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");    
    $scope.submit = function (search) {
        $location.path('/result')
        $http.get('data.json')
            .then((response) => {
                response.data.products.filter()
            })
        $scope.result = search;
    }

    $http.get('data.json')
        .then((response) => {
            $scope.products = response.data.products
        })

})


app.controller('detailsController', function ($scope, $http, $location, $routeParams) {
    $scope.uri = $routeParams.id;

    $http.get('data.json')
        .then((response) => {
            $scope.datas = response.data.products
        })
        .catch((err) => {
            console.log(err)
        })


    $scope.qty = 1;

    $scope.minus = function () {
        if ($scope.qty <= 1) {
            $scope.qty = 1;
        } else {
            $scope.qty--;
        }
    }
    $scope.plus = function () {
        $scope.qty++
    }
    $scope.spinnerText = function () {
        return $scope.qty;
    }
// cart
    $scope.addToCart = function (item, qty) {
        $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");
        $scope.data = {
            cart: { item, qty }
        }
        $scope.carts.push($scope.data)
        localStorage.setItem("cart", JSON.stringify($scope.carts))
        console.log($scope.carts)
    }
})

// get data from local storage
app.controller('cartCtrl', function($scope){
    $scope.carts = JSON.parse(localStorage.getItem("cart") || "[]");    
    console.log($scope.carts);

    $scope.handleAction = function(id){
        $scope.find = $scope.carts.findIndex(item => item.cart.item.id === id)
        $scope.carts.splice($scope.find, 1)
        localStorage.setItem("cart", JSON.stringify($scope.carts))
        console.log($scope.find);
    }
})

// dinh tuyen router cho angularjs app
app.config([
    "$routeProvider", function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "views/home.html"
            })
            .when('/about', {
                templateUrl: "views/about.html"
            })
            .when('/service', {
                templateUrl: "views/service.html"
            })
            .when('/pricing', {
                templateUrl: "views/pricing.html"
            })
            .when('/shop', {
                templateUrl: "views/shop.html"
            })
            .when('/contact', {
                templateUrl: "views/contact.html"
            })
            .when('/result', {
                templateUrl: "views/result.html"
            })
            .when('/details/:id', {
                templateUrl: "views/details.html"
            })
            .when('/cart', {
                templateUrl: "views/cart.html"
            })
            .when('/login', {
                templateUrl: "views/login.html"
            })
            .when('/register', {
                templateUrl: "views/register.html"
            })
    }
])