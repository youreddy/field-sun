angular.module('starter', ['ionic',
  'starter.controllers',
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

.config(function($stateProvider, $urlRouterProvider, authProvider, $httpProvider,
  jwtInterceptorProvider) {
  
  
  $stateProvider

    .state('login', {
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
      // The tab requires user login
      data: {
        requiresLogin: true
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
      domain: 'youreddy.auth0.com',
      clientID: 'ulQT44QjGspPoSuXEKHUTl784pB86Igy',
      loginState: 'login'
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

