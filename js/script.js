// $(document).ready(function () {
//     $('.carousel-inner').slick({
//         speed: 1200,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg" class= "slick-prev__icon" alt="Previos"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg" class= "slick-prev__icon" alt="Next"></button>',
//         variableWidth: true,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     dots: false,
//                     arrows: false
//                 }
//             }
//         ]
//     });
// });
// /carousel=============================/

const slider = tns({
	container: '.carousel-inner',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	nav: false,
	mouseDrag: true,
	autoplay: true,
	autoplayButtonOutput: false,
	autoplayTimeout: 3500,
	speed: 1500,
	controls: false,
	responsive: {
		767: {
			nav: false,
			navPosition: "bootom",
		}
	}
});

document.querySelector('.btn-prev').addEventListener('click', function () {
	slider.goTo('prev');
});
document.querySelector('.btn-next').addEventListener('click', function () {
	slider.goTo('next');
});

// /slider================================/ https://github.com/ganlanyuan/tiny-slider

$(document).ready(function () {

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});
	// /tabs-switch query

	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};
	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');
	// /tab-info-switch query

	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('fast');
	});
	// open modal 
	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #order, #thanks').fadeOut('fast');
	});
	// close modal
	$('.catalog-item__btn').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('fast');
		})
	});
	// open modal замена текста описания в модальном окне на текст из карточки

	function valideForms(form) {
			$(form).validate({
		rules: {
			name: {
				required: true,
				minlength: 2,
				maxlength: 12
			},
			phone: {
				required: true
			}, 
			email: {
				required: true,
				email: true
			}
		},
		messages: {
			name: "Пожалуйста, введите свое имя, от 2 до 12 букв.",
			phone: "Пожалуйста, введите свой номер телефона +7... .",
			email: "Пожалуйста, введите корректный адрес электронной почты.",
			}
		});
	};
	valideForms('#backcall-form form');
	valideForms('#consultation form');
	valideForms('#order form');

// validateform https://jqueryvalidation.org/documentation/
	$('input[name=phone]').mask("+7 (999) 999-9999");
// validateform phonemask

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('fast');
			$('form').trigger('reset');
		});
		return false;
	});
// mailer script
	$(window).scroll(function() {
		if ($(this).scrollTop()> 1600) {
			$('.pageup').fadeIn('slow');
		}
		else {
			$('.pageup').fadeOut('slow');
		}
	});
	$("a[href^='#up']").click(function(){
                const _href = $(this).attr("href");
                $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
                return false;
	});
// smooth scroll and pageup

	new WOW().init();

});