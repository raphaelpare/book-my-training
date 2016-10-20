var app = angular.module('bookingApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'pages/home.html',
    controller  : 'HomeController'
  })

  .when('/blog', {
    templateUrl : 'pages/map.html',
    controller  : 'MapController'
  })

  .when('/newOffer', {
    templateUrl : 'pages/newOffer.html',
    controller  : 'NewOfferController'
  })

  .otherwise({redirectTo: '/'});
});

app.controller('HomeController', function($scope) {
  $scope.message = 'Hello from HomeController';
  Materialize.showStaggeredList('#collection');
});

app.controller('MapController', function($scope) {
  $scope.message = 'Hello from MapController';
});

app.controller('NewOfferController', function($scope) {
  $scope.message = 'Hello from NewOfferController';
});