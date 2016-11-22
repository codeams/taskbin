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
      archive: $firebaseArray( taskArchiveDatabaseReference ),
      getTaskArchive: getTaskArchive,
      addTask: addTask,
      removeTask: removeTask
    };

    return TaskArchive;

    ////////////////

    function getTaskArchive() {
      return TaskArchive.archive;
    }

    function addTask( task ) {
      TaskArchive.archive.$add( task );
    }

    function removeTask( task ) {
      TaskArchive.archive.$remove( task );
    }

  }
})();