/* app.js
 * Copyright (c) 2014 Christopher L Bray <chris@brayniverse.com>
 * Open source under the MIT license.
 * https://raw.github.com/brayniverse/markdown-doctor/master/LICENSE
 */
;(function( window, document, undefined ) {
  'use strict';

  angular.module( 'app.directives', [] )

    .directive( 'markdown', [ '$http',
      function( $http ) {
        var converter = new Showdown.converter();

        return {
          restrict: 'A',
          scope: '@',
          link: function( $scope, $element, $attr ) {
            $attr.$observe( 'link', function( link ) {
              if ( link !== '' ) {
                $http.get( 'content/pages/' + link )
                  .success(function( markdown ) {
                    $element.html( converter.makeHtml( markdown ) );
                  });
              }
            })
          }
        };
      }
    ]);
}( window, document ));
