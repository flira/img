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
	resizeSpecialty();
	$(window).resize(resizeSpecialty);
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
	$('body').animate({opacity:1},timers[4],function ( ) {
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

/*
	Serve para a assinatura da marca no menu. Faz com que a linha
	abaixo do "crossmedia studio" da logo seja da mesma largura dela.
*/
function resizeSpecialty() {
	var c,b,a=parseFloat($('#assinatura').css('font-size'));
	if($('#assinatura').width()<$('#crossmedia').width()) {
		while($('#assinatura').width()<$('#crossmedia').width()) {
			b = Math.abs($('#crossmedia').width() - $('#assinatura').width());
			a++ ;
			$('#assinatura').css('font-size',a+'px');
			c = Math.abs($('#crossmedia').width() - $('#assinatura').width());
		}
	} else {
		while($('#assinatura').width()>$('#crossmedia').width()) {
			b = Math.abs($('#crossmedia').width() - $('#assinatura').width());
			a-- ;
			$('#assinatura').css('font-size',a+'px');
			c = Math.abs($('#crossmedia').width() - $('#assinatura').width());
		}
	}
	if(b<c) {
		a--;
		$('#assinatura').css('font-size',a+'px');
	}
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
	$('.slider').animate({
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
		ts = window.clearInterval(ts);
		previousSlide(1);
	}
	else {
		b = 1 + ($('.slider li').length - $('.slider li[style*="opacity: 1"]').length);
		if ($('body').attr('id') == 'home')
			getHomeTitle(a);
		a++;
	
		changeCtrl(a, 'div[role=main] ');
		for ( var i = a - 1; i > 0; i--)
			if ($('.slider li:nth-of-type(' + i + ')').css('opacity') == 1
					&& i != b)
				$('.slider li:nth-of-type(' + i + ')').css('opacity', 0);
		$('.slider li[style*="opacity: 1"]').first().animate({
			'opacity' : 0
		}, timers[2], 'easeInOutQuart');
	}
}
// função para passar para a imagem anterior nos sliders
function previousSlide(a) {
	if ($('body').attr('id') == 'home')
		getHomeTitle(a - 1);
	changeCtrl(a, 'div[role=main] ');
	$('.slider li:nth-of-type(' + a + ')').animate({
		'opacity' : 1
	}, timers[2], 'easeInOutQuart', function() {
		for (a; a <= $('.slider li').length; a++)
			$('.slider li:nth-of-type(' + a + ')').css('opacity', '1');
		ts = self.setInterval('nextSlide( )', timers[1]);
	});
}

// função para mudar o slide em sliders
function changeSlide() {
	var n = $(this).attr('class').split('e'), a = parseInt(n[1]), b = 1 + ($('.slider li').length - $('.slider li[style*="opacity: 1"]').length);
	ts = window.clearInterval(ts);
	if (a > b) {
		ts = self.setInterval('nextSlide( )', timers[1]);
		nextSlide(a - 1);
	} else {
		previousSlide(a);
	}
}


function resizeSlider() {
	$('.slider li').width("100%");
	$('.slider').height($('.slider li').height());
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
	$(b + '.sliderctrl button.selecionado').animate({
		'background' : '#b2b2b0',
		'border-width' : thickBorder
	}, 375, function() {
		$(b + '.sliderctrl .selecionado').removeClass('selecionado');
	});
	$(b + '.slide' + a).animate({
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
function changeNews() {
	var a;
	tn = window.clearInterval(tn);
	if (!$(this).attr("class")) {
		a = -(Math.round((parseFloat($('#newslist').css('margin-left')) / $(
				'#newslist li').width()))) + 1;
		if (a == $('#newslist li').length)
			a = 0;
	} else {
		var n = $(this).attr("class").split('e');
		a = parseFloat(n[1]) - 1;
	}
	$('#newslist').animate({
		'margin-left' : -(a * 100) + '%'
	}, timers[6]);
	changeCtrl(a + 1, '#news ');
	tn = self.setInterval('changeNews( )', timers[5]);
}

/*
 * funções que redimensionam imagens dentro da classe "butcher" que serve para
 * cortar imagens
 */
function resizeButcher() {
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
	getHomeTitle(0);
	news();
	$('#fechar').click(toggleHeading);

	// função que abre e fecha o box de chamada
	function toggleHeading() {
		if (!$(this).hasClass("fechado")) {
			$('#featured,.chamada h2,.chamada h3').hide(timers[4]);
			$('.chamada').animate({
				width : '1.9em',
				height : '1.1em'
			}, timers[4], function() {
				$('#fechar').attr("title", "show info");
				$('#fechar').addClass("fechado");
			});

		} else {
			$('.chamada').animate({
				width : '22.7em',
				height : '6em'
			}, timers[4], function() {
				$('#featured,.chamada h2,.chamada h3').show(timers[4]);
			});
			$(this).attr("title", "close");
			$(this).removeClass("fechado");
		}

	}
}

function getHomeTitle(n) {
	if (!$('#fechar').hasClass('fechado')) {
		$('.chamada').animate(
				{
					'height' : '.9em'
				},
				timers[0],
				'easeOutQuart',
				function() {
					n++;
					var headings = $('.butcher li:nth-of-type(' + n + ') img')
							.attr('alt').split('|');
					changeTitle(headings, n);
					showTitle();
				});
	} else {
		n++;
		var headings = $('.butcher li:nth-of-type(' + n + ') img').attr('alt')
				.split('|');
		changeTitle(headings, n);
	}
}
function changeTitle(headings, n) {
	var link = $('.butcher li:nth-of-type(' + n + ') a').attr('href');
	if ($('.chamada h2').length == 0) {
		$('.chamada h1').after('<a><h2> </h2><h3> </h3></a>');
	}
	$('.chamada a').attr('href', link);
	$('.chamada h2').html(headings[0]);
	$('.chamada h3').html(headings[1]);
}

function showTitle() {
	if (!$('#fechar').hasClass('fechado')) {
		$('.chamada').animate({
			'height' : '6em'
		}, timers[0], 'easeInQuart');
	}
}

/*
 * [3]Funções da página 'our work'
 * ______________________________________________________________________
 */
function works() {
	$('input[type=radio]').click(markRadio);
	worksClasses();
	resizeHeight();
	$(window).resize(resizeHeight);
	$('.chamadagrande').before('<li class="break"></li>');
	$('#stufflist li img').after('<span class="triangulo"></span>');
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
	function worksLoop(n,m,o) {
		var p,q;
		if(!o)o=n-1;
		if(m%2==0)p=true;
		else p=false;
		for ( var j = 1; j < n; j++) {
			q=(m * o) + j;
			if(!$('#stufflist li:nth-child(' + q + ')').hasClass('carregar')) {
				if (j == 1) {
					$('#stufflist li:nth-child(' + q + ')').addClass('chamadagrande');
					if(!p){
						$('#stufflist li:nth-child(' + q + ')').addClass('dir')
						$('#stufflist li:nth-child(' + q + ')').css({
							'float':'right'	
						});
						macOSFix();
					} else {
						$('#stufflist li:nth-child(' + q + ')').addClass('esq')
						$('#stufflist li:nth-child(' + q + ')').css({
							'float':'left'
						});
					}	
				} else {
					$('#stufflist li:nth-child(' + q + ')').addClass('chamadapequena');
				}
			}
		}
		setCGMargin( );
	}
	
	function setCGMargin( ) {
		$('.chamadagrande.esq').css ({
			'margin-right' : calculateCGMargin( )
		});
		$('.chamadagrande.dir').css ({
			'margin-left' : calculateCGMargin( )
		});

	}
	
	function macOSFix( ) {
		var a=$('.chamadagrande').offset().top,b=$('.chamadapequena').offset().top,c=.1,d=parseFloat($('.chamadagrande').css('margin-top'));
		if(a<b) {
			if(!$('html').hasClass('macfix'))$('html').addClass('macfix');
			/*if( parseFloat($(window).width())>800) {
				while(a<b) {
					$('.chamadagrande').css('margin-top',c+'px');
					c+=.1;
					a=$('.chamadagrande').offset().top;
				}

			}
			$('.dir').css('margin-top',c+'px');
			$('.esq').css('margin-top',c+'px');*/
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
	
	/*
	 * função para adicionar os textos de hover ao título "share" desta página
	 */
	$('.no-touch section.share a').hover(function() {
		$('section.share h1 span').html(' | ' + $(this).attr('title'));
	}, function() {
		$('section.share h1 span').html('');
	});
	function createThumbs( ) {
		$('.imgvid .slider').after('<div class="mask"><ul class="grid">'+$('.imgvid .slider').html()+'</ul></div>');
		for(var i=1;i<=$('.imgvid .grid li').length;i++)
			$('.imgvid .grid li:nth-child('+i+')').attr('id','tn'+i);
		$('.imgvid .grid li').click(changeImg);
	}
	
	function changeImg( ) {
		var a = $(this).attr('id').split('n'), n=parseFloat(a[1]), that='.imgvid .slider li:nth-child('+n+')';		
		if($(that).css('z-index')=='-1') {
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
		adjustPlayer();
		$(window).resize(adjustPlayer);
		$('.slider .vimeo').click(playVideo);
		replaceObjects ();
	}
	
	function addIframes( ) {
		for (var i=1;i<=$('.imgvid .slider li').length;i++) {
		$('.slider .vimeo:nth-child('+i+') object').after('<iframe src="'+ $('.slider .vimeo:nth-child('+i+') object param[name=vimeo]').attr('value') +'?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;color=a0c9ca" width="100%" height="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen style="display:none"></iframe>');
		}
	}
	
	function adjustPlayer( ) {
		if ($('.slider .vimeo iframe').css('display')=='none') {
			$('.slider .vimeo').height($('.slider .vimeo object').height());
		} else {
			$('.slider .vimeo').height($('.slider .vimeo iframe').height());
		}
		$('.slider .vimeo .play').height($('.slider .vimeo object').height());
		$('.mask .vimeo .play').height($('.mask .vimeo object').height());
	}
	
	function replaceObjects( ) {
		$('.imgvid .vimeo object param').remove();
		for (var i=1;i<=$('.imgvid .slider li').length;i++) {
			$('.imgvid .slider li:nth-child('+i+') object').replaceWith('<img src="'+$('.imgvid .slider li:nth-child('+i+') object').attr('data')+'" alt="'+$('.imgvid .slider li:nth-child('+i+') object').html()+' "/>');
		}
		
	}
	
	function playVideo () {
		var kids = ['.play','img'];
		$('.slider .vimeo iframe').css('display','block')
		for (var i=0;i<kids.length;i++)
			$(this).children(kids[i]).animate({ 
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
			$('section[itemprop=author] div').animate({
				height : altura
			}, 500);
		else
			$('section[itemprop=author] div').animate({
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
			$(this).animate({
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

