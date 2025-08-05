// Mobile Menu Enhanced Functionality
// This file provides enhanced mobile navigation functionality with submenu support

$(document).ready(function() {
	// Wait for page to fully load
	setTimeout(function() {
		// Remove any existing handlers
		$('#mobile-menu-open').off('click');
		
		// Add mobile menu click handler
		$('#mobile-menu-open').on('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			
			var $menu = $('.canvas-menu-wrapper');
			
			if ($menu.hasClass('open')) {
				// Close menu
				$menu.removeClass('open');
				$('body').removeClass('page-popup-open');
				$('html').removeClass('no-scroll');
				$(this).removeClass('active');
			} else {
				// Open menu
				$menu.addClass('open');
				$('body').addClass('page-popup-open');
				$('html').addClass('no-scroll');
				$(this).addClass('active');
			}
		});
		
		// Close menu when clicking close button
		$(document).on('click', '#page-close-main-menu', function(e) {
			e.preventDefault();
			$('.canvas-menu-wrapper').removeClass('open');
			$('body').removeClass('page-popup-open');
			$('html').removeClass('no-scroll');
			$('#mobile-menu-open').removeClass('active');
		});
		
		// Handle submenu toggles in mobile
		$(document).on('click', '.astriol-main-menu .has-submenu > a', function(e) {
			// Only prevent default and handle submenu if we're in mobile view
			if ($(window).width() <= 991) {
				e.preventDefault();
				e.stopPropagation();
				
				var $parent = $(this).parent();
				var $submenu = $parent.find('.sub-menu').first();
				
				if ($submenu.length > 0) {
					if ($submenu.is(':visible')) {
						// Close submenu
						$submenu.slideUp(300);
						$parent.removeClass('active');
					} else {
						// Close other submenus
						$('.astriol-main-menu .has-submenu').not($parent).removeClass('active');
						$('.astriol-main-menu .sub-menu').not($submenu).slideUp(300);
						
						// Open this submenu
						$submenu.slideDown(300);
						$parent.addClass('active');
					}
				}
			}
		});
		
		// Handle direct navigation clicks (non-submenu items)
		$(document).on('click', '.astriol-main-menu a:not(.has-submenu > a)', function(e) {
			// Allow normal navigation for non-submenu items
			var href = $(this).attr('href');
			if (href && href !== '#' && href !== '') {
				// Close menu first, then navigate
				$('.canvas-menu-wrapper').removeClass('open');
				$('body').removeClass('page-popup-open');
				$('html').removeClass('no-scroll');
				$('#mobile-menu-open').removeClass('active');
				
				// Allow normal navigation
				return true;
			}
		});
		
		// Handle submenu item clicks
		$(document).on('click', '.astriol-main-menu .sub-menu a', function(e) {
			// Allow normal navigation for submenu items
			var href = $(this).attr('href');
			if (href && href !== '#' && href !== '') {
				// Close menu first, then navigate
				$('.canvas-menu-wrapper').removeClass('open');
				$('body').removeClass('page-popup-open');
				$('html').removeClass('no-scroll');
				$('#mobile-menu-open').removeClass('active');
				
				// Allow normal navigation
				return true;
			}
		});
		
		// Close menu when clicking outside
		$(document).on('click', function(e) {
			if (!$(e.target).closest('.canvas-menu-wrapper, #mobile-menu-open').length) {
				if ($('.canvas-menu-wrapper').hasClass('open')) {
					$('.canvas-menu-wrapper').removeClass('open');
					$('body').removeClass('page-popup-open');
					$('html').removeClass('no-scroll');
					$('#mobile-menu-open').removeClass('active');
				}
			}
		});
		
		// Reset menu state on window resize
		$(window).on('resize', function() {
			if ($(window).width() > 991) {
				$('.canvas-menu-wrapper').removeClass('open');
				$('body').removeClass('page-popup-open');
				$('html').removeClass('no-scroll');
				$('#mobile-menu-open').removeClass('active');
				$('.astriol-main-menu .sub-menu').hide();
				$('.astriol-main-menu .has-submenu').removeClass('active');
			}
		});
		
	}, 500);
});

// RTL Toggle functionality for both desktop and mobile
document.addEventListener('DOMContentLoaded', function() {
	const rtlToggle = document.getElementById('rtl-toggle');
	const rtlToggleMobile = document.getElementById('rtl-toggle-mobile');
	
	function toggleRTL() {
		const html = document.documentElement;
		if (html.getAttribute('dir') === 'rtl') {
			html.setAttribute('dir', 'ltr');
			if (rtlToggle) rtlToggle.textContent = 'RTL';
			if (rtlToggleMobile) rtlToggleMobile.textContent = 'RTL';
			localStorage.setItem('astriol-rtl', 'ltr');
		} else {
			html.setAttribute('dir', 'rtl');
			if (rtlToggle) rtlToggle.textContent = 'LTR';
			if (rtlToggleMobile) rtlToggleMobile.textContent = 'LTR';
			localStorage.setItem('astriol-rtl', 'rtl');
		}
	}
	
	if (rtlToggle) {
		rtlToggle.addEventListener('click', toggleRTL);
	}
	
	if (rtlToggleMobile) {
		rtlToggleMobile.addEventListener('click', toggleRTL);
	}
	
	// On load, set dir from localStorage
	const savedDir = localStorage.getItem('astriol-rtl');
	if (savedDir === 'rtl') {
		setTimeout(() => {
			document.documentElement.setAttribute('dir', 'rtl');
			if (rtlToggle) rtlToggle.textContent = 'LTR';
			if (rtlToggleMobile) rtlToggleMobile.textContent = 'LTR';
		}, 0);
	}
});
