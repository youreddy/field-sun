angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
  $urlRouterProvider.otherwise("/");
  
  $stateProvider

    .state('entry', {
      url: "/",
      templateUrl: "templates/entry.html",
      controller: 'EntryCtrl'
    })

    .state('signup', {
      url: "/signup",
      templateUrl: "templates/signup.html",
    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html"
    })

    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/profile.html"
        }
      }
    })

    .state('app.matches', {
      url: "/matches",
      views: {
        'menuContent': {
          templateUrl: "templates/matches.html"
        }
      }
    })


  // if none of the above states are matched, use this as the fallback
});

