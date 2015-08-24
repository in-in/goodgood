'use strict';

var utils = window.fizzyUIUtils;

docReady( function() {
  var gallery = document.querySelector('.works');
  var flkty = new Flickity( gallery, {
    prevNextButtons: false,
    pageDots: false,
    cellAlign: 'left',
    draggable: false,
    selectedAttraction: 1,
    friction: 1
  });
  // elements
  var cellsButtonGroup = document.querySelector('.pager--btn-group');
  var cellsButtons = utils.makeArray( cellsButtonGroup.children );

  // update buttons on select
  flkty.on( 'cellSelect', function() {
    var previousSelectedButton = cellsButtonGroup.querySelector('.is-selected');
    var selectedButton = cellsButtonGroup.children[ flkty.selectedIndex ];
    classie.remove( previousSelectedButton, 'is-selected' );
    classie.add( selectedButton, 'is-selected' );
  });

  // cell select
  eventie.bind( cellsButtonGroup, 'click', function( event ) {
    if ( !matchesSelector( event.target, '.pager--btn' ) ) {
      return;
    }
    var index = utils.indexOf( cellsButtons, event.target );
    flkty.select( index );
  });
  // previous
  var previousButton = document.querySelector('.pager--btn-previous');
  eventie.bind( previousButton, 'click', function() {
    flkty.previous();
  });
  // next
  var nextButton = document.querySelector('.pager--btn-next');
  eventie.bind( nextButton, 'click', function() {
    flkty.next();
  });

});
