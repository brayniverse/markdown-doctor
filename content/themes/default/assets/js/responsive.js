;(function( window, document, undefined ) {
  'use strict';

  window.onload = function() {
    var masthead = document.getElementById( 'site-masthead' );

    window.addEventListener( 'scroll', function() {
      var scrollTop = window.pageYOffset;

      console.log( masthead.offsetHeight );
    });
  };

}( window, document ));
