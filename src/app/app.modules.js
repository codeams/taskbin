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
    .module('BoardModule', ['firebase', 'TaskArchiveModule']);
})();


/**
 * BoardsModule
 */
(function() {
  'use strict';

  angular
    .module('PanelModule', ['firebase']);
})();


/**
 * App MainModule
 */
(function() {
  angular
    .module('main', [
      'PanelModule',
      'BoardModule',
      'ngRoute',
      'ngAnimate'
    ]);
})();