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
      .when('/login', {
        template: 'This is the login page (:'
      })
      .when('/panel', {
        templateUrl: 'templates/Panel.template.html',
        controller: 'PanelController',
        controllerAs: 'vm'
      })
      .when('/board', {
        templateUrl: 'templates/Board.template.html',
        controller: 'BoardController',
        controllerAs: 'vm'
      })
      .when('/board/:id', {
        templateUrl: 'templates/Board.template.html',
        controller: 'BoardController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/panel'
      });
  }
})();