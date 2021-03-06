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

        if(typeof analytics !== "undefined") {
            analytics.startTrackerWithId("UA-1624062-6");
        } else {
            console.log("Google Analytics Unavailable");
        }

    });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('results', {
      url: "/results",
      views: {
        'results': {
            templateUrl: "templates/results.html"
        }
      }
    })
    .state('events', {
      url: "/events",
      views: {
        'events': {
            templateUrl: "templates/events.html"
        }
      }
    })
    .state('about', {
      url: "/about",
      views: {
        'about': {
          templateUrl: "templates/about.html"
        }
      }
    });

   $urlRouterProvider.otherwise("/results");
})

.controller('EventsController', function($scope, $http, $sce, $filter, $state) {

    if(typeof analytics !== "undefined") { analytics.trackView("/events"); }

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

    /*
    function addToCalendar(event) {
        try {
            cordova.plugins.CalendarPlugin.createEvent(
                event.name,
                'http://wcs.battle.net/',
                '',
                $filter('date')(event.start_date_utc, "fullDate", 'UTC'), // Start date as a timestamp in ms
                $filter('date')(event.start_date_utc, "fullDate", 'UTC'), // End date as a timestamp in ms
                false, // Whether it is an all day event or not,
                function(){}, // function called on success
                function(){} // function called on error
            );
        } catch(e) {
            console.log("Could not call the cordova plugin.");
        }
    }; */

    function addMomentClass(event) {
        var eventDate = new Date(event.start_date_utc),
            today = new Date();

        if(eventDate.getDate() === today.getDate() && eventDate.getMonth() === today.getMonth() && eventDate.getYear() === today.getYear()) {
            return "today";
        }
    };

    function toLocalTime(event) {
        var eventDate = new Date(event.start_date_utc);
        return eventDate.getTime() + (eventDate.getTimezoneOffset() * 60 * 10000);
    };

    function formatName(str) {
        return $sce.trustAsHtml(str.replace(' (', '<br/>('));
    };

    $scope.items = null;
    $scope.doRefresh = getRemoteItems;
    //$scope.addToCalendar = addToCalendar;
    $scope.goTo = function(section) { $state.go(section) };
    $scope.addMomentClass = addMomentClass;
    $scope.formatName = formatName;
    $scope.toLocalTime = toLocalTime;

    getRemoteItems();
})

.controller('SeriesController', function($scope, $http, $state) {
    if(typeof analytics !== "undefined") { analytics.trackView("/scores"); }

    function getRemoteItems() {
        $http.get('http://starcraftcalendar.francoisfaubert.com/api/sc2/scores.json')
        .success(function(newItems) {
            $scope.series = newItems;
        })
        .finally(function() {
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    function hasWon(score1, score2) {
        return (score1 > score2) ? "winning" : "losing";
    };

    $scope.goTo = function(section) { $state.go(section) };
    $scope.items = null;
    $scope.doRefresh = getRemoteItems;
    $scope.hasWon = hasWon;

    getRemoteItems();
})

.controller('AboutController', function($scope, $http, $state) {
    if(typeof analytics !== "undefined") { analytics.trackView("/about"); }
    $scope.goTo = function(section) { $state.go(section) };
});
