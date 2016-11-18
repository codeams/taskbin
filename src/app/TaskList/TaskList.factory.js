/**
 * TaskList factory
 */
(function() {
  'use strict';

  angular
    .module('TaskListModule')
    .factory('TaskList', TaskList);

  TaskList.$inject = ['$firebaseArray'];

  function TaskList( $firebaseArray ) {

    //noinspection JSUnresolvedFunction
    var taskListDatabaseReference = firebase.database().ref().child('tasks');

    var TaskList = {
      list: $firebaseArray( taskListDatabaseReference ),
      getList: getList,
      saveTask: saveTask,
      addTask: addTask,
      removeTask: removeTask,
      moveTaskUpwards: moveTaskUpwards,
      moveTaskDownwards: moveTaskDownwards
    };

    return TaskList;

    ////////////////

    function getList() {
      return TaskList.list;
    }

    function saveTask( task ) {
      TaskList.list.$save( task );
    }

    function addTask() {
      TaskList.list.$add({
        text: '',
        done: false,
        position: ( TaskList.list.length + 1 )
      });
    }

    function removeTask( task ) {
      TaskList.list.forEach(function( iterationTask ) {
        if ( iterationTask.position > task.position )
          iterationTask.position--;
        TaskList.saveTask( iterationTask );
      });

      TaskList.list.$remove( task );
    }

    function moveTaskUpwards( task ) {
      for( var i = 0; i < TaskList.list.length; i++ ) {
        if ( TaskList.list[i].position === task.position - 1 ) {
          TaskList.list[i].position++;
          task.position--;

          TaskList.saveTask( task );
          TaskList.saveTask( TaskList.list[i] );

          break;
        }
      }
    }

    function moveTaskDownwards( task ) {
      for( var i = 0; i < TaskList.list.length; i++ ) {
        if ( TaskList.list[i].position === task.position + 1 ) {
          TaskList.list[i].position--;
          task.position++;

          TaskList.saveTask( task );
          TaskList.saveTask( TaskList.list[i] );

          break;
        }
      }
    }

  }
})();