(function($) {
	
	"use strict";
	
	
	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if($('.preloader').length){
			$('.preloader').delay(500).fadeOut(500);
		}
	}
	
	
	//Update Header Style + Scroll Top
	function headerStyle() {
		if($('.main-header').length){
			var windowpos = $(window).scrollTop()-100;
			if (windowpos >= 1) {
				$('.main-header').addClass('fixed-top-header');
				$('.scroll-to-top').fadeIn(300);
			} else {
				$('.main-header').removeClass('fixed-top-header');
				$('.scroll-to-top').fadeOut(300);
			}
		}
	}
	
	
	//Submenu Dropdown Toggle
	if($('.main-header li.dropdown .submenu').length){
		$('.main-header li.dropdown').append('<div class="dropdown-btn"></div>');
		
		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function() {
			$(this).prev('.submenu').slideToggle(500);
		});
		
		$('.main-menu .navbar-collapse > ul > li > a').on('click', function(e) {
			
			e.preventDefault()
			$(this).next('.submenu').slideToggle(500);
		});
	}
	
	
	//Main Slider
	if($('.main-slider').length){


		
	}
	
	
	//Schedule Box Tabs
	if($('.schedule-box').length){
		
		//Tabs
		$('.schedule-box .tab-btn').on('click', function() {
			var target = $($(this).attr('data-id'));
			$('.schedule-box .tab-btn').removeClass('active');
			$(this).addClass('active');
			$('.schedule-box .tab').fadeOut(0);
			$('.schedule-box .tab').removeClass('current');
			$(target).fadeIn(300);
			$(target).addClass('current');
			var windowWidth = $(window).width();
			if (windowWidth <= 700) {
				$('html, body').animate({
				   scrollTop: $('.tabs-box').offset().top
				 }, 1000);
			}
		});
		
		//Accordion
		$('.schedule-box .hour-box .toggle-btn').on('click', function() {
			var target = $($(this).next('.content-box'));
			$(this).toggleClass('active');
			$(target).slideToggle(300);
			$(target).parents('.hour-box').toggleClass('active-box');
		});
		
	}
	
	
	//Countdown Timer
	if($('#countdown-timer').length){                     
		$('#countdown-timer').countdown('2015/10/13', function(event) {
			var $this = $(this).html(event.strftime('' + '<div class="counter-column"><span class="count">%d</span><span class="colon">:</span><br>DAYS</div> ' + '<div class="counter-column"><span class="count">%H</span><span class="colon">:</span><br>HOURS</div>  ' + '<div class="counter-column"><span class="count">%M</span><span class="colon">:</span><br>MINUTES</div>  ' + '<div class="counter-column"><span class="count">%S</span><br>SECOND</div>'));
		});
	}
	
	
	//Sponsors Slider
	if ($('.sponsors .slider').length) {
		$('.sponsors .slider').owlCarousel({
			loop:true,
			margin:20,
			nav:true,
			autoplay: 5000,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:3
				},
				1024:{
					items:4
				},
				1100:{
					items:5
				}
			}
		});    		
	}
	
		//Sponsors Slider
	if ($('.team-section .slider').length) {
		$('.team-section .slider').owlCarousel({
			loop:true,
			margin:20,
			nav:true,
			autoplay: 5000,
			responsive:{
				0:{
					items:1
				},
				600:{
					items:2
				},
				800:{
					items:2
				},
				1024:{
					items:3
				},
				1100:{
					items:4
				}
			}
		});    		
	}
	
	
	//Testimonial Slider
	if($('.testimonials-area .slider').length){
		$('.testimonials-area .slider').bxSlider({
			adaptiveHeight: true,
			auto:true,
			controls: true,
			pause: 5000,
			speed: 500,
			mode:'fade',
			pager: false
		});
	}
	
	
	//Experience Meter
	if($('.our-experience .exp-meter').length){
		$(".exp-meter").each(function() {
			$(this).css('width',$(this).attr('data-value'));
		});
	}
	
	
	//LightBox / Fancybox
	if($('.lightbox-image').length) {
		$('.lightbox-image').fancybox();
	}
	
	
	// Fact Counter
	function factCounter() {
		$('.fact-counter.animated .counter-column').each(function() {
	
			var $t = $(this),
				n = $t.find(".count-text").attr("data-stop"),
				r = parseInt($t.find(".count-text").attr("data-speed"), 10);
				
			if (!$t.hasClass("counted")) {
				$t.addClass("counted");
				$({
					countNum: $t.find(".count-text").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".count-text").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".count-text").text(this.countNum);
					}
				});
			}
			
		});
	}
	
	
	//Contact Form Validation
	if($('#contact-form').length){
		$('#contact-form').validate({ // initialize the plugin
			rules: {
				username: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				subject: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}
	
	
	// Google Map Settings
	if($('#map-location').length){
		var map;
		 map = new GMaps({
			el: '#map-location',
			zoom: 12,
			scrollwheel:false,
			//Set Latitude and Longitude Here
			lat: -37.817085,
			lng: 144.955631
		  });
		  
		  //Add map Marker
		  map.addMarker({
			lat: -37.817085,
			lng: 144.955631,
			infoWindow: {
			  content: '<p><strong>Envato</strong><br>Melbourne VIC 3000, Australia</p>'
			}
		 
		});
	}
	
	
	// Scroll to top
	if($('.scroll-to-top').length){
		$(".scroll-to-top").on('click', function() {
		   // animate
		   $('html, body').animate({
			   scrollTop: $('html, body').offset().top
			 }, 1000);
	
		});
	}

	// gallery filter activation
    function GalleryFilter () {

    	if ($('#image-gallery-mix').length) {
    		$('.gallery-filter').find('li').each(function () {
    			$(this).addClass('filter');
    		});
    		$('#image-gallery-mix').mixItUp();
    	};
    	if($('.gallery-filter.masonary').length){
			$('.gallery-filter.masonary span').on('click', function(){
				var selector = $(this).parent().attr('data-filter');
				$('.gallery-filter.masonary span').parent().removeClass('active');
				$(this).parent().addClass('active');
				$('#image-gallery-isotope').isotope({ filter: selector });
				return false;
			});
    	}
    }
	function galleryLightBox () {
		if ($('#image-gallery-mix').length) {
			$('#image-gallery-mix').find('.fancybox').fancybox();
		};
	}
	// Elements Animation
	if($('.wow').length){
		var wow = new WOW(
		  {
			boxClass:     'wow',      // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset:       0,          // distance to the element when triggering the animation (default is 0)
			mobile:       true,       // trigger animations on mobile devices (default is true)
			live:         true       // act on asynchronously loaded content (default is true)
		  }
		);
		wow.init();
	}

/* ==========================================================================
   When document is ready, do
   ========================================================================== */
   
	$(document).on('ready', function() {
		headerStyle();
	//	factCounter();
	//	GalleryFilter();
	//	galleryLightBox();
	});

/* ==========================================================================
   When document is Scrollig, do
   ========================================================================== */
	
	$(window).on('scroll', function() {
		headerStyle();
	//	factCounter();
	});
	
/* ==========================================================================
   When document is loading, do
   ========================================================================== */
	
	$(window).on('load', function() {
		handlePreloader();
	});
	

})(window.jQuery);