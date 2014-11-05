// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('sccal', ['ionic'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
    });
});

.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
});


var sccal = angular.module('sccal', ['ionic']);
sccal.controller('EventsController', function($scope, $http) {

    function getRemoteItems() {
        $http.get('http://starcraftcalendar.francoisfaubert.com/api/sc2/events.json')
        .success(function(newItems) {
            $scope.events = newItems;
        })
        .finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.items = null;
    $scope.doRefresh = getRemoteItems;
    getRemoteItems();
});


sccal.controller('SeriesController', function($scope, $http) {

    function getRemoteItems() {
        $http.get('http://starcraftcalendar.francoisfaubert.com/api/sc2/scores.json')
        .success(function(newItems) {
            $scope.series = newItems;
        })
        .finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    $scope.items = null;
    $scope.doRefresh = getRemoteItems;
    getRemoteItems();
});
