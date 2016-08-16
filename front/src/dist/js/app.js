var cdscatApp = angular.module('cdscatApp', ['ngResource', 'ngSails', 'ngRoute']);

cdscatApp.config(['$sailsProvider', function ($sailsProvider) {
    $sailsProvider.url = 'http://172.0.0.11:1337';
}]);

cdscatApp.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/', {
          templateUrl: '/js/templates/homepage.html',
          controller: 'cdscatHome'
        }).
        when('/catalog/:calogId', {
          templateUrl: '/js/templates/catalog.html',
          controller: 'catalog'
        }).
        otherwise('/phones');
    }
  ]);

cdscatApp.controller('global', function($scope){

});

cdscatApp.controller('cdscatHome', function ($scope, $sails) {

  $sails.get("/catalog")
  .success(function (data, status, headers, jwr) {

    $scope.catalogs = data;

    for (var i = 0; i < $scope.catalogs.length; i++) {
      $scope.catalogs[i].validity.begin = new Date($scope.catalogs[i].validity.begin).toLocaleDateString();
      $scope.catalogs[i].validity.end = new Date($scope.catalogs[i].validity.end).toLocaleDateString();
    }

  })
  .error(function (data, status, headers, jwr) {
    console.log(data);
  });

});

cdscatApp.controller('catalog', function ($scope, $sails) {

  $sails.get("/catalog")
  .success(function (data, status, headers, jwr) {

    $scope.catalogs = data;

  })
  .error(function (data, status, headers, jwr) {
    console.log(data);
  });

});
