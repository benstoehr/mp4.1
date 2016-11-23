//var http = require('http');

var app = angular.module('mp4', ['ngRoute', 'mp4Controllers', 'mp4Services','720kb.datepicker']);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/users', {
    templateUrl: 'partials/users.html',
    controller: 'UserController'
  }).
  when('/users/:id', {
    templateUrl: 'partials/userDetail.html',
    controller: 'userDetailController'
  }).  
  when('/addUser', {
    templateUrl: 'partials/addUser.html',
    controller: 'addUserController'
  }).
  when('/tasks', {
    templateUrl: 'partials/tasks.html',
    controller: 'TaskController'
  }).
  when('/tasks/:id', {
    templateUrl: 'partials/taskDetail.html',
    controller: 'taskDetailController'
  }).
  when('/addTask', {
    templateUrl: 'partials/addTask.html',
    controller: 'addTaskController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);
