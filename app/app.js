/* app.js
 * Copyright (c) 2014 Christopher L Bray <chris@brayniverse.com>
 * Open source under the MIT license.
 * https://raw.github.com/brayniverse/markdown-doctor/master/LICENSE
 */
;(function( window, document, undefined ) {
  'use strict';

  // Create new application module
  angular.module( 'app', [ 'ngRoute', 'app.services', 'app.directives', 'app.controllers' ])

  // Configure the application routes.
  .config([ '$routeProvider', '$locationProvider', 'config',
    function( $routeProvider, $locationProvider, config ) {

      $routeProvider

        .when( '/contents', {
          controller: 'listController',
          templateUrl: 'content/themes/default/index.html'
        })

        .when( '/pages/:pageId', {
          controller:  'pageController',
          templateUrl: 'content/themes/default/page.html'
        })

        .otherwise({
          redirectTo: '/contents'
        });

      $locationProvider.html5Mode( false );
    }
  ]);

}( window, document ));
