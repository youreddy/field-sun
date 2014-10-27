angular.module('starter.controllers', ['ionic.contrib.ui.tinderCards'])

.controller('EntryCtrl', function($scope, $state) {
  
    $scope.signIn = function(user) {
      $state.go('app.main');
      
    };
})

.controller('CompanyCtrl', function($scope, $state) {
  
    $scope.signInCompany = function(user) {
      $state.go('app.profile');
      
    };
})

.controller('CardsCtrl', function($scope, TDCardDelegate, Cards) {
  console.log('CARDS CTRL');
  // var cardTypes = [
  //   { image: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg' },
  //   { image: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' },
  //   { image: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg' },
  // ];

  // $scope.cards = Array.prototype.slice.call(cardTypes, 0);

  $scope.getCompanies = function() {
    console.log("calling getCompanies");
    Cards.getCompanies()
      .then(function(result) {
        console.log("COMPANIES GET", result)
        $scope.cards = Array.prototype.slice.call(result, 0);
      });
  }

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }

  $scope.getCompanies();
})

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    $scope.addCard();
  };

  
});

