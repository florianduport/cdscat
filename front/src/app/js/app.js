$(document).ready(function(){
  $('.owl-carousel').owlCarousel();
});

var cdscatApp = angular.module('cdscatApp', []);

cdscatApp.controller('cdscatHome', function ($scope) {
  $scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.'},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.'},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.'}
  ];
});
