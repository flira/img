/*
Lightbox v2.6
by Lokesh Dhakar - http://www.lokeshdhakar.com

For more information, visit:
http://lokeshdhakar.com/projects/lightbox2/
*/
(function(){var b,d,c;b=jQuery;c=(function(){function b(){this.fadeDuration=500;this.fitImagesInViewport=true;this.resizeDuration=700;this.showImageNumberLabel=true;this.wrapAround=false}b.prototype.albumLabel=function(b,c){return"Image "+b+" of "+c};return b})();d=(function(){function c(b){this.options=b;this.album=[];this.currentImageIndex=void 0;this.init()}c.prototype.init=function(){this.enable();return this.build()};c.prototype.enable=function(){var c=this;return b('body').on('click','a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]',function(d){c.start(b(d.currentTarget));return false})};c.prototype.build=function(){var c=this;b("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo(b('body'));this.$lightbox=b('#lightbox');this.$overlay=b('#lightboxOverlay');this.$outerContainer=this.$lightbox.find('.lb-outerContainer');this.$container=this.$lightbox.find('.lb-container');this.containerTopPadding=parseInt(this.$container.css('padding-top'),10);this.containerRightPadding=parseInt(this.$container.css('padding-right'),10);this.containerBottomPadding=parseInt(this.$container.css('padding-bottom'),10);this.containerLeftPadding=parseInt(this.$container.css('padding-left'),10);this.$overlay.hide().on('click',function(){c.end();return false});this.$lightbox.hide().on('click',function(d){if(b(d.target).attr('id')==='lightbox'){c.end()}return false});this.$outerContainer.on('click',function(d){if(b(d.target).attr('id')==='lightbox'){c.end()}return false});this.$lightbox.find('.lb-prev').on('click',function(){if(c.currentImageIndex===0){c.changeImage(c.album.length-1)}else{c.changeImage(c.currentImageIndex-1)}return false});this.$lightbox.find('.lb-next').on('click',function(){if(c.currentImageIndex===c.album.length-1){c.changeImage(0)}else{c.changeImage(c.currentImageIndex+1)}return false});return this.$lightbox.find('.lb-loader, .lb-close').on('click',function(){c.end();return false})};c.prototype.start=function(c){var f,e,j,d,g,n,o,k,l,m,p,h,i;b(window).on("resize",this.sizeOverlay);b('select, object, embed').css({visibility:"hidden"});this.$overlay.width(b(document).width()).height(b(document).height()).fadeIn(this.options.fadeDuration);this.album=[];g=0;j=c.attr('data-lightbox');if(j){h=b(c.prop("tagName")+'[data-lightbox="'+j+'"]');for(d=k=0,m=h.length;k<m;d=++k){e=h[d];this.album.push({link:b(e).attr('href'),title:b(e).attr('title')});if(b(e).attr('href')===c.attr('href')){g=d}}}else{if(c.attr('rel')==='lightbox'){this.album.push({link:c.attr('href'),title:c.attr('title')})}else{i=b(c.prop("tagName")+'[rel="'+c.attr('rel')+'"]');for(d=l=0,p=i.length;l<p;d=++l){e=i[d];this.album.push({link:b(e).attr('href'),title:b(e).attr('title')});if(b(e).attr('href')===c.attr('href')){g=d}}}}f=b(window);o=f.scrollTop()+f.height()/10;n=f.scrollLeft();this.$lightbox.css({top:o+'px',left:n+'px'}).fadeIn(this.options.fadeDuration);this.changeImage(g)};c.prototype.changeImage=function(f){var d,c,e=this;this.disableKeyboardNav();d=this.$lightbox.find('.lb-image');this.sizeOverlay();this.$overlay.fadeIn(this.options.fadeDuration);b('.lb-loader').fadeIn('slow');this.$lightbox.find('.lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption').hide();this.$outerContainer.addClass('animating');c=new Image();c.onload=function(){var m,g,h,i,j,k,l;d.attr('src',e.album[f].link);m=b(c);d.width(c.width);d.height(c.height);if(e.options.fitImagesInViewport){l=b(window).width();k=b(window).height();j=l-e.containerLeftPadding-e.containerRightPadding-20;i=k-e.containerTopPadding-e.containerBottomPadding-110;if((c.width>j)||(c.height>i)){if((c.width/j)>(c.height/i)){h=j;g=parseInt(c.height/(c.width/h),10);d.width(h);d.height(g)}else{g=i;h=parseInt(c.width/(c.height/g),10);d.width(h);d.height(g)}}}return e.sizeContainer(d.width(),d.height())};c.src=this.album[f].link;this.currentImageIndex=f};c.prototype.sizeOverlay=function(){return b('#lightboxOverlay').width(b(document).width()).height(b(document).height())};c.prototype.sizeContainer=function(f,g){var b,d,e,h,c=this;h=this.$outerContainer.outerWidth();e=this.$outerContainer.outerHeight();d=f+this.containerLeftPadding+this.containerRightPadding;b=g+this.containerTopPadding+this.containerBottomPadding;this.$outerContainer.stop(true).animate({width:d,height:b},this.options.resizeDuration,'swing');setTimeout(function(){c.$lightbox.find('.lb-dataContainer').width(d);c.$lightbox.find('.lb-prevLink').height(b);c.$lightbox.find('.lb-nextLink').height(b);c.showImage()},this.options.resizeDuration)};c.prototype.showImage=function(){this.$lightbox.find('.lb-loader').hide();this.$lightbox.find('.lb-image').fadeIn('slow');this.updateNav();this.updateDetails();this.preloadNeighboringImages();this.enableKeyboardNav()};c.prototype.updateNav=function(){this.$lightbox.find('.lb-nav').show();if(this.album.length>1){if(this.options.wrapAround){this.$lightbox.find('.lb-prev, .lb-next').show()}else{if(this.currentImageIndex>0){this.$lightbox.find('.lb-prev').show()}if(this.currentImageIndex<this.album.length-1){this.$lightbox.find('.lb-next').show()}}}};c.prototype.updateDetails=function(){var b=this;if(typeof this.album[this.currentImageIndex].title!=='undefined'&&this.album[this.currentImageIndex].title!==""){this.$lightbox.find('.lb-caption').html(this.album[this.currentImageIndex].title).fadeIn('fast')}if(this.album.length>1&&this.options.showImageNumberLabel){this.$lightbox.find('.lb-number').text(this.options.albumLabel(this.currentImageIndex+1,this.album.length)).fadeIn('fast')}else{this.$lightbox.find('.lb-number').hide()}this.$outerContainer.removeClass('animating');this.$lightbox.find('.lb-dataContainer').fadeIn(this.resizeDuration,function(){return b.sizeOverlay()})};c.prototype.preloadNeighboringImages=function(){var c,b;if(this.album.length>this.currentImageIndex+1){c=new Image();c.src=this.album[this.currentImageIndex+1].link}if(this.currentImageIndex>0){b=new Image();b.src=this.album[this.currentImageIndex-1].link}};c.prototype.enableKeyboardNav=function(){b(document).on('keyup.keyboard',b.proxy(this.keyboardAction,this))};c.prototype.disableKeyboardNav=function(){b(document).off('.keyboard')};c.prototype.keyboardAction=function(g){var d,e,f,c,b;d=27;e=37;f=39;b=g.keyCode;c=String.fromCharCode(b).toLowerCase();if(b===d||c.match(/x|o|c/)){this.end()}else if(c==='p'||b===e){if(this.currentImageIndex!==0){this.changeImage(this.currentImageIndex-1)}}else if(c==='n'||b===f){if(this.currentImageIndex!==this.album.length-1){this.changeImage(this.currentImageIndex+1)}}};c.prototype.end=function(){this.disableKeyboardNav();b(window).off("resize",this.sizeOverlay);this.$lightbox.fadeOut(this.options.fadeDuration);this.$overlay.fadeOut(this.options.fadeDuration);return b('select, object, embed').css({visibility:"visible"})};return c})();b(function(){var e,b;b=new c();return e=new d(b)})}).call(this);
/*
 	[0]Especificações inciais
 		[0.1]Variáveis universais
	[1]Funções gerais
	[2]Funções da página 'home'
	[3]Funções da página 'our work'
	[4]Funções da página 'our work - interna'
	[5]Funções para dispositivos com tela de toque	
	______________________________________________________________________
 */

/*
 * variável para função com timer. "ts" para timer do slider e "tn" para
 * timer de notícias.
 * 
 */
var ts;
var tn;
/*
 * variaveis de tempo dos sliders e da notícia (em segundos)
 */

if (!sliderFadeIn)
	var sliderFadeIn = .5; // tempo da primeira entrada do slideshow - Timers[0]
if (!sliderSpd)
	var sliderSpd = 7.5; // tempo em que cada imagem fica exposta - Timers[1]
if (!transitionSliderSpd)
	var transitionSliderSpd = .75; // tempo para mudança de cada slide - Timers[2]
if (!homeTitleSpd)
	var homeTitleSpd = .2; // tempo para mudança do título da home - Timers[3]
if (!fadeTitleSpd)
	var fadeTitleSpd = .5; // tempo para abrir e fechar o título da home - Timers[4]
if (!newsSpd)
	var newsSpd = 15; // tempo em que cada notícia fica exposta - Timers[5]
if (!transitionNewsSpd)
	var transitionNewsSpd = .4; // tempo para a transição de noticias - Timers[6]
if (!worksSlideSpd)
	var worksSlideSpd = .25; // tempo para o mouse over de "works"  - Timers[7]
if (!projectSlideSpd)
	var projectSlideSpd = .2; // tempo mudar as imagens principais das páginas internas de "work"  - Timers[8]

var timers = new Array(sliderFadeIn, sliderSpd, transitionSliderSpd,
		homeTitleSpd, fadeTitleSpd, newsSpd, transitionNewsSpd, worksSlideSpd,projectSlideSpd);
var links;
$(document).ready(function() {
	init();
});
function init() {
	// função para passar de segundo para milisegundo
	setTimers();
	if ($('body').attr('id') != 'project')
		fadeInPage();
	// funções da página 'our work'
	if ($('body').attr('id') == 'home')
		fhome();
	// funções da página 'our work'
	if ($('body').attr('id') == 'works')
		works();
	// funções da página de um projeto
	if ($('body').attr('id') == 'project')
		project();
	// Ativa o slider nas páginas que tem slider
	if ($('body').attr('id') == 'home' || $('body').attr('id') == 'about'
			|| $('body').attr('id') == 'contact')
		slider();
	addGridBreak();
}

/*
 * [1]Funções gerais
 * ______________________________________________________________________
 */
 
//Passa variáveis de tempo de milisegundos para segundos
function setTimers() {
	for ( var i = 0; i < timers.length; i++)
		timers[i] *= 1000;
}

// Faz fade in das páginas após carregar o conteúdo
function fadeInPage( ) {
	$('body').stop(true).animate({opacity:1},timers[4],function ( ) {
		/* Funções para dispositivos com touchscreen.
		 * Como algumas funções do mobile são mais pesadas
		 * elas carregam após todo o site já ter carregado
		 * e "entrado", assim sendo menos frustrante a
		 * espera do usuário.
		 */
		if ($('html').hasClass('touch'))
			touchInit();
	});
}

/*
 * adiciona um elemento com 100% de largura ao fim de grids justificadas para
 * que todos os itens do mesmo fiquem justificados
 */
function addGridBreak() {
	$('ul.grid').append('<li class="break"></li>');
}


// função para ocultar a descrição de cada projeto
function resizeHeight() {
	var element, newHeight;
	for ( var i = 1; i <= $('#stufflist li').length; i++) {
		element = '#stufflist li:nth-of-type(' + i + ')';
		if ($(element).hasClass('carregar'))
			newHeight = "100%";
		else
			newHeight = $(element + ' img').outerHeight()
					+ $(element + ' h2').outerHeight()+7;
		$(element).height(newHeight);
	}
}
// função para mostrar a descrição de cada projeto
function showDescription( ) {
	if (!$(this).parent().hasClass('carregar'))
		$(this).stop(true).animate({
			marginTop : $(this).parent().height() - $(this).height()
		}, timers[7]);
}
// função para ocultar a descrição de cada projeto após o mouse over
function hideAgain( ) {
	$('#stufflist a').stop(true).animate({
			'margin-top' : "0"
		}, timers[7]);
}

/*
 * função para "dar play" nos sliders Essa variável "parent" é útil em páginas
 * com mais de um slider, para chama-los individualmente e todos abrirem
 * corretamente. Ela da o valor da variável universal "t" abaixo para a mesma
 * poder ser parada em qualquer outra função.
 */
function slider() {
	$('.slider li').css('opacity', '1');
	for ( var i = 1; i <= $('.slider li').length; i++)
		$('.slider li:nth-of-type(' + i + ')').css('z-index',
				Math.round(50 / i));
	$('.no-mediaqueries .slider li').css('visibility', 'visible');
	$('.slider').stop(true).animate({
		'opacity' : 1
	}, timers[0], function() {
		if ($('body').attr('id') == 'about')
			resizeSlider();
	});
	ts = self.setInterval('nextSlide( )', timers[1]);
	if ($('.slider').hasClass('butcher'))
		resizeButcher();
	createCtrl('.slider');
	if ($('body').attr('id') == 'about' || $('body').attr('id') == 'contact') {
		resizeSlider();
		$(window).resize(resizeSlider);
	}
}

// função para passar para a próxima imagem nos sliders
function nextSlide(a) {
	if (typeof (a) === 'undefined')
	a = 1 + ($('.slider li').length - $('.slider li[style*="opacity: 1"]').length);
	if(a==$('.slider li').length){
		previousSlide(1);
	}
	else {
		b = 1 + ($('.slider li').length - $('.slider li[style*="opacity: 1"]').length);
		a++;
	
		changeCtrl(a, 'div[role=main] ');
		for ( var i = a - 1; i > 0; i--)
			if ($('.slider li:nth-of-type(' + i + ')').css('opacity') == 1
					&& i != b)
				$('.slider li:nth-of-type(' + i + ')').css('opacity', 0);
		$('.slider li[style*="opacity: 1"]').first().animate({
			'opacity' : 0
		}, timers[2], 'easeInOutQuart', function(){
			$('.slider li[style*="opacity: 0"]').css("display","none");
			$('#home .slider li[style*="opacity:1"]').css('display','list-item');
		});
	}
}
// função para passar para a imagem anterior nos sliders
function previousSlide(a) {;
	changeCtrl(a, 'div[role=main] ');
	$('.slider li:nth-of-type(' + a + ')').css("display","list-item");
	$('.slider li:nth-of-type(' + a + ')').animate({
		'opacity' : 1
	}, timers[2], 'easeInOutQuart', function() {
		for (a; a <= $('.slider li').length; a++) {
			$('.slider li:nth-of-type(' + a + ')').css('opacity', '1');
			$('.slider li:nth-of-type(' + a + ')').css("display","list-item");
		}
	});
}

// função para mudar o slide em sliders
function changeSlide(event) {
	var n = $(this).attr('class').split('e'), a = parseInt(n[1]), b = 1 + ($('.slider li').length - $('.slider li[style*="opacity: 1"]').length);
	ts = window.clearInterval(ts);
	if (a > b) {
		nextSlide(a - 1);
	} else {
		previousSlide(a);
	}
}


function resizeSlider() {
	$('.slider li').width("100%");
	$('.slider').height($('.slider li img:visible').height());
	$('.sliderctrl button').css('border-width', calculateThick());
	$('.sliderctrl button.selecionado').css('border-width', '1px');
}
function calculateThin() {
	return '1px';
}
function calculateThick() {
	var a;
	if ($('body>header').height() == 160)
		a = ".2em";
	else
		a = ".35em";
	return a;
}

function createCtrl(controled) {
	var b;
	if (controled == '.slider')
		b = 'div[role=main] ';
	else
		b = '#news ';
	$(controled).after(
			'<nav class="slidectrlwrap"><ul class="sliderctrl"></ul></nav>');
	for ( var i = 1; i <= $(b + controled + ' li').length; i++) {
		$(b + '.sliderctrl').append(
				'<li><button class="slide' + i + '"></button></li>');
	}
	$(b + '.slide1').addClass('selecionado');
	if (controled == '.slider')
		$(b + ' .sliderctrl button').click(changeSlide);
	else
		$(b + '.sliderctrl button').click(changeNews);

}

function changeCtrl(a, b) {
	var thickBorder = calculateThick(), thinBorder = calculateThin();
	if (a == $(b + '.sliderctrl li').length + 1)
		a = 1;
	$(b + '.sliderctrl button.selecionado').stop(true).animate({
		'background' : '#b2b2b0',
		'border-width' : thickBorder
	}, 375, function() {
		$(b + '.sliderctrl .selecionado').removeClass('selecionado');
	});
	$(b + '.slide' + a).stop(true).animate({
		'background' : '#4b4b4b',
		'border-width' : thinBorder
	}, 375, function() {
		$(b + '.slide' + a).addClass('selecionado');
	});
}
function news() {
	var a = $('#newslist li').length;
	tn = self.setInterval('changeNews( )', timers[5]);
	$('#newslist').width((100 * a) + '%');
	$('#newslist li').width((100 / a) + '%');
	createCtrl('#newslist');
}

// função para passar para a próxima imagem nos sliders
function changeNews(event) {
	var a;
	if(event)tn = window.clearInterval(tn);
	if (!$(this).attr("class")) {
		a = -(Math.round((parseFloat($('#newslist').css('margin-left')) / $(
				'#newslist li').width()))) + 1;
		if (a == $('#newslist li').length)
			a = 0;
	} else {
		var n = $(this).attr("class").split('e');
		a = parseFloat(n[1]) - 1;
	}
	$('#newslist').stop(true).animate({
		'margin-left' : -(a * 100) + '%'
	}, timers[6]);
	changeCtrl(a + 1, '#news ');
}

/*
 * funções que redimensionam imagens dentro da classe "butcher" que serve para
 * cortar imagens
 */
function resizeButcher() {
	$("#home .slider li:hidden").css('display','list-item');
	if($("#home .slider li").css('top')!='161px') {
		for ( var i = 1; i <= $('.butcher img').length; i++) {
			var newHeight = $(window).height() - $('body>footer').height(), newMargin = ($(
					window).width() - $('.butcher li:nth-of-type(' + i + ') img')
					.width()) / 2;
			if(newHeight < 450)newHeight=450;
			$('.butcher li').height(newHeight);
			$('.butcher').height(newHeight);
			resetImgSize(i, newMargin);
			if ($('.butcher li:nth-of-type(' + i + ') img').height() < newHeight)
				redefineImgSize(newHeight, newMargin, i);
		}
	} else {		
		$('.butcher li').css({'height':'auto','width':'100%','max-width':'100%'});
		$('.butcher img').css({'height':'auto','width':'100%','max-width':'100%'});
		$('.butcher').css({'height':$('.butcher img').height(),'width':'100%','max-width':'100%'});
	}
	$('#home .slider li[style*="opacity: 0"]').css('display','none');
}
function redefineImgSize(newHeight, newMargin, i) {
	$('.butcher li:nth-of-type(' + i + ') img').css({
		'width' : 'auto',
		'height' : newHeight,
		'max-width' : 'none',
		'margin-left' : newMargin
	});
}
function resetImgSize(i, newMargin) {
	$('.butcher li:nth-of-type(' + i + ') img').css({
		'width' : '100%',
		'height' : "auto",
		'max-width' : '100%',
		'margin-left' : newMargin
	});
}
/*
 * [2]Funções da página 'home'
 * ______________________________________________________________________
 */

/*
 * Função que cria os títulos das chamadas das imagens da home
 */
function fhome() {
	resizeButcher();
	$(window).resize(resizeButcher);
	if( $("html").hasClass('touch') ) {
		$( window ).on( "orientationchange", function( ) {
			resizeButcher();
		});
	}
	news();
}

/*
 * [3]Funções da página 'our work'
 * ______________________________________________________________________
 */
function works() {
	$('input[type=radio]').click(markRadio);
    $('.chamadagrande').before('<li class="break"></li>');
	$('#stufflist li img').after('<span class="triangulo"></span>');
	addMacOSFix();
    setCGMargin( );
	resizeHeight();
	$(window).resize(resizeHeight);
	$('.no-touch #stufflist li a').hover(showDescription, hideAgain);
	$(window).resize(setCGMargin);

	// função para marcar spans mascaras dos radio inputs
	function markRadio() {
		var inputSelecionado = 'label[for=' + $(this).attr('value') + '] span';
		$('label span').removeClass('selecionado');
		$(inputSelecionado).addClass('selecionado');
	}
	// função para criar as classes da lista de trabalhos
	function worksClasses() {
		var i = 0, k=10;
		for (i; i <= Math.round($('#stufflist li').length / k); i++) {
			worksLoop(k,i);
		}
		if ($('#stufflist li').length % k != 0) {
			worksLoop($('#stufflist li').length % k,i,k-1);
		}
	}
	/*
	 * função que faz o loop para ter 1 chamada grande, 4 pequenas e 1 grande
	 * novamente
	 */
	
	function setCGMargin( ) {
		macOSFix();
		$('.chamadagrande.esq').css ({
			'margin-right' : calculateCGMargin( )
		});
		$('.chamadagrande.dir').css ({
			'margin-left' : calculateCGMargin( )
		});
	}
	
	function addMacOSFix( ) {
		var a=$('.chamadagrande').offset().top,b=$('.chamadapequena').offset().top;
		if(a<b && !$('html').hasClass('macfix')) {
			$('html').addClass('macfix');
			if($('.chamadapequena h2').height()>25) {
                $('span.triangulo').css('margin-top','-13.75px');
                $('.chamadapequena h2').css('font-size','21px');
			}
		}
	}
	
	function macOSFix( ) {
		if($('html').hasClass('macfix')) {
			$('.chamadagrande img, .chamadapequena img').css({
				'width':'100%',
				'height':'auto'
			})
			if( $(window).width()>800 ) {
				var a= new Array('.chamadagrande img','.chamadapequena img');
				for (var i=0;i<a.length;i++) {
					$(a[i]).width(Math.abs($(a[i]).width()));
					$(a[i]).height(Math.abs($(a[i]).height()));
				}
			}
		}
	}
	
	function calculateCGMargin( ) {
		var a= parseFloat($('.chamadagrande').width( )), b=parseFloat($('.chamadapequena').width( )),c=parseFloat($('#stufflist').width( )),d;
		d = ((((c-((a+(2*b))))/2)*100)/c)+'%';	
		return d;
	}	
}

/*
 * [4]Funções da página 'our work - interna'
 * ______________________________________________________________________
 */
function project() {
	createThumbs();
	createPlayers();
	createInitial();
	$('section[itemprop=author] h1').click(toggleCredits);
	resizeHeight();
	resizeSlider();
	$(window).resize(resizeHeight);
	$(window).resize(resizeSlider);
	$('.no-touch #stufflist li a').hover(showDescription, hideAgain);
	$('#stufflist li img').after('<span class="triangulo"></span>');
	
	/*
	 * função para adicionar os textos de hover ao título "share" desta página
	 */
	$('.no-touch section.share a').hover(function() {
		$('section.share h1 span').html(' | ' + $(this).attr('title'));
	}, function() {
		$('section.share h1 span').html('');
	});
	function createThumbs( ) {
		if ($('.imgvid .slider li').length > 1){
			$('.imgvid .slider').after('<div class="mask"><ul class="grid">'+$('.imgvid .slider').html()+'</ul></div>');
			for(var i=1;i<=$('.imgvid .grid li').length;i++)
				$('.imgvid .grid li:nth-child('+i+')').attr('id','tn'+i);
			$('.imgvid .grid li').click(changeImg);
		}
	}
	
	function changeImg( ) {
		var a = $(this).attr('id').split('n'), n=parseFloat(a[1]), that='.imgvid .slider li:nth-child('+n+')';
		if($(that).css('z-index')=='-1' && !$(this).hasClass('noclick')) {
			$('.imgvid .slider li').css('z-index','-1');
			$(that).css({
				'display':'block',
				'z-index':'9',
				'opacity':0});
			$(that).stop(true).animate({
				opacity:1
			},timers[8], function () {
				for (var i=1;i<=$('.imgvid .slider li').length;i++) {
					if(i!=n) {
						$('.imgvid .slider li:nth-child('+i+')').css({
							'display':'none',
							'opacity':0	
						});
					}
				}
				$('.imgvid .slider img').css({
					'opacity':1,
				});
					$('.imgvid .slider .play').css({
					'display':'block',
					'opacity':1
				});
					$('.imgvid .slider li iframe').css({
					'display':'none',
					'z-index':'-1'
				});
				$(that).css({
				'display':'block'});
			});
		}
	}
	
	function createPlayers( ) {
		$('.imgvid object param[name=vimeo]').parent().parent().addClass('vimeo');
		$('.imgvid .vimeo object').before('<div class="play"></div>');
		addIframes( );
		$('.slider .vimeo').click(playVideo);
		replaceObjects();
		adjustPlayer();
		fadeInPage();
		$(window).resize(adjustPlayer);
	}
	
	function addIframes( ) {
		for (var i=1;i<=$('.imgvid .slider li').length;i++) {
			$('.slider .vimeo:nth-child('+i+') object').after('<iframe src="'+ $('.slider .vimeo:nth-child('+i+') object param[name=vimeo]').attr('value') +'" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="display:none"></iframe>');
		}
	}
	
	function adjustPlayer( ) {
		if ($('.slider .vimeo iframe').css('display')=='none') {
			$('.slider .vimeo').height($('.slider .vimeo img').height());
		} else {
			$('.slider .vimeo').height($('.slider .vimeo iframe').height());
		}
		$('.slider .vimeo .play').height($('.slider .vimeo img').height());
		$('.mask .vimeo .play').height($('.mask .vimeo object').height());
	}
	
	function replaceObjects( ) {
		$('.imgvid .vimeo object param').remove();
		for (var i=1;i<=$('.imgvid .slider li').length;i++) {
			if(!$('.imgvid .slider li:nth-child('+i+')').hasClass('vimeo') && $('.imgvid .slider li:nth-child('+i+') object param').length != 0) {
				$('.imgvid .slider li:nth-child('+i+') object').before('<a href="'+$('.imgvid .slider li:nth-child('+i+') object param[name=lightbox]').attr('value')+'" data-lightbox="mainlightbox'+i+'" class="lightbox"> </a>');
			}
			$('.imgvid .slider li:nth-child('+i+') object').replaceWith('<img src="'+$('.imgvid .slider li:nth-child('+i+') object').attr('data')+'" alt="'+$('.imgvid .slider li:nth-child('+i+') object').text()+' "/>');
			$('.imgvid li:nth-child('+i+') .lightbox').append($('.imgvid .slider li:nth-child('+i+') img'));
		}		
	}
	
	function playVideo () {
		var kids = ['.play','img'];
		$('.slider .vimeo iframe').css('display','block')
		for (var i=0;i<kids.length;i++)
			$(this).children(kids[i]).stop(true).animate({ 
				opacity:0	
			},timers[8],function(){
				$('.slider .vimeo .play').css('display','none');
				$('.slider .vimeo iframe').css('z-index','0')
			});
	}
	
	// funcão para criar a capitular e primeira palavra em caixa alta
	function createInitial() {
		var newP, fullP = $('section[itemprop=description] p').first().html()
				.split(" "), firstWord = fullP[0].split("");
		newP = '<span class="firstWord"><span class="initial">' + firstWord[0]
				+ '</span>';
		for ( var i = 1; i < firstWord.length; i++)
			newP += firstWord[i];
		newP += '</span>';
		for ( var i = 1; i < fullP.length; i++)
			newP += ' ' + fullP[i];
		$('section[itemprop=description] p').first().html(newP);
	}

	// funcão para contrair e expandir os créditos
	function toggleCredits() {
		var altura = $('section[itemprop=author] dl').css('height');
		if ($('section[itemprop=author] div').css('height') == '0px')
			$('section[itemprop=author] div').stop(true).animate({
				height : altura
			}, 500);
		else
			$('section[itemprop=author] div').stop(true).animate({
				height : '0'
			}, 500);
	}
}

/*
 * [5]Funções para dispositivos com tela de toque
 * ______________________________________________________________________
 */

function touchInit() {
	//variável para guardar links em array
	var links;
	$( window ).on( "orientationchange", function( event ) {
		iOSfix();
		self.setTimeout('resizeSlider()',500);
	});
	$(window).orientationchange();
	if ($('body').attr('id') == 'works'||$('body').attr('id') == 'projects') {
		/*	funções que guardam os links originais de "works" e da página interna
		 	de works e depois os removem para criar o fake hover em celulares, sem
			navegar direto para o link após clicados */
		
		links = createLinks();
		$( "#stufflist a" ).attr("href","JavaScript:void(0);");
		$( "#stufflist a" ).on('tap', fakeHoverWork );
	}
	function iOSfix () {
		var a=parseFloat($('footer p').css('font-size')),b=parseFloat($('li').css('font-size'));
		if(a>b) {
			$('p').css('font-size', '.65em');
			$('#logo').css('font-size', '1.55em' );
		} else {
			$('p').css('font-size', '1em' );
			$('#logo').css('font-size', '1em' );
		}
	}
		function fakeHoverWork( ){
		var b=$(this).parent().attr("id").split('k'),a = parseFloat(b[1]);
		if (!$(this).hasClass('tap')) {
			hideAgain( );
			$( "#stufflist a" ).attr("href","JavaScript:void(0);");
			$( "#stufflist a" ).removeClass('tap');
			$(this).stop(true).animate({
				marginTop : $(this).parent().height() - $(this).height()
			}, timers[7],function(){$(this).attr('href',links[a-1]);});
			$(this).addClass('tap');
		}
	}
	function createLinks() {
		var a= new Array(),n=1;
		for(var i=1;i<=$( "#stufflist li" ).length;i++) {
			if (!$("#stufflist li:nth-child("+i+")").hasClass('break')&&!$("#stufflist li:nth-child("+i+")").hasClass('carregar')) {
				$("#stufflist li:nth-child("+i+")").attr("id","work"+n);
				a.push($('#work'+n+' a').attr("href"));
				n++;
			}
		}
	
		return a;
	}

}

