var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

var refresh = function() {
  $http.get('/resume').success(function(response) {
    console.log("I got the data I requested");
    $scope.resume = response;
    $scope.item = "";
  });
};

refresh();
}]);﻿


var admin = angular.module('admin', []);
admin.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello from admin");


var refresh = function() {
  $http.get('/resume').success(function(response) {
    console.log("I got the data I requested");
    $scope.resume = response;
    $scope.item = "";
  });
};

refresh();

$scope.addSkill = function() {

  console.log($scope.item);
  $scope.item.type = "skill";
  $http.post('/resume', $scope.item).success(function(response) {
    console.log(response);
    refresh();
  });
};
$scope.addProject = function() {

  console.log($scope.item);
  $scope.item.type = "project";
  $http.post('/resume', $scope.item).success(function(response) {
    console.log(response);
    refresh();
  });
};
$scope.addEducation = function() {

  console.log($scope.item);
  $scope.item.type = "edu";
  $http.post('/resume', $scope.item).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/resume/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/resume/' + id).success(function(response) {
    $scope.item = response;
  });
};  

$scope.update = function() {
  console.log($scope.item._id);
  $http.put('/resume/' + $scope.item._id, $scope.item).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.item = "";
}

}]);﻿

var app = angular.module('mainApp', ['ngRoute']);
app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'login.html'
  })
  .when('/admin', {
    templateUrl: 'admin.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});
app.controller('loginCrtl',function($scope,$location){
  $scope.submit = function(){
    var uname = $scope.username;
    var password = $scope.password;
    console.log('Do i got here');
    if($scope.username == 'admin' && $scope.password == 'admin'){
      $location.path('/admin');
    }
    else{
      alert('Fail to Login');
    }
  }
})