/**
 * Created by Karan on 10-Mar-17.
 */
var app = angular.module('myApp',[]);

app.controller('AppCtrl',['$scope','$http',
function ($scope,$http) {
    console.log("hello");

var refresh = function () {
    $http.get('/contactlist').then(function (response) {
        console.log('got the data');

        $scope.contactlist = response.data;
        $scope.contact ={};
    });
}
    refresh();

    $scope.addContact =function () {
      console.log($scope.contact );
      $http.post('contactlist',$scope.contact).then(function (response) {
            console.log(response);
            refresh();
      });
    };

    $scope.remove = function (id) {
        console.log(id);
        $http.delete('/contactlist/'+id).then(function (response) {
           refresh();
        });

    }

    $scope.edit = function (id) {
      console.log(id);
      $http.get('/contactlist/'+id).then(function (response) {
         $scope.contact= response.data;
      });
    };

    $scope.deselect = function (id) {
        $scope.contact={};
    };

    $scope.update = function () {
        console.log($scope.contact._id);
        // _id - url of contact
        // second parameter will send to server
        $http.put('/contactlist/'+$scope.contact._id,$scope.contact).then(function (response) {
        refresh();
        });
    };


}])