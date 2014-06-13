/* app.js
 * Copyright (c) 2014 Christopher L Bray <chris@brayniverse.com>
 * Open source under the MIT license.
 * https://raw.github.com/brayniverse/markdown-doctor/master/LICENSE
 */
;(function( window, document, undefined ) {
  'use strict';

  angular.module( 'app.controllers', [] )

    /* Base controller to inject variables into the template.
     */
    .controller( 'appController', [ '$scope', '$route', 'Pages', 'config',
      function( $scope, $routeParams, Pages, config ) {
        $scope.config = config;

        Pages.getPages(function( pages ) {
          $scope.pages = pages;
        })
      }
    ])

    /* Display all the available document pages. Kind of like a table of
     * contents page.
     */
    .controller( 'listController', [ '$scope', 'Pages',
      function( $scope, Pages ) {
        Pages.getPages(function( pages ) {
          $scope.pages = pages;
        });
      }
    ])

    /* Displays a single page of documentation.
     */
    .controller( 'pageController', [ '$scope', '$routeParams', 'Pages',
      function( $scope, $routeParams, Pages ) {
        Pages.getPage( $routeParams.pageId, function( page ) {
          $scope.page = page;
        });
      }
    ]);

}( window, document ));
