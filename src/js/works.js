$( function() {

  var $grid = $('.works').isotope({
    itemSelector: '.works--item',
    layoutMode: 'fitRows',
    filter: '.page1'
  });

  $('#js-row').click( function() {
    $('.mp-filter--icon').removeClass('mp-filter--icon__active');
    $(this).addClass('mp-filter--icon__active');
    $('.works--item').addClass('works-row');
    $grid.isotope({layoutMode: 'vertical'});
  });

  $('#js-grid').click( function() {
    $('.mp-filter--icon').removeClass('mp-filter--icon__active');
    $(this).addClass('mp-filter--icon__active');
    $('.works--item').removeClass('works-row');
    $grid.isotope({layoutMode: 'fitRows'});
  });

  $('.mp-filter--list').on( 'click', 'li', function() {
    var filterValue = $( this ).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

  $('.mp-filter--list').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'li', function() {
      $buttonGroup.find('.is-active').removeClass('is-active');
      $( this ).addClass('is-active');
    });
  });
});