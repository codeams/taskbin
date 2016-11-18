/**
 * App routes configuration
 */
(function() {
  'use strict';

  angular
    .module('main')
    .config( routeConfiguration );

  routeConfiguration.$inject = ['$routeProvider'];

  function routeConfiguration( $routeProvider ) {
    $routeProvider
      .when('/task-list', {
        templateUrl: 'templates/TaskList.template.html',
        controller: 'TaskListController',
        controllerAs: 'vm'
      })
      .when('/login', {
        template: 'This is the login page (:'
      })
      .otherwise({
        redirectTo: '/task-list'
      });
  }
})();