(function($){
	'use strict';

	/** 
	* point
	* @constructor
	* @param {number} left
	* @param {number} top
	* @return {Object}
	*/
	$.fn.round_slider.point = function(left, top){
		
		var self = {
			left: left
			,top: top
		};
		
		return self;
	};
	
})(jQuery);
