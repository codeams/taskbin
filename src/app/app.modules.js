/**
 * TaskArchiveModule
 */
(function() {
  'use strict';

  angular
    .module('TaskArchiveModule', ['firebase']);
})();


/**
 * TasksListModule
 */
(function() {
  'use strict';

  angular
    .module('TaskListModule', ['firebase', 'TaskArchiveModule']);
})();


/**
 * App MainModule
 */
(function() {
  angular
    .module('main', [
      'TaskListModule',
      'ngRoute'
    ]);
})();