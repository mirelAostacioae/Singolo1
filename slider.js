var Slider = function ( wrapper , nav_bar, pageWidth, speedFadeOut, speedSlide, speedFadeIn) {
	// body...

	this._initialize(wrapper, pageWidth);

	this.slider.children().css('max-width', pageWidth);
	this.numberPages = this.slider.children().length;

	this.totalWidth = this.pageWidth * this.numberPages;
	this.slider.css('max-width', this.totalWidth);
	this.nav_bar = nav_bar;
	this.wrapper.css('max-width', this.pageWidth);
	this.index = 0;	
	this.speedFadeOut = speedFadeOut;
	this.speedSlide = speedSlide;
	this.speedFadeIn = speedFadeIn;

}


Slider.prototype.slide = function( direction ) {
	this.direction = direction;
	
	this._fadeOut();

};

Slider.prototype._initialize = function (wrapper , pageWidth) {
	
	this.pageWidth = pageWidth;
	this.wrapper = wrapper;
	this.slider = this.wrapper.children('div.slider');
	var length = this.slider.children().length;

	this.slider.children().first().clone().insertAfter(this.slider.children().eq(length - 1));
};

Slider.prototype._update = function() {

	if(this.direction === 'prev') {

		if (this.index === 0) {
			this.slider.css('marginLeft', - (this.numberPages-1) * this.pageWidth);
			this._decrement();
		};
		this._decrement();
	} else{
		if (this.index === this.numberPages - 1 ) {
			this.slider.css('marginLeft', 0);
			this._increment();
		};
		this._increment();
	}	
};
Slider.prototype._increment = function() {
	// body...
	this.index = (this.index + 1) % this.numberPages;
};
Slider.prototype._decrement = function() {

	this.index--;
	if (this.index < 0 ) this.index = this.numberPages - 1;
};
Slider.prototype._fadeOut = function() {
	console.log(this.dir);

	this.slider.children().eq(this.index).children().animate({
		opacity: 0
	}, this.speedFadeOut, this._slideTo.bind(this))
};
Slider.prototype._slideTo = function(  ) {
	
	this._update();
	this.slider.animate({

		marginLeft: - this.index * this.pageWidth
	
	}, this.speedSlide, this._fadeIn.bind(this))
}
Slider.prototype.slideTo = function( dir ) {
	this.direction = dir;
	this._update();
	this.slider.animate({

		marginLeft: - this.index * this.pageWidth
	
	}, this.speedSlide)
}

Slider.prototype._fadeIn = function() {
	
	this.slider.children().eq(this.index).children().animate({
		opacity: 1
	}, this.speedFadeIn)

};

Slider.prototype._getWidthandHeight = function() {
	// body...
	var myArray = new Array();
	for(var i = 0; i < this.numberPages - 1 ; i++)
	{
		myArray.push({
			width: this.slider.children().eq(i).children().width(),
			height: this.slider.children().eq(i).children().height()
		})
	}
	myArray.push({
		width: this.slider.children().eq(0).children().width(),
		height: this.slider.children().eq(0).children().height()
	})
	console.log(myArray);
	return myArray;
};


getRandColor = function() {
  var r = parseInt(Math.random() * 255),
  g = parseInt(Math.random() * 255),
  b = parseInt(Math.random() * 255);
  return 'rgb('+ r +','+ g +','+ b +')';
}


// function toggleMenuBar () {
	
// 	if(active) { 
// 	$('.header-nav').children('a').removeClass('inactive-nav-bar')
// 								.addClass('active-nav-bar');
// 	var hh = $('.header-nav').children('a').height() * $('.header-nav').children('a').length 							
// 	$("header").css('height', 90 + hh );

// } else {
	
// 	$('.header-nav').children('a').addClass('inactive-nav-bar')
// 								.removeClass('active-nav-bar');
// 	$("header").css('height', 90);
// }
// active = !active;
// }
	    	
	    								
// function resizeHeight () {
	
// 	if($(window).width() > 600){
// 		$("header").css('height', 90);
// 		$('.header-nav').children('a').addClass('inactive-nav-bar')
// 									  .removeClass('active-nav-bar');
// 		active = true;
// 	}
// }

var AdapptiveHeader = function ( header_nav, activeClass, inactiveClass , defaultHeaderHeight) {


	this.defaultHeaderHeight = defaultHeaderHeight;
	this.header = $('header');
	this.header_nav = header_nav;
	this.activeClass = activeClass;
	this.inactiveClass = inactiveClass;
	this.active = true;
	this.children = this.header_nav.children('a');
	console.log('this is length' + this.children.length);
	
	// this.resizeHeight();
};
AdapptiveHeader.prototype.toggleMenuBar = function() {
	
	if(this.active) { 

	console.log(this.children);
	this.children.removeClass(this.inactiveClass)
				 .addClass(this.activeClass);
	this.headerHeight = this.children.height() * this.children.length;					
	this.header.css('height', this.defaultHeaderHeight + this.headerHeight );

	} else {
		
		this.children.addClass(this.inactiveClass)
					 .removeClass(this.activeClass);
		this.header.css('height', this.defaultHeaderHeight);
	}
	this.active = !this.active;
	
};

AdapptiveHeader.prototype.resizeHeight = function() {
	// body...

	if($(window).width() > 600){
		this.header.css('height', this.defaultHeaderHeight);
		this.children.addClass(this.inactiveClass)
					 .removeClass(this.activeClass);
		this.active = true;
	}

};
