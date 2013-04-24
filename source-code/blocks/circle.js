(function($){
	'use strict';

	/** 
	* circle
	* @constructor
	* @param {number} center_abs_left
	* @param {number} center_abs_top
	* @param {number} radius
	* @return {Object}
	*/
	$.fn.round_slider.circle = function(center_abs_left, center_abs_top, radius){
		
		var self = {
			center_abs_left: center_abs_left
			,center_abs_top: center_abs_top
			,radius: radius
			,center_relative_left: null
			,center_relative_top: null
		};
		
		//init vars
		self.center_relative_left = self.radius/2;
		self.center_relative_top = self.radius/2;
		
		return self;
	};
	
})(jQuery);
