var elem = document.querySelector('.slider');
var flkty = new Flickity( elem, {
  cellAlign: 'center',
  contain: true,
  prevNextButtons: false,
  lazyLoad: true,
  initialIndex: 3
});

var element = document.querySelector('.reviews-slider');
var flkty = new Flickity( element, {
  cellAlign: 'center',
  prevNextButtons: false,
});