'use strict';
app.controller('homeController', ['$scope', '$http', function ($scope, $http) {

    var service = '/api/tasks';

    $scope.tasks = null;
    $scope.isHttpBusy = false;
    $scope.today = new Date();
    $scope.taskItem = [];
    $scope.toDoListItem = {};

    var onGetAll = function (response) {
        $scope.tasks = response.data;
        $http.isHttpBusy = false;
        angular.forEach($scope.tasks, function (value, key) {
            var complete = false;
            if (value.is_done == 1)
            {
                complete = true;    
            }
            $scope.taskItem.push({
                name: value.name,
                date: value.date,
                complete: complete,
                id: value.id,
                is_done: value.is_done
            });
        });
    }

    var onGetAllErr = function (reason) {
        $http.isHttpBusy = false;
        alert("Görevler getirilirken bir problem oluştu!");
    }

    $scope.getAll = function () {
        $scope.isHttpBusy = true;
        $http.get(service).then(onGetAll, onGetAllErr);
    }

    $scope.getAll();

    var onAdd = function (response) {
        $scope.isHttpBusy = false;
        var complete = false;
        if (response.data.is_done == 1) {
            complete = true;
        }
        $scope.taskItem.push({
            name: response.data.name,
            date: response.data.date,
            complete: complete,
            id: response.data.id,
            is_done: response.data.is_done
        });
        $scope.toDoListItem = {};
    }

    var onAddErr = function (reason) {
        $scope.isHttpBusy = false;
        alert("Yeni görev eklenemedi!");
        $scope.toDoListItem = {};
    }

    $scope.addNew = function (toDoListItem) {
        $scope.isHttpBusy = true;
        $http.post(service + '/add', toDoListItem).then(onAdd, onAddErr);
    }
    
    var onUpdate = function (response) {
        $scope.taskItem = [];
        $scope.tasks = response.data;
        $http.isHttpBusy = false;
        angular.forEach($scope.tasks, function (value, key) {
            var complete = false;
            if (value.is_done == 1) {
                complete = true;
            }
            $scope.taskItem.push({
                name: value.name,
                date: value.date,
                complete: complete,
                id: value.id,
                is_done: value.is_done
            });
        });
    };


    var onUpdateErr = function (reason) {
        $scope.isHttpBusy = false;
        alert("Görev güncellenemedi!");
    };

    $scope.save = function (taskItem) {
        $scope.isHttpBusy = true;
        if (taskItem.complete)
            taskItem.is_done = 1;
        else
            taskItem.is_done = 0;
        $http.put(service + '/update', taskItem).then(onUpdate, onUpdateErr);
    };
    
    var onDelete = function (response) {
        $scope.taskItem = [];
        $scope.tasks = response.data;
        $http.isHttpBusy = false;
        angular.forEach($scope.tasks, function (value, key) {
            var complete = false;
            if (value.is_done == 1) {
                complete = true;
            }
            $scope.taskItem.push({
                name: value.name,
                date: value.date,
                complete: complete,
                id: value.id,
                is_done: value.is_done
            });
        });
    };

    var onDeleteErr = function (reason) {
        $scope.isHttpBusy = false;
        alert("Silme işlemi gerçekleşemedi!");
    }

    $scope.deleteTask = function (toDoListItem) {
        var completedTask = toDoListItem;
        $scope.isHttpBusy = true;
        var deleteTaskItem = [];
        var i = 0;
        angular.forEach(completedTask, function (taskItem) {
            if (taskItem.complete) {
                deleteTaskItem.push(taskItem.id);
                i = i + 1;
            }
        });
        var postData = { "deleteTaskId": deleteTaskItem };
        $http.delete(service + '/delete', JSON.stringify(postData)).then(onDelete, onDeleteErr);
    }
}]);