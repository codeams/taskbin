/*!
 * Project: taskbin
 * Author: Alejandro Montannez <codeams@gmail.com>
 * Version: 0.1.0
 * Build date: 2016-11-19
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
    angular.module("BoardModule", [ "firebase", "TaskArchiveModule" ]);
}(), function() {
    "use strict";
    angular.module("PanelModule", [ "firebase" ]);
}(), function() {
    angular.module("main", [ "PanelModule", "BoardModule", "ngRoute", "ngAnimate" ]);
}(), function() {
    "use strict";
    function routeConfiguration($routeProvider) {
        $routeProvider.when("/login", {
            template: "This is the login page (:"
        }).when("/panel", {
            templateUrl: "templates/Panel.template.html",
            controller: "PanelController",
            controllerAs: "vm"
        }).when("/board", {
            templateUrl: "templates/Board.template.html",
            controller: "BoardController",
            controllerAs: "vm"
        }).when("/board/:id", {
            templateUrl: "templates/Board.template.html",
            controller: "BoardController",
            controllerAs: "vm"
        }).otherwise({
            redirectTo: "/panel"
        });
    }
    angular.module("main").config(routeConfiguration), routeConfiguration.$inject = [ "$routeProvider" ];
}(), function() {
    "use strict";
    function BoardController(TaskList, TaskArchive, $routeParams, $location) {
        var vm = this, boardId = $routeParams.id;
        boardId ? vm.taskList = TaskList.getList(boardId) : $location.path("/panel"), vm.moveTaskUpwards = function(task) {
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
    angular.module("BoardModule").controller("BoardController", BoardController), BoardController.$inject = [ "TaskList", "TaskArchive", "$routeParams", "$location" ];
}(), function() {
    function board() {
        return {
            restrict: "E",
            templateUrl: "templates/Board.template.html",
            controller: "BoardController",
            controllerAs: "vm"
        };
    }
    angular.module("BoardModule").directive("board", board);
}(), function() {
    "use strict";
    function TaskList($firebaseArray) {
        function getList(boardId) {
            return TaskList.list = $firebaseArray(firebase.database().ref().child("boards").child(boardId).child("tasks")), 
            TaskList.list;
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
    angular.module("BoardModule").factory("TaskList", TaskList), TaskList.$inject = [ "$firebaseArray" ];
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
    angular.module("BoardModule").directive("extDownArrow", extDownArrow);
}(), function() {
    function extUpArrow() {
        return function(scope, element, attributes) {
            element.bind("keyup", function(event) {
                event.preventDefault(), 38 === event.which && scope.$eval(attributes.extUpArrow);
            });
        };
    }
    angular.module("BoardModule").directive("extUpArrow", extUpArrow);
}(), function() {
    "use strict";
    function PanelController(Panel, $location) {
        var vm = this;
        vm.boards = Panel.getBoards(), vm.goToBoard = function(boardId) {
            $location.path("/board/" + boardId);
        };
    }
    angular.module("PanelModule").controller("PanelController", PanelController), PanelController.$inject = [ "Panel", "$location" ];
}(), function() {
    "use strict";
    function Panel($firebaseArray) {
        function getBoards() {
            return Boards.boards;
        }
        function saveBoard(board) {
            Boards.boards.$save(board);
        }
        function addBoard() {
            Boards.boards.$add({
                name: ""
            });
        }
        function removeBoard(board) {
            Boards.boards.$remove(board);
        }
        var boardsDatabaseReference = firebase.database().ref().child("boards"), Boards = {
            boards: $firebaseArray(boardsDatabaseReference),
            getBoards: getBoards,
            saveBoard: saveBoard,
            addBoard: addBoard,
            removeBoard: removeBoard
        };
        return Boards;
    }
    angular.module("PanelModule").factory("Panel", Panel), Panel.$inject = [ "$firebaseArray" ];
}(), function() {
    "use strict";
    function TaskArchive($firebaseArray) {
        function getTaskArchive() {
            return TaskArchive.archive;
        }
        function addTask(task) {
            TaskArchive.archive.$add(task);
        }
        function removeTask(task) {
            TaskArchive.archive.$remove(task);
        }
        var taskArchiveDatabaseReference = firebase.database().ref().child("archives"), TaskArchive = {
            archive: $firebaseArray(taskArchiveDatabaseReference),
            getTaskArchive: getTaskArchive,
            addTask: addTask,
            removeTask: removeTask
        };
        return TaskArchive;
    }
    angular.module("TaskArchiveModule").factory("TaskArchive", TaskArchive), TaskArchive.$inject = [ "$firebaseArray" ];
}();
//# sourceMappingURL=script.map.js