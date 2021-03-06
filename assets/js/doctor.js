/* doctor.js
 * The doctor app loads markdown files from the 'pages' directory and creates a
 * list route to see all available pages and a page route to display individual
 * pages. For more information on the different settings and options please read
 * the README.md file.
 */
;(function( window, document, undefined ) {
  'use strict';

    // Create a new angular.js module.
    angular.module( 'doctor', [ 'ngRoute' ] )

    // Setup configuration values that will be used by the doctor.
    .constant( 'title', 'MDDr' )
    .constant( 'description', 'The automatic markdown documentation parser' )
    .constant( 'theme', 'basic' )

    // Markdown directive. Parses markdown files and sets the elements HTML to
    // the parsed text.
    .directive( 'markdown', function( $http ) {
      var converter = new Showdown.converter();

      return {
        restrict: 'A',
        scope: { link: '@' },
        link: function( $scope, $element, $attr ) {
          $attr.$observe( 'link', function( link ) {
            if ( link !== '' ) {
              $http.get( 'pages/' + $attr.link ).success(function( markdown ) {
                var htmlText = converter.makeHtml( markdown );
                $element.html( htmlText );
              });

              $element.ready(function() {
                var codeElements = $element[ 0 ].querySelectorAll( 'code' );
                for ( var i = 0; i < codeElements.length; i++ ) {
                  Prism.highlightElement( codeElements[ i ] );
                }
              });
            }
          });
        }
      }
    })

    .factory( 'Pages', function( $http ) {
      return {
        pages: [],
        getPages: function( callback ) {
          $http.get( 'pages/contents.json' ).success( callback );
        },
        getPage: function( slug, callback ) {
          this.getPages(function( pages ) {
            pages.forEach(function( page ) {
              if ( page.slug === slug ) {
                callback( page );
              }
            });
          })
        }
      }
    })

    .controller( 'siteController', function( $scope, title, description, theme, Pages ) {
      $scope.title       = title;
      $scope.description = description;
      $scope.theme       = theme;

      Pages.getPages(function( pages ) {
        $scope.pages = pages;
      });
    })

    .controller( 'pageController', function( $scope, $routeParams, Pages ) {
      Pages.getPage( $routeParams.pageId, function( page ) {
        $scope.page = page;
      });
    })

    .config(function( $routeProvider, $locationProvider, theme ) {
      $routeProvider

        .when( '/:pageId', {
          templateUrl: 'themes/' + theme + '/page.html',
          controller: 'pageController'
        });

      $locationProvider.html5Mode( true );
    });

}( window, document ));
