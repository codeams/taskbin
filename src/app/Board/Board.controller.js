/**
 * BoardController
 */
(function() {
  'use strict';

  angular
    .module('BoardModule')
    .controller('BoardController', BoardController);

  BoardController.$inject = ['TaskList', 'TaskArchive', '$routeParams', '$location'];

  function BoardController( TaskList, TaskArchive, $routeParams, $location ) {

    var vm = this;

    var boardId = $routeParams.id;

    if ( boardId )
      vm.taskList = TaskList.getList( boardId );
    else
      $location.path('/panel');

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