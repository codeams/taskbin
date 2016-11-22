/**
 * App shared attribute directives
 */


/**
 * extKeycode directive
 */
(function() {
  'use strict';

  angular
    .module('main')
    .directive('extKeycode', extKeycode);

  function extKeycode() {
    return function( $scope, $element, $attributes ) {
      $element.bind('keyup', function( event ) {
        var keyCode = event.which || event.keyCode;
        if ( keyCode === $attributes.code ) {
          $scope.$eval( $attributes.extKeycode );
        }
      });
    }
  }
})();


/**
 * extDownArrow Directive
 */
(function() {
  'use strict';

  angular
    .module('BoardModule')
    .directive('extDownArrow', extDownArrow);

  function extDownArrow() {

    return function( scope, element, attributes ) {
      element.bind('keyup', function( event ) {
        event.preventDefault();
        if ( event.which === 40 ) {
          scope.$eval( attributes.extDownArrow );
        }
      });
    }

  }
})();


/**
 * extUpArrow directive
 */
(function() {
  angular
    .module('BoardModule')
    .directive('extUpArrow', extUpArrow);

  function extUpArrow() {
    return function( scope, element, attributes ) {
      element.bind('keyup', function( event ) {
        event.preventDefault();
        if ( event.which === 38 ) {
          scope.$eval( attributes.extUpArrow );
        }
      });
    }
  }
})();