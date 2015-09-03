var utils = window.fizzyUIUtils;

docReady( function() {
  var gallery = document.querySelector('.reviews-slider');
  var flkty = new Flickity( gallery, {
    prevNextButtons: false,
    pageDots: false,
    initialIndex: 1
  });
  // elements
  var cellsButtonGroup = document.querySelector('.persons');
  var cellsButtons = utils.makeArray( cellsButtonGroup.children );

  // update buttons on select
  flkty.on( 'cellSelect', function() {
    var previousSelectedButton = cellsButtonGroup.querySelector('.person__current');
    var selectedButton = cellsButtonGroup.children[ flkty.selectedIndex ];
    classie.remove( previousSelectedButton, 'person__current' );
    classie.add( selectedButton, 'person__current' );
  });

  // cell select
  eventie.bind( cellsButtonGroup, 'click', function( event ) {
    if ( !matchesSelector( event.target, '.person' ) ) {
      return;
    }
    var index = utils.indexOf( cellsButtons, event.target );
    flkty.select( index );
  });
});