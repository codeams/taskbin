/**
 * BoardsFactory
 */
(function() {
  'use strict';

  angular
    .module('PanelModule')
    .factory('Panel', Panel);

  Panel.$inject = [ '$firebaseArray' ];

  function Panel( $firebaseArray ) {

    //noinspection JSUnresolvedFunction
    var boardsDatabaseReference = firebase.database().ref().child('boards');

    var Boards = {
      boards: $firebaseArray( boardsDatabaseReference ),
      getBoards: getBoards,
      saveBoard: saveBoard,
      addBoard: addBoard,
      removeBoard: removeBoard
    };

    return Boards;

    ////////////////

    function getBoards() {
      return Boards.boards;
    }

    function saveBoard( board ) {
        Boards.boards.$save( board );
    }

    function addBoard() {
      Boards.boards.$add({
        name: ''
      })
    }

    function removeBoard( board ) {
      Boards.boards.$remove( board );
    }

  }
})();