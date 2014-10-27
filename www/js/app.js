angular.module('starter', ['ionic',
  'starter.controllers',
  'starter.services',
  'auth0',
  'angular-storage',
  'angular-jwt'])

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

.directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('touchmove', function (e) {
                e.stopPropagation();
            });
        }
    };
 })

.directive('noScroll', function($document) {
  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {
      $document.on('touchmove', function(e) {
        console.log('hi lol');
        e.preventDefault();
      });
    }
  }
})

.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider,
  jwtInterceptorProvider) {

  
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

    .state('company', {
      url: "/company",
      templateUrl: "templates/company.html",
      controller: 'CompanyCtrl'
    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      data: {
        requiresLogin: true
      }
    })

    .state('app.main', {
      url: "/main",
      views: {
        'menuContent': {
          templateUrl: "templates/main.html"
        }
      }
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

    // Configure Auth0
    authProvider.init({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      loginState: 'entry'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise("/");

    jwtInterceptorProvider.tokenGetter = function(store, jwtHelper, auth) {
      var idToken = store.get('token');
      var refreshToken = store.get('refreshToken');
      if (!idToken || !refreshToken) {
        return null;
      }
      if (jwtHelper.isTokenExpired(idToken)) {
        return auth.refreshIdToken(refreshToken).then(function(idToken) {
          store.set('token', idToken);
          return idToken;
        });
      } else {
        return idToken;
      }
    }

    $httpProvider.interceptors.push('jwtInterceptor');
  }).run(function($rootScope, auth, store) {
    $rootScope.$on('$locationChangeStart', function() {
      if (!auth.isAuthenticated) {
        var token = store.get('token');
        if (token) {
          auth.authenticate(store.get('profile'), token);
        }
      }

    })


});

