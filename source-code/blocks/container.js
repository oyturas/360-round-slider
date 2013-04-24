(function($){
	'use strict';
	
	/**
	* init handle css
	* @param {Object} self - 'this' object
	* @param {Object} img
	*/
	var init_handle_css = function(self, img){
					
		self.handle.css('width', img.width);
		self.handle.css('height', img.width);
		self.handle.css('border', '0px');
		self.handle.css('background-image', 'url(' + img.src + ')');
		
		self.handle.css('position', 'absolute');
		self.handle.css('cursor', 'move');
		
		//callback
		loaded(self);
	};
		
	/**
	* init points css
	* @param {Object} self - 'this' object
	* @param {Object} img
	*/
	var init_points_css = function(self, img){
					
		self.points.css('position', 'relative');
		self.points.css('background', 'url(' + img.src + ') no-repeat center center');
		
		//callback
		loaded(self);
	};
		
	/**
	* init circle css
	* @param {Object} self - 'this' object
	* @param {Object} img
	*/
	var init_circle_css = function(self, img){
		
		self.circle.css('width', img.width);
		self.circle.css('height', img.width);			
		self.circle.css('position', 'relative');
		self.circle.css('background-image', 'url(' + img.src + ')');
		
		//points
		self.points.css('width', img.width);
		self.points.css('height', img.width);
		
		//callback
		loaded(self);
	};
		
	/**
	* init input css
	* @param {Object} self - 'this' object
	* @param {Object} img
	*/
	var init_input_css = function(self, img){
			
		var left = self.radius - img.width/2;
		var top = self.radius - img.height/2;
		
		//update css
		self.input_field.css('left', left);
		self.input_field.css('top', top);
		self.input_field.css('position', 'absolute');
		
		self.input_field.css('width', img.width);
		self.input_field.css('height', img.height);
		self.input_field.css('background', 'transparent url(' + img.src + ')');
		self.input_field.css('border', '0px');
		self.input_field.css('padding', '0');			
		self.input_field.css('text-align', 'center');
		
		//callback
		loaded(self);
	};
		
	/**
	* preload
	* @param {Object} self - 'this' object
	* @param {string} img_path
	* @param {Function} callback_func
	*/
	var preload = function(self, img_path, callback_func){
		
		var img = new Image();
		
		$(img).load(function(){				
			if($.isFunction(callback_func)){								
				callback_func(img);
			}				
		});
		
		$(img).attr('src', img_path);
		//self.images_list.push(img);
	};
		
	/**
	* call callback if loaded
	* @param {Object} self - 'this' object
	*/
	var loaded = function(self){
	
		if(self.handle_img_loaded &&
		   self.circle_img_loaded &&
		   self.input_img_loaded &&
		   self.points_img_loaded &&
		   $.isFunction(self.callback)){
		   
			self.callback(self);
		}
	};
	
	/**
	* init
	* @constructor 
	* @param {Object} options
	* @param {jQueryObject} jq_el
	* @param {Function} callback
	* @return {Object}
	*/
	var init = function(options, jq_el, callback){
	
		var self = {
			
			options: options
			,jq_el: jq_el
			,callback: callback
			
			,circle: null
			,handle: null
			,input_field: null
			,abs_left: jq_el.offset().left
			,abs_top: jq_el.offset().top
			,radius: 0
			,handle_radius: 0
			
			//flags
			,handle_img_loaded: false
			,circle_img_loaded: false
			,input_img_loaded: false
			,points_img_loaded: false
		};
		
		//add html
		self.jq_el.html('<div class="round-slider"><div class="round-slider-points"><div class="round-slider-handle"></div><input type="text" class="round-slider-input" value="0"/></div></div>');
		
		//init vars
		self.circle = self.jq_el.find('.round-slider');
		self.handle = self.jq_el.find('.round-slider-handle');
		self.input_field = self.jq_el.find('.round-slider-input');
		self.points = self.jq_el.find('.round-slider-points');
		
		//init circle
		preload(self, self.options.bg, function(img){
			
			self.circle_img_loaded = true;
			self.radius = img.width/2;
			init_circle_css(self, img);	

			//init input
			preload(self, self.options.input_bg, function(img){
			
				self.input_img_loaded = true;
				init_input_css(self, img);
				
				if(self.options.show_points){
				
					//init points
					preload(self, self.options.points_bg, function(img){
						
						self.points_img_loaded = true;
						init_points_css(self, img);	


						//init handle
						preload(self, self.options.handle_bg, function(img){
						
							self.handle_img_loaded = true;
							self.handle_radius = img.width/2;
							init_handle_css(self, img);
						});						
					});	
				}
				else{
					self.points_img_loaded = true;
					
					//init handle
					preload(self, self.options.handle_bg, function(img){
					
						self.handle_img_loaded = true;
						self.handle_radius = img.width/2;
						init_handle_css(self, img);
					});	
				}
						
			});		
		});				
		
		return jQuery.extend(this, self); 	
	};

	
	/** 
	* container
	* @constructor
	* @param {Object} options
	* @param {jQueryObject} jq_el
	* @param {Function} callback
	* @return {Object}
	*/
	$.fn.round_slider.container = function(options, jq_el, callback){
		
		var self;
		
		self = new init(options, jq_el, callback);
		
		//return api object
		return self;
	};
	
})(jQuery);
