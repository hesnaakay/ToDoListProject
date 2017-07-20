var app = angular.module('ToDoListApp', ['ngRoute', 'angular-loading-bar']);

app.config(function ($routeProvider) {

    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html"
    });
    $routeProvider.otherwise({ redirectTo: "/home" });
});