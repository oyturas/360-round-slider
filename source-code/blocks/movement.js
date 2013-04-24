(function($){
	'use strict';
	
	/**
	* get angle
	* @param {Object} self - 'this' object
	* @param {Object} point
	* @return {number}
	*/
	var get_angle = function(self, point){
	
		var radians = 0
			,left = self.circle.center_abs_left - point.left
			,top = self.circle.center_abs_top - point.top;
		
		//tan(radians) = y/x => radians = atan(y/x)
		radians = Math.atan(top/left); //in radians
		
		if(left>=0){
			radians += Math.PI;
		}
		
		return radians;
	};
	
	
	/**
	* get point
	* @param {Object} self - 'this' object
	* @param {number} radians
	* @return {Object}
	*/
	var get_point = function(self, radians){
	
		var point = new $.fn.round_slider.point(0, 0)
			,distance = self.circle.radius - self.weel_radius; 
			
		point.left = self.circle.radius * Math.cos(radians) + distance; 
		point.top = self.circle.radius * Math.sin(radians) + distance; 
		
		return point;
	};
	
	
	/**
	* get degrees
	* @param {Object} self - 'this' object
	* @param {number} radians
	* @return {number}
	*/
	var get_degrees = function(self, radians){
		
		var angle = Math.round(radians*180/Math.PI);
		
		if(angle>360){
			angle = angle % 360;
		}
		
		if(angle<0){
			angle = 360 + angle;
		}
		
		return angle;
	};
	
	
	/**
	* get radians
	* @param {Object} self - 'this' object
	* @param {number} degrees
	* @return {number}
	*/
	var get_radians = function(self, degrees){
		return degrees*Math.PI/180;
	};
		
	/**
	* init
	* @constructor
	* @param {Object} options
	* @param {Object} circle
	* @param {number} weel_radius
	* @return {Object}
	*/
	var init = function(options, circle, weel_radius){
		
		var self = {
			
			options: options
			,circle: circle
			,weel_radius: weel_radius
		};
		
		return $.extend(this, self);  
	};
	
	//API -------------------------------------------
	
	/**
	* get angle
	* @param {Object} point
	* @return {number}
	*/
	init.prototype.get_angle = function(point){
		return get_angle(this, point);
	};
		
	/**
	* get point
	* @param {number} radians
	* @return {Object}
	*/
	init.prototype.get_point = function(radians){
		return get_point(this, radians);
	};
	
	/**
	* get degrees
	* @param {number} radians
	* @return {number}
	*/
	init.prototype.get_degrees = function(radians){
		return get_degrees(this, radians);
	};
	
	/**
	* get radians
	* @param {number} degrees
	* @return {number}
	*/
	init.prototype.get_radians = function(degrees){
		return get_radians(this, degrees);
	};
	
	/** 
	* movement
	* @constructor
	* @param {Object} options
	* @param {Object} circle
	* @param {number} weel_radius
	* @return {Object}
	*/
	$.fn.round_slider.movement = function(options, circle, weel_radius){
		return new init(options, circle, weel_radius);
	};
	
})(jQuery);
