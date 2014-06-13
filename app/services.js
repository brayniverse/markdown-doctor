/* app.js
 * Copyright (c) 2014 Christopher L Bray <chris@brayniverse.com>
 * Open source under the MIT license.
 * https://raw.github.com/brayniverse/markdown-doctor/master/LICENSE
 */
;(function( window, document, undefined ) {
  'use strict';

  angular.module( 'app.services', [] )

    .constant( 'config', {
      title: 'DOCS',
      description: 'v0.1.0',
      theme: 'default'
    })

    .factory( 'Pages', [ '$http', 'config',
      function( $http, config ) {
        return {

          /* List of cached pages.
           * @type {array}
           */
          pages: [],

          /* Retrieve all the available pages.
           * @param   {function} function to call when list has loaded
           * @returns {array}
           */
          getPages: function( callback ) {
            if ( this.pages.length ) {
              callback( this.pages );
            } else {
              $http.get( 'content/pages/contents.json' ).success( callback );
            }
          },

          /* Retrieve a single page instance.
           * @param   {string}   the filename we are looking for
           * @param   {function} function to call when the file has loaded
           * @returns {void}
           */
          getPage: function( filename, callback ) {
            this.getPages(function( pages ) {
              pages.forEach(function( page ) {
                if ( filename === page.slug ) {
                  callback( page );
                }
              });
            });
          }

        };
      }
    ]);

}( window, document ));
