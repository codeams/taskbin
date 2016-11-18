/**
 * TaskArchiveFactory
 */
(function() {
  'use strict';

  angular
    .module('TaskArchiveModule')
    .factory('TaskArchive', TaskArchive);

  TaskArchive.$inject = ['$firebaseArray'];

  function TaskArchive( $firebaseArray ) {

    //noinspection JSUnresolvedFunction
    var taskArchiveDatabaseReference = firebase.database().ref().child('archives');

    var TaskArchive = {
      taskArchive: $firebaseArray( taskArchiveDatabaseReference ),
      getTaskArchive: getTaskArchive,
      addTask: addTask,
      removeTask: removeTask
    };

    return TaskArchive;

    ////////////////

    function getTaskArchive() {
      return TaskArchive.taskArchive;
    }

    function addTask( task ) {
      TaskArchive.taskArchive.$add( task );
    }

    function removeTask( task ) {
      TaskArchive.taskArchive.$remove( task );
    }

  }
})();