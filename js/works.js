$(function(){var a=$(".works").isotope({itemSelector:".works--item",layoutMode:"fitRows",filter:".page1"});$("#js-row").click(function(){$(".mp-filter--icon").removeClass("mp-filter--icon__active"),$(this).addClass("mp-filter--icon__active"),$(".works--item").addClass("works-row"),a.isotope({layoutMode:"vertical"})}),$("#js-grid").click(function(){$(".mp-filter--icon").removeClass("mp-filter--icon__active"),$(this).addClass("mp-filter--icon__active"),$(".works--item").removeClass("works-row"),a.isotope({layoutMode:"fitRows"})}),$(".mp-filter--list").on("click","li",function(){var b=$(this).attr("data-filter");a.isotope({filter:b})}),$(".mp-filter--list").each(function(a,b){var c=$(b);c.on("click","li",function(){c.find(".is-active").removeClass("is-active"),$(this).addClass("is-active")})})});