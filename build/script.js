/*!
 * Project: taskbin
 * Author: Alejandro Montannez <codeams@gmail.com>
 * Version: 0.1.0
 * Build date: 2016-11-18
 * License: UNLICENSED
 */

!function() {
    "use strict";
    var config = {
        apiKey: "AIzaSyBSd7MiIDP8ePhC8DHRELEK4EMYqoyqOfw",
        authDomain: "taskbin-17a87.firebaseapp.com",
        databaseURL: "https://taskbin-17a87.firebaseio.com",
        storageBucket: "taskbin-17a87.appspot.com",
        messagingSenderId: "873960629845"
    };
    firebase.initializeApp(config);
}(), function() {
    "use strict";
    angular.module("TaskArchiveModule", [ "firebase" ]);
}(), function() {
    "use strict";
    angular.module("TaskListModule", [ "firebase", "TaskArchiveModule" ]);
}(), function() {
    angular.module("main", [ "TaskListModule", "ngRoute" ]);
}(), function() {
    "use strict";
    function routeConfiguration($routeProvider) {
        $routeProvider.when("/task-list", {
            templateUrl: "templates/TaskList.template.html",
            controller: "TaskListController",
            controllerAs: "vm"
        }).when("/login", {
            template: "This is the login page (:"
        }).otherwise({
            redirectTo: "/task-list"
        });
    }
    angular.module("main").config(routeConfiguration), routeConfiguration.$inject = [ "$routeProvider" ];
}(), function() {
    "use strict";
    function extKeycode() {
        return function($scope, $element, $attributes) {
            $element.bind("keyup", function(event) {
                var keyCode = event.which || event.keyCode;
                keyCode === $attributes.code && $scope.$eval($attributes.extKeycode);
            });
        };
    }
    angular.module("main").directive("extKeycode", extKeycode);
}(), function() {
    "use strict";
    function extDownArrow() {
        return function(scope, element, attributes) {
            element.bind("keyup", function(event) {
                event.preventDefault(), 40 === event.which && scope.$eval(attributes.extDownArrow);
            });
        };
    }
    angular.module("TaskListModule").directive("extDownArrow", extDownArrow);
}(), function() {
    function extUpArrow() {
        return function(scope, element, attributes) {
            element.bind("keyup", function(event) {
                event.preventDefault(), 38 === event.which && scope.$eval(attributes.extUpArrow);
            });
        };
    }
    angular.module("TaskListModule").directive("extUpArrow", extUpArrow);
}(), function() {
    "use strict";
    function TaskArchive($firebaseArray) {
        function getTaskArchive() {
            return TaskArchive.taskArchive;
        }
        function addTask(task) {
            TaskArchive.taskArchive.$add(task);
        }
        function removeTask(task) {
            TaskArchive.taskArchive.$remove(task);
        }
        var taskArchiveDatabaseReference = firebase.database().ref().child("archives"), TaskArchive = {
            taskArchive: $firebaseArray(taskArchiveDatabaseReference),
            getTaskArchive: getTaskArchive,
            addTask: addTask,
            removeTask: removeTask
        };
        return TaskArchive;
    }
    angular.module("TaskArchiveModule").factory("TaskArchive", TaskArchive), TaskArchive.$inject = [ "$firebaseArray" ];
}(), function() {
    "use strict";
    function TaskListController(TaskList, TaskArchive) {
        var vm = this;
        vm.taskList = TaskList.getList(), vm.moveTaskUpwards = function(task) {
            TaskList.moveTaskUpwards(task);
        }, vm.moveTaskDownwards = function(task) {
            TaskList.moveTaskDownwards(task);
        }, vm.taskChange = function(task) {
            TaskList.saveTask(task);
        }, vm.addTask = function() {
            TaskList.addTask();
        }, vm.archiveTask = function(task) {
            TaskArchive.addTask(task), TaskList.removeTask(task);
        };
    }
    angular.module("TaskListModule").controller("TaskListController", TaskListController), 
    TaskListController.$inject = [ "TaskList", "TaskArchive" ];
}(), function() {
    function tasksList() {
        return {
            restrict: "E",
            templateUrl: "app/tasks-list/TaskList.template.html",
            controller: "TaskListController",
            controllerAs: "vm"
        };
    }
    angular.module("TaskListModule").directive("tasksList", tasksList);
}(), function() {
    "use strict";
    function TaskList($firebaseArray) {
        function getList() {
            return TaskList.list;
        }
        function saveTask(task) {
            TaskList.list.$save(task);
        }
        function addTask() {
            TaskList.list.$add({
                text: "",
                done: !1,
                position: TaskList.list.length + 1
            });
        }
        function removeTask(task) {
            TaskList.list.forEach(function(iterationTask) {
                iterationTask.position > task.position && iterationTask.position--, TaskList.saveTask(iterationTask);
            }), TaskList.list.$remove(task);
        }
        function moveTaskUpwards(task) {
            for (var i = 0; i < TaskList.list.length; i++) if (TaskList.list[i].position === task.position - 1) {
                TaskList.list[i].position++, task.position--, TaskList.saveTask(task), TaskList.saveTask(TaskList.list[i]);
                break;
            }
        }
        function moveTaskDownwards(task) {
            for (var i = 0; i < TaskList.list.length; i++) if (TaskList.list[i].position === task.position + 1) {
                TaskList.list[i].position--, task.position++, TaskList.saveTask(task), TaskList.saveTask(TaskList.list[i]);
                break;
            }
        }
        var taskListDatabaseReference = firebase.database().ref().child("tasks"), TaskList = {
            list: $firebaseArray(taskListDatabaseReference),
            getList: getList,
            saveTask: saveTask,
            addTask: addTask,
            removeTask: removeTask,
            moveTaskUpwards: moveTaskUpwards,
            moveTaskDownwards: moveTaskDownwards
        };
        return TaskList;
    }
    angular.module("TaskListModule").factory("TaskList", TaskList), TaskList.$inject = [ "$firebaseArray" ];
}();
//# sourceMappingURL=script.map.js