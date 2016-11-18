/**
 * TaskListDirective
 */
(function() {
  angular
    .module('TaskListModule')
    .directive('tasksList', tasksList);

  function tasksList() {
    return {
      restrict: 'E',
      templateUrl: 'app/tasks-list/TaskList.template.html',
      controller: 'TaskListController',
      controllerAs: 'vm'
    }
  }
})();