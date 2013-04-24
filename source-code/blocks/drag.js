(function($){
	'use strict';

	/** 
	* drag
	* @constructor
	* @param {Object} options
	* @param {Object} item
	* @param {Function} callback
	* @return {Object}
	*/
	$.fn.round_slider.drag = function(options, item, callback){
		
		var self = {
			
			callback: callback
			
			//flags
			,is_mousedown: false
			,is_mousemove: false
		};
		
		//init events
		item.mousedown(function(e){
			self.is_mousedown = true;
			return false;
		});
		
		$(document).mousemove(function(e){
			if(self.is_mousedown && $.isFunction(self.callback)){					
				self.callback(e);
				return false;
			}
		});
		
		$(document).mouseup(function(e){
			self.is_mousedown = false;
			return false;
		});			
		
		return self;
	};
	
})(jQuery);
