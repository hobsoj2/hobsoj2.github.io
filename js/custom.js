$(function(){

	var $window = $(window),
		$windowHeight = $window.height(),
		pageWrapper = $('#wrapper'),
		pageHeaderInner = $('#page-header-inner'),
		logo = $('#logo'),
		mainNav = $('#main-nav'),
		portfolioItem = $('.pf-item'),
		mainNavHidden = true,
		sliderBodyHeight = false;

	// Main Navigation Responsive
	// =========================================
	var navigaiontIsNotCopied = true;

	function nowCopyNavigation(){
		if (mainNav.is(':hidden') && navigaiontIsNotCopied){

			mainNav.clone().removeClass('main-nav').addClass('main-nav-responsive').insertAfter(mainNav);
			navigaiontIsNotCopied = false;

			var mainNavResponsive = $('.main-nav-responsive'),
				toggleMenu = $('<span/>',{class:'toggle-menu'}),
				mainNavResponsiveLinks = mainNavResponsive.find('a');

			toggleMenu.insertAfter(logo);

			for (var i=0, len = mainNavResponsiveLinks.length; i<len; i++){
				var $this = $(mainNavResponsiveLinks[i]),
					$thisChild = $this.next().length;

				if ($thisChild == 1){
					$('<span>',{text:'+', class:'plus-res'}).insertAfter($this);
				}
			}

			var plusSign = $('.plus-res');

			plusSign.on('click', function(){
				var $this = $(this),
					$thisTxt = $this.text(),
					$thisSibling = $this.next('ul'),
					$thisParentSibling = $this.parent('li').siblings('li');

				$thisTxt == ('+') ? $this.text('-') : $this.text('+'); // jshint ignore:line

				$thisSibling.slideToggle(250);

				$thisParentSibling.find('ul').slideUp(250);
				$thisParentSibling.find('.plus-res').text('+');
			});

			toggleMenu.on('click', function(){
				var $this = $(this),
					$thisNext = $this.siblings('.main-nav-responsive');

				toggleMenu.toggleClass('toggle-menu-clicked');
				$thisNext.children('ul').slideToggle(250);
			});
		}
	}

	// Transform Page Header on Scrolling
	// =========================================
	function transformPageHeader(){
		var scrollPosition = $window.scrollTop();

		if (scrollPosition >= 500){
			pageHeaderInner.addClass('transform-page-header');
		} else {
			pageHeaderInner.removeClass('transform-page-header');
		}
	}

	function followPageHeader(){
		if (mainNav.is(':visible')){
			$window.on('scroll', transformPageHeader);
		} else {
			$window.unbind('scroll', transformPageHeader);
			pageHeaderInner.removeClass('transform-page-header');
		}
	}

	// Slider
	// =========================================
	var sliderBody = $('#slider-body'),
		slider = sliderBody.children('.slider'),
		sliderLi = slider.find('li'),
		sliderArrow = slider.children('.unslider-arrow'),
		loadingIcon = $('.loading');

	sliderBody.css('height', $windowHeight-75);

	$window.load(function(){
		slider.unslider({
			keys: true,
			dots: true,
			delay: 30000,
			fluid: true
		});

		var unsliderData = slider.data('unslider');

		sliderArrow.on('click', function(){
			var $this = $(this),
				$thisClass = $this.attr('class').split(' ')[1];

			$thisClass == 'next' ? unsliderData.next() : unsliderData.prev(); // jshint ignore:line
		});

		slider.fadeIn(280);
		loadingIcon.fadeOut(180);
		sliderBodyHeight = true;
	});

	function checkSliderSize(){
		var $windowHeight = $window.height()-75;

		slider.css('height', $windowHeight);
		sliderLi.css('height', $windowHeight);
	}

	// Run a functions on Window Resize
	// =========================================
	$window.on('resize', function(){
		followPageHeader();
		nowCopyNavigation();
		checkSliderSize();
		if (sliderBodyHeight){
			sliderBody.css('height', 'auto');
			sliderBodyHeight = false;
		}
	}).trigger('resize');

	// Smart Resize
	// =========================================
	portfolioItem.smartResize({
		ratio:1.573770
	});

	// Show Hidden Content on Scrolling
	// =========================================
	wow = new WOW({
		mobile: false,
    	});

	wow.init();

	// Image Gallery
	// =========================================
	$('.swipebox').swipebox({
		hideBarsDelay:false
	});

	// Isotope
	// =========================================
	var portfolio = $('#portfolio'),
		portfolioFilterButton = $('#pf-filter').find('li');

	portfolio.isotope({
		itemSelector:'.pf-item',
		layoutMode:'fitRows'
	});

	portfolioFilterButton.on('click', function(){
		var $this = $(this),
			filterValue = $this.attr('data-filter');

		portfolio.isotope({filter: filterValue});
		$this.addClass('active-filter').siblings().removeClass('active-filter');
	});

	// If Browser is IE/Safari or is Touch Device,
	// do not run parallax effect
	// =========================================
	touchSupport = Modernizr.touchevents;
	parallaxEffect = true;
	if ($.browser.msie || $.browser.safari || touchSupport) parallaxEffect = false;

	// Page Info Parallax
	// =========================================
	$('.page-info-parallax').imageScroll({
		container:pageWrapper,
		speed:0.5,
		imgClass:'parallax-img page-info-parallax-img',
		holderMinHeight:330,
		holderMaxHeight:330,
		mediaWidth:1920,
		mediaHeight:1280,
		parallax:parallaxEffect
	});

	// Parallax Effect 1
	// =========================================
	$('.parallax-1').imageScroll({
		container:pageWrapper,
		speed:0.5,
		imgClass:'parallax-img parallax-img-1',
		holderMinHeight:500,
		holderMaxHeight:500,
		mediaWidth:1920,
		mediaHeight:1280,
		parallax:parallaxEffect
	});

	// If Browser is IE/Safari or is Touch Device,
	// return opacity to 1
	// =========================================
	if ($.browser.msie || $.browser.safari || touchSupport){
		$('.parallax-img').css('opacity','1');
	}

	// Testimonials Carousel
	// =========================================
	$('#testimonials-carousel').owlCarousel({
		singleItem:true,
		slideSpeed:500,
		mouseDrag:false,
		autoPlay:true,
		navigation:true,
		navigationText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
	});

	// Product Carousel
	// =========================================
	$('#product-carousel').owlCarousel({
		singleItem:true,
		slideSpeed:500,
		autoPlay:true,
		pagination:false,
		stopOnHover:true,
		navigation:true,
		navigationText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
	});

	// Project Carousel
	// =========================================
	$('#project-carousel').owlCarousel({
		singleItem:true,
		slideSpeed:500,
		mouseDrag:false,
		navigation:true,
		navigationText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
	});

	// Clients Logo Carousel
	// =========================================
	$('#clients-carousel').owlCarousel({
		items:4,
		slideSpeed:500,
		autoPlay:true,
		scrollPerPage:true
	});

	// Skill Bar
	// =========================================
	var skillBars = $('#skill-bars'),
		skillBarExp = skillBars.find('.skill-bar-exp'),
		skillBarExpNum = skillBarExp.children('.skill-bar-exp-num'),
		skillBarExpLen = skillBarExp.length;

	function animateSkillBar(){
		for (var i = 0; i < skillBarExpLen; i++) {
			var $this = $(skillBarExp[i]),
				$thisPercent = $this.data('percent');

			$this.animate({'width':$thisPercent+'%'}, 800, skillBarExpNumFadeIn);
		}
	}

	function skillBarExpNumFadeIn(){
		skillBarExpNum.fadeIn(200);
	}

	$(skillBars).delayLaunch({
		function:animateSkillBar,
		includeObjectHeight:true
	});

	// Accordions
	// =========================================
	var accordions = $('.accordions'),
		accordionTitle = accordions.children('.accordion-title'),
		accordionCurrent = accordions.children('.active-accordion');

	accordions.children('.accordion-content').hide();
	accordionCurrent.next().css('display','block');

	accordionTitle.on('click', function(){
		var $this = $(this);

		$this.addClass('active-accordion').siblings('.accordion-title').removeClass('active-accordion');
		$this.next().slideDown(220).siblings('.accordion-content').slideUp(220);
	});

	// Tabs
	// =========================================
	$('.tabs-nav').children('li').on('click', function(){
		var $this = $(this),
			thisTab = $this.data('tab'),
			parentSiblingChild = $this.parent('.tabs-nav').next('.tabs-content').children('#' + thisTab);

		$this.addClass('active-tab').siblings().removeClass('active-tab');
		parentSiblingChild.addClass('active-tab').siblings().removeClass('active-tab');
		//parentSiblingChild.fadeIn(350).siblings().hide();
	});

	// Company Number
	// =========================================
	var companyNumberBody = $('.company-number-body');

	$(companyNumberBody).delayLaunch({
		function:function(){ $('.company-number').countTo(); },
		delayTime:50
	});

	// Frequently Asked Questions
	// -------------------------------------------
	var faqQuestions = $('.faq-question');

	faqQuestions.on('click', function(){
		var $this = $(this);

		$this.toggleClass('active-q').next().stop().slideToggle(250);
	});

	// Notification Boxes
	// -------------------------------------------
	var notification = $('.notification'),
		notificationClose = notification.children('span');

	notificationClose.on('click', function(){
		$(this).parent().slideUp(280);
	});

	// Product Page
	// -------------------------------------------
	var increaseAmount = $('.increase-amount');

	increaseAmount.on('click', function(){
		var $this = $(this),
			$thisSibling =  $this.prev();
			$thisAmount = $thisSibling.val();

		$thisAmount++;
		$thisSibling.val($thisAmount);
	});

});
