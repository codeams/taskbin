/**
 * BoardsController
 */
(function() {
  'use strict';

  angular
    .module('PanelModule')
    .controller('PanelController', PanelController);

  PanelController.$inject = [ 'Panel', '$location' ];

  function PanelController( Panel, $location ) {

    var vm = this;

    vm.boards = Panel.getBoards();

    vm.goToBoard = function( boardId ) {
      $location.path( '/board/' + boardId );
    }

  }
})();