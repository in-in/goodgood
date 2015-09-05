$( function() {

  var $grid = $('.works').isotope({
    itemSelector: '.works--item',
    layoutMode: 'fitRows',
    filter: '.page1'
  });

  $('#js-row').click( function() {
    $('.mp-filter--icon').removeClass('mp-filter--icon__active');
    $(this).addClass('mp-filter--icon__active');
    $('.works--item').addClass('works--item__row');
    $grid.isotope({layoutMode: 'vertical'});
  });

  $('#js-grid').click( function() {
    $('.mp-filter--icon').removeClass('mp-filter--icon__active');
    $(this).addClass('mp-filter--icon__active');
    $('.works--item').removeClass('works--item__row');
    $grid.isotope({layoutMode: 'fitRows'});
  });

  $('.js-filter-btn').on( 'click', 'li', function() {
    var filterValue = $( this ).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });

  $('.js-filter-btn').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'li', function() {
      $buttonGroup.find('.is-active').removeClass('is-active');
      $( this ).addClass('is-active');
    });
  });

  // bind filter on select change
  $('#js-filter-select').on( 'change', function() {
    var filterValue = this.value;
    $grid.isotope({ filter: filterValue });
  });

});