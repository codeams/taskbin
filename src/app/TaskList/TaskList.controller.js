/**
 * TaskListController
 */
(function() {
  'use strict';

  angular
    .module('TaskListModule')
    .controller('TaskListController', TaskListController);

  TaskListController.$inject = ['TaskList', 'TaskArchive'];

  function TaskListController(TaskList, TaskArchive ) {

    var vm = this;

    vm.taskList = TaskList.getList();

    vm.moveTaskUpwards = function( task ) {
      TaskList.moveTaskUpwards( task );
    };

    vm.moveTaskDownwards = function ( task ) {
      TaskList.moveTaskDownwards( task );
    };

    vm.taskChange = function ( task ) {
      TaskList.saveTask( task );
    };

    vm.addTask = function() {
      TaskList.addTask();
    };

    vm.archiveTask = function( task ) {
      TaskArchive.addTask( task );
      TaskList.removeTask( task );
    };

  }
})();