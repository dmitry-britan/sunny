'use strict';

$(function() {
	var $window = $(window);

	/* Get Device Width */
	function getWidth() {
		if (self.innerWidth) {
			return self.innerWidth;
		}

		if (document.documentElement && document.documentElement.clientWidth) {
			return document.documentElement.clientWidth;
		}

		if (document.body) {
			return document.body.clientWidth;
		}
	}

	//
	// Mobile Menu
	//---------------------------------------------------------------------------------------
	function toggleMenuVisibility() {
		$('.mobile-nav').toggleClass('is--visible');
	}

	function toggleBodyBackground() {
		$('body').toggleClass('is--mobile-active');
	}

	function toggleMenuTriggerClass() {
		$('.js-nav-toggle').toggleClass('is--active');
	}

	function closeMobileMenu() {
		$('body').removeClass('is--mobile-active');
		$('.js-nav-toggle').removeClass('is--active');
	}

	function closeMobileMenuOnOutOfClick() {
		$('body').mouseup(function(e) {
			var subject = $('.is--visible');

			if (subject.length && !$(e.target).hasClass('js-nav-toggle') && !$(e.target).hasClass('icon-nav') && e.target.className != subject.attr('class') && !subject.has(e.target).length) {
				toggleMenuVisibility();
				toggleBodyBackground();
				toggleMenuTriggerClass();
			}
		});
	}

	(function() {
		closeMobileMenuOnOutOfClick();
		$('.js-nav-toggle').on('click', function() {
			toggleMenuVisibility();
			toggleMenuTriggerClass();
			toggleBodyBackground();
		});
	})();

	//
	// Modal Popup
	//---------------------------------------------------------------------------------------
	(function() {
		$.arcticmodal('setDefault', {
			afterClose: function afterClose() {
				$('body').css({
					'overflow': 'auto',
					'margin-right': '0px'
				});
			}
		});
		$('[data-modal]').on('click', function(e) {
			e.preventDefault();
			var link = $(this).data('modal');
			if (link) {
				$('#' + link).arcticmodal();
			}
		});
	})();

	//
	// Tabs
	//---------------------------------------------------------------------------------------
	(function() {
		if ($('.tabs__list').length) {
			var $tabs = $('.tabs__list a');
			var $panes = $('.tabs__content');

			$tabs.on('click', function(e) {
				e.preventDefault();

				var id = $(this).attr('href');

				$tabs.each(function() {
					$(this).parent().removeClass('is--active');
				});
				$(this).parent().addClass('is--active');

				$panes.removeClass('is--active');
				$(id).addClass('is--active');
			});
		}
	})();

	//
	// Promo Slider
	//---------------------------------------------------------------------------------------
	(function() {

		$('.js-promo-slider').bxSlider({
			auto: true,
			pager: true,
			controls: true,
			nextSelector: '.promo__next',
			prevSelector: '.promo__prev',
			nextText: '',
			prevText: '',
			pagerCustom: '.promo__pagination'
		});
	})();

	//
	// Propose Slider
	//---------------------------------------------------------------------------------------
	(function() {

		$('.js-propose-slider').bxSlider({
			moveSlides: 1,
			pager: false,
			controls: true,
			slideWidth: 265,
			slideMargin: 30,
			maxSlides: 5,
			minSlides: 1,
			nextSelector: '.propose__next',
			prevSelector: '.propose__prev',
			nextText: '',
			prevText: ''
		});
	})();

	//
	// Testimonials Slider
	//---------------------------------------------------------------------------------------
	(function() {

		$('.js-testimonials-slider').bxSlider({
			moveSlides: 1,
			pager: true,
			pagerCustom: '.testimonial__pagination',
			controls: true,
			nextSelector: '.testimonial__next',
			prevSelector: '.testimonial__prev',
			nextText: '',
			prevText: ''
		});
	})();

	//
	// Partners Slider
	//---------------------------------------------------------------------------------------
	(function() {

		$('.js-partners-slider').bxSlider({
			pager: false,
			controls: false,
			slideWidth: 225,
			slideMargin: 65,
			maxSlides: 3,
			minSlides: 1,
			mouseDrag: true
		});
	})();

	//
	// Apartments Slider
	//---------------------------------------------------------------------------------------
	(function() {

		$('.js-apartments-slider').bxSlider({
			//auto: true,
			pager: true,
			slideWidth: 974,
			slideMargin: 30,
			maxSlides: 1,
			minSlides: 1,
			pagerCustom: '.apartments__pagination',
			controls: true,
			nextSelector: '.apartments__next',
			prevSelector: '.apartments__prev',
			nextText: '',
			prevText: ''
		});
	})();

	//
	// Apartment Photo Slider
	//---------------------------------------------------------------------------------------
	(function() {
		var qty = $('.apartments-page__pagination li').length;
		if (qty) {
			for (var i = 0; i < qty; i++) {
				$('.js-apartment-photo-slider--' + i).bxSlider({
					mode: 'fade',
					pager: true,
					maxSlides: 1,
					minSlides: 1,
					pagerCustom: '.js-apartments-page-slider__thumbs--' + i,
					controls: true,
					nextSelector: '.js-apartments-page-slider__next--' + i,
					prevSelector: '.js-apartments-page-slider__prev--' + i,
					nextText: '',
					prevText: ''
				});
			}
		}
	})();

	//
	// Apartments Page Slider
	//---------------------------------------------------------------------------------------
	(function() {

		$('.js-apartments-page-slider').bxSlider({
			pager: true,
			slideMargin: 0,
			maxSlides: 1,
			minSlides: 1,
			mode: 'fade',
			pagerCustom: '.apartments-page__pagination',
			controls: false,
			touchEnabled: false,
			onSliderLoad: function onSliderLoad() {
				setTimeout(function() {
					var pages = ['/room/nomer-kategorii-klassik/', '/room/nomer-kategorii-standart-tvin/', '/apartment.html', '/room/nomer-kategorii-superior/', '/room/nomer-kategorii-polulyuks-semejnyj/', '/room/nomer-kategorii-polulyuks/', '/room/nomer-kategorii-lyuks-semejnyj/', '/room/nomer-kategorii-lyuks/'];
					var index = pages.indexOf(window.location.pathname);
					$('.apartments-page__pagination a[data-slide-index=' + index + ']').trigger('click');
					$('.slider--apartments-page').css({
						'visibility': 'visible'
					});
				});
			}
		});
	})();

	//
	// Если на странице есть поле для выбора даты
	//---------------------------------------------------------------------------------------
	(function() {
		var $departure_date = $('.js-date-departure');
		var date = $departure_date.attr('data-date');
		if ($departure_date.length) {
			if ($departure_date.attr('data-lang') == 'ru') {
				var ds = {
					field: $departure_date[0],
					firstDay: 1,
					format: 'DD-MMM-YYYY',
					setDefaultDate: true,
					i18n: {
						previousMonth: 'Предыдущий месяц',
						nextMonth: 'Следующий месяц',
						months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
						weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
						weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
					},
					onSelect: function onSelect(date) {
						var selectedDay = this.getMoment().format('DD-MMM-YYYY').split('-');
						$('input[name="departure"]').val(this.getMoment().format('DD-MMM-YYYY'));
						$('.js-date-departure .booking__mm-yyyy').text(selectedDay[1] + ', ' + selectedDay[2]);
						$('.js-date-departure .booking__dd').text(selectedDay[0]);
					}
				};
			} else {
				var ds = {
					field: $departure_date[0],
					firstDay: 1,
					format: 'DD-MMM-YYYY',
					setDefaultDate: true
				};
			}
			var departure = new Pikaday(ds);
		}

		var $arrival_date = $('.js-date-arrival');
		var date = $arrival_date.attr('data-date');
		if ($arrival_date.length) {
			if ($arrival_date.attr('data-lang') == 'ru') {
				var as = {
					field: $arrival_date[0],
					firstDay: 1,
					format: 'DD-MMM-YYYY',
					setDefaultDate: true,
					i18n: {
						previousMonth: 'Предыдущий месяц',
						nextMonth: 'Следующий месяц',
						months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
						weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
						weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
					},
					onSelect: function onSelect(date) {
						var selectedDay = this.getMoment().format('DD-MMM-YYYY').split('-');
						$('input[name="arrival"]').val(this.getMoment().format('DD-MMM-YYYY'));
						$('.js-date-arrival .booking__mm-yyyy').text(selectedDay[1] + ', ' + selectedDay[2]);
						$('.js-date-arrival .booking__dd').text(selectedDay[0]);
					}
				};
			} else {
				var as = {
					field: $arrival_date[0],
					firstDay: 1,
					format: 'DD-MMM-YYYY',
					setDefaultDate: true
				};
			}
			var arrival = new Pikaday(as);
		}
	})();

	//
	// Если на странице есть форма бронирования
	//---------------------------------------------------------------------------------------
	(function() {
		if ($('.js-booking-form').length) {

			var $departure_date = $('.js-booking-departure');
			var date = $departure_date.attr('data-date');
			if ($departure_date.length) {
				if ($departure_date.attr('data-lang') == 'ru') {
					var ds = {
						field: $departure_date[0],
						firstDay: 1,
						format: 'DD-MMM-YYYY',
						setDefaultDate: true,
						i18n: {
							previousMonth: 'Предыдущий месяц',
							nextMonth: 'Следующий месяц',
							months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
							weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
							weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
						}
					};
				} else {
					var ds = {
						field: $departure_date[0],
						firstDay: 1,
						format: 'DD-MMM-YYYY',
						setDefaultDate: true
					};
				}
				var departure = new Pikaday(ds);
			}

			var $arrival_date = $('.js-booking-arrival');
			var date = $arrival_date.attr('data-date');
			if ($arrival_date.length) {
				if ($arrival_date.attr('data-lang') == 'ru') {
					var as = {
						field: $arrival_date[0],
						firstDay: 1,
						format: 'DD-MMM-YYYY',
						setDefaultDate: true,
						i18n: {
							previousMonth: 'Предыдущий месяц',
							nextMonth: 'Следующий месяц',
							months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
							weekdays: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
							weekdaysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
						}
					};
				} else {
					var as = {
						field: $arrival_date[0],
						firstDay: 1,
						format: 'DD-MMM-YYYY',
						setDefaultDate: true
					};
				}
				var arrival = new Pikaday(as);
			}

			$('.js-child').hide();
			$('.js-children').hide();
			$('.js-booking-child').bind('change', function() {
				var val = $('option:selected', this).text();
				val > 0 ? $('.js-children').show() : $('.js-children').hide();
				$('.js-child').hide();
				for (var i = 0; i < val; i++) {
					$('.js-child').eq(i).show();
				}
			});
			$('.js-booking-form input, .js-booking-form textarea').bind('keyup change', function() {
				var val = $(this).val();
				var className = $(this).attr('name');
				console.log(val);
				console.log(className);
				$('.js-entered-' + className).text(val);
			});

			$('.js-booking-form select').bind('keyup change', function() {
				var val = $('option:selected', this).text();
				var className = $(this).attr('name');
				console.log(val);
				$('.js-entered-' + className).text(val);
			});
		}
	})();

	//
	// Валидация формы для отправки комментариев
	//---------------------------------------------------------------------------------------
	(function() {
		var settings = {
			rules: {
				name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				comment: {
					required: false
				}
			},
			messages: {
				name: {
					required: "Введите Ваше имя"
				},
				email: {
					email: "Введите корректный e-mail адрес",
					required: "Введите Ваш e-mail"
				}
			},
			submitHandler: function submitHandler(form) {
				//////////////////////
				// AJAX CODE GOES HERE
				//////////////////////
				form.reset();
			},
			focusCleanup: true,
			focusInvalid: false
		};

		// Форма для отправки комментариев
		var commentsForm = $('.js-comments-form').validate(settings);
	})();

	//
	// Валидация формы бронирования
	//---------------------------------------------------------------------------------------
	(function() {
		var settings = {
			rules: {
				departure: {
					required: true
				},
				arrival: {
					required: true
				},
				name: {
					required: true
				},
				surname: {
					required: true
				},
				phone: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				adult: {
					required: true
				},
				child: {
					required: true
				},
				type: {
					required: true
				},
				packet: {
					required: true
				},
				comment: {
					required: false
				}
			},
			messages: {
				departure: {
					required: "Выберите дату заезда"
				},
				arrival: {
					required: "Выберите дату выезда"
				},
				name: {
					required: "Введите Ваше имя"
				},
				surname: {
					required: "Введите Вашу фамилию"
				},
				phone: {
					required: "Введите Ваш номер телефона"
				},
				email: {
					email: "Введите корректный e-mail адрес",
					required: "Введите Ваш e-mail"
				},
				adult: {
					required: "Выберите кол-во взрослых"
				},
				child: {
					required: "Выберите кол-во детей"
				},
				type: {
					required: "Выберите категорию номера"
				},
				packet: {
					required: "Выберите спец. предложение"
				},
				comment: {
					required: "Введите комментарий"
				}
			},
			submitHandler: function submitHandler(form) {
				//////////////////////
				// AJAX CODE GOES HERE
				//////////////////////
				form.reset();
			},
			focusCleanup: true,
			focusInvalid: false
		};

		// Форма для отправки брони
		var bookingForm = $('.js-booking-form').validate(settings);
	})();

	//
	// Модалка поиска
	//---------------------------------------------------------------------------------------
	(function() {
		$('a[href="#search"]').on("click", function(event) {
			event.preventDefault();
			$(".search-modal").addClass("open");
			$('.search-modal > form > input[type="search"]').focus();
		});

		$(".search-modal").on("click keyup", function(event) {
			if (event.target == this || event.target.className == "close" || event.keyCode == 27) {
				$(this).removeClass("open");
			}
		});
	})();

	$.fn.equilHeight = function() {
		var maxHeight = 0;
		var $el = $(this);

		function setEquilHeight($el) {
			for (var i = 0; i < $el.length; i++) {
				var height = $el.eq(i).height();
				maxHeight = height > maxHeight ? height : maxHeight;
				console.log(maxHeight);
			}

			$el.height(maxHeight);
		}
		setEquilHeight($el);
		$(window).on('resize', function() {
			$el.removeAttr('style');
			if ($(window).width() > 992) {
				setEquilHeight($el);
			}
		});
	};

	//
	// Подключаем fancybox для фоток сертификатов
	//---------------------------------------------------------------------------------------
	(function() {
		var $gallery = $('[rel="gallery"]');
		if ($gallery.length) {
			$gallery.fancybox({
				openEffect: 'elastic',
				closeEffect: 'elastic',
				helpers: {
					title: {
						type: 'inside'
					}
				}
			});
		}
	})();
});
