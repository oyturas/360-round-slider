(function($){
	'use strict';
	
	/**
    * jQuery definition to anchor JsDoc comments.
    * @see <a href='http://jquery.com/' title='' target='_blank'>jquery.com</a>
    * @name jQuery
    * @class jQuery Library
    */
	 
	/**
    * jQuery 'fn' definition to anchor JsDoc comments.
    * @see <a href='http://jquery.com/' title='' target='_blank'>jquery.com</a>
    * @name fn
    * @class jQuery Library
    * @memberOf jQuery
    */	
	
	/**
	* get angle
	* @param {Object} self - 'this' object
	* @return {number} - angle
	*/
	var get_angle = function(self){
		return self.current_handle_angle_degrees;
	};
				
	/**
	* get min
	* @param {Object} self - 'this' object
	* @return {number}
	*/
	var get_min = function(self){
		if(self.options.list.length > 0){
			return self.options.list[0];
		}
		else{
			return self.options.min;
		}
	};

	/**
	* get max
	* @param {Object} self - 'this' object
	* @return {number}
	*/
	var get_max = function(self){
		if(self.options.list.length > 0){
			return self.options.list[self.options.list.length-1];
		}
		else{
			return self.options.max;
		}
	};

	/**
	* get number
	* @param {Object} self - 'this' object
	* @return {number}
	*/
	var get_num = function(self){
		if(self.options.list.length > 0){
			return self.options.list.length;
		}
		else{
			return self.options.max - self.options.min + 1;
		}
	};
	
	/**
	* get index
	* @param {Object} self - 'this' object
	* @return {number}
	*/
	var get_index = function(self){
		return Math.round(self.current_handle_angle_degrees*(self.num)/360);		
	};		
	
	/**
	* get value
	* @param {Object} self - 'this' object
	* @return {number}
	*/
	var get_value = function(self){
	
		var index = get_index(self);
		if(self.options.list.length > 0){
			return self.options.list[index];
		}
		else{
			return index + self.options.min;
		}
	};
	
	/**
	* update handle position
	* @param {Object} self - 'this' object
	* @param {Object} point
	*/
	var update_handle_position = function(self, point){
		self.container.handle.css('left', point.left);		
		self.container.handle.css('top', point.top);
	};
	
	/**
	* change handle position
	* @param {Object} self - 'this' object
	* @param {Object} new_handle_point
	* @param {number} degrees_angle
	*/
	var change_handle_position = function(self, new_handle_point, degrees_angle){
				
		//update css handle position
		update_handle_position(self, new_handle_point);
		
		if(degrees_angle == 360){
			degrees_angle = 0;
		}
		
		//update current angle
		self.current_handle_angle_degrees = degrees_angle;
		
		//cgange value	
		self.value = get_value(self);
					
		//set value in the input field
		self.container.input_field.val(self.value + self.options.unit_sign); //'\u00b0'
		
		//calback
		if($.isFunction(self.options.angle_changed_callback)){
			self.options.angle_changed_callback(get_value(self), get_index(self), degrees_angle, self.options.unit_sign); //value, index, angle, unit
		}
	};
	
	/**
	* jump
	* @param {Object} self - 'this' object
	* @param {number} degrees_angle
	*/
	var jump = function(self, degrees_angle){
		
		var new_handle_point
			,radians_angle;
		
		radians_angle = self.movement.get_radians(degrees_angle);
		new_handle_point = self.movement.get_point(radians_angle);
		
		//update handle position
		change_handle_position(self, new_handle_point, degrees_angle);
	};
	
	/**
	* jump to value
	* @param {Object} self - 'this' object
	* @param {number} val
	*/
	var jump_value = function(self, val){
	
		var degrees;
		
		for(var i=0; i<self.options.list.length; i++){
		
			if(val === self.options.list[i]){
				degrees = i*360/self.num;
				self.jump(self, degrees);
			}
		}
	};
			
	/**
	* init
	* @param {Object} options - user options
	* @param {jQueryObject} root 
	* @return {Object} - 'this' object
	* @constructor 
	*/
	var init = function(options, root){
	
		var self = {
			options: null
			,root: root
			,value: null
			,num: null
			,current_handle_angle_degrees: null
			
			//const
			,keys: {ENTER:13, LEFT:37, UP:38, RIGHT:39, DOWN:40}
			
			//classes
			,container: null
			,circle: null
			,drag: null
			,movement: null
		};
		
		self.options = $.extend({	
			min: 0
			,max: 359
			,list: []
			
			,bg: null
			,handle_bg: null
			,input_bg: null
			,points_bg: null
			,show_points: true
			
			,current_handle_angle_degrees: 0
			,angle_changed_callback: null
			
			,unit_sign: '' //%, px, \u00b0
		},options);	
		
		//init container instance
		self.container = new $.fn.round_slider.container(self.options, self.root, function(container_data){
		
			//get vars
			self.value = get_min(self);
			self.num = get_num(self);

			
			//init circle instance
			self.circle = new $.fn.round_slider.circle(container_data.abs_left + container_data.radius,
													   container_data.abs_top + container_data.radius,
													   container_data.radius);
													   
			//init movement instance
			self.movement = new $.fn.round_slider.movement(self.options, self.circle, container_data.handle_radius);	
			
			//init drag
			self.drag = new $.fn.round_slider.drag(self.options, container_data.handle, function(e){
				
				var mouse_point
					,radians
					,new_handle_point
					,degrees_angle
					,unit;
				
				//create point for mouse position
				mouse_point = new $.fn.round_slider.point(e.pageX, e.pageY);
				
				//get radians to rotate the handle
				radians = self.movement.get_angle(mouse_point);
				unit = Math.round(self.movement.get_degrees(radians)*(self.num)/360)*360/(self.num);						
				radians = self.movement.get_radians(unit);
				
				//get the new handle point
				new_handle_point = self.movement.get_point(radians);				
				
				//update current radians
				degrees_angle = self.movement.get_degrees(radians);				
				
				//update handle position
				change_handle_position(self, new_handle_point, degrees_angle);
			});
			
			//init start handle position
		    jump(self, 0);
				
			//init start input field value
			container_data.input_field.val(get_min(self) + self.options.unit_sign); 
		});
				
		return $.extend(this, self);  
	};
	
	//API -------------------------------------------
	
	/**
	* jump
	* @param {number} degrees_angle
	*/
	init.prototype.jump = function(degrees_angle){
		jump(this, degrees_angle);
	};
	
	/**
	* jump to value
	* @param {number} val
	*/
	init.prototype.jump_value = function(self, val){
		jump_value(self, val);
	};
	
	/** 
	* 360 round slider
	* @param {Object} user_options - user options
	* @name round_slider
    * @class round_slider
    * @memberOf jQuery.fn	
	*/
	$.fn.round_slider = function(user_options){
		
		return this.each(function(){
			
			var self; 
			
			self = new init(user_options, $(this));
						
			return self;	
		});
	};
})(jQuery);