/**
 * TaskListDirective
 */
(function() {
  angular
    .module('BoardModule')
    .directive('board', board);

  function board() {
    return {
      restrict: 'E',
      templateUrl: 'templates/Board.template.html',
      controller: 'BoardController',
      controllerAs: 'vm'
    }
  }
})();