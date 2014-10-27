angular.module('starter.services', [])
.factory('Cards', function ($http) {
  // Your code here
  /* START SOLUTION */
  var getAll = function (id) {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/cards/new?id=' + id
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getMatches = function(id) {
    return $http({
      method: 'GET',
      url: 'http://localhost:8080/api/cards/matched?id=' + id
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getCompanies = function() {
    return $http({
      method: 'GET',
      url: 'https://still-fjord-2818.herokuapp.com/api/companies'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  var getUsers = function() {
    return $http({
      method: 'GET',
      url: 'https://still-fjord-2818.herokuapp.com/api/users'
    })
    .then(function (resp) {
      return resp.data;
    });
  };

  return {
    getAll: getAll,
    getMatches: getMatches,
    getCompanies: getCompanies,
    getUsers: getUsers
  }

});