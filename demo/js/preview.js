(function($){
	'use strict';
	
	/**
	* set html
	* @param {string} value
	* @param {number} index
	* @param {number} angle
	* @param {string} unit
	* @return {string} html
	*/
	var set_html = function(value, index, angle, unit){
	
		var html = ''
			,val = value;
		
		if(unit !== ''){
			val += unit;
		}
		
		html += '<b>Value: </b>' + val + '<br/>';
		html += '<b>Index: </b>' + index + '<br/>';
		html += '<b>Angle: </b>' + angle + '<br/>';
		
		return html;
	};
		
	/**
	* on dom ready
	*/
	$('document').ready(function(){			
		
		var self = {
			months: null
			,compass: null
			,horoscope: null
			,percent: null
			,seconds: null
			,degrees: null
		};
		
		self.months = $('#months').round_slider({
			list: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			
			bg: 'img/bg/sky-150.png',
			handle_bg: 'img/handles/sun.png',
			input_bg: 'img/input/white-80-20-round.png',
			points_bg: 'img/points/white-122.png',
			
			angle_changed_callback: function(value, index, angle, unit){
				$('#months-data').html(set_html(value, index, angle, unit));
			}
		});
		
		//self.months.jump_value('May');
		
		self.compass = $('#compass').round_slider({
			list: ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'],
			
			bg: 'img/bg/globe.png',
			handle_bg: 'img/handles/compass.png',
			input_bg: 'img/input/black-80-20.png',
			points_bg: 'img/points/black-150.png',
			
			angle_changed_callback: function(value, index, angle, unit){
				$('#compass-data').html(set_html(value, index, angle, unit));
			}
		});
				
		self.horoscope = $('#horoscope').round_slider({
			list: ['Capricorn', 'Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius'],
			
			bg: 'img/bg/space.png',
			handle_bg: 'img/handles/horoscope.png',
			input_bg: 'img/input/white-80-20-round.png',
			points_bg: 'img/points/white-122.png',
			
			angle_changed_callback: function(value, index, angle, unit){
				$('#horoscope-data').html(set_html(value, index, angle, unit));
			}
		});
		
		self.percent = $('#percent').round_slider({
			min: 1,
			max: 100,
			unit_sign: '%',
			
			bg: 'img/bg/chart.png',
			handle_bg: 'img/handles/chart.png',
			input_bg: 'img/input/round-50.png',
			points_bg: 'img/points/white-122.png',
			
			angle_changed_callback: function(value, index, angle, unit){
				$('#percent-data').html(set_html(value, index, angle, unit));
			}
		});

		self.seconds = $('#seconds').round_slider({
			min: 1,
			max: 60,
			unit_sign: ' sec',
			
			bg: 'img/bg/clock.png',
			handle_bg: 'img/handles/compass.png',
			input_bg: 'img/input/round-black-50.png',
			points_bg: '',
			show_points: false,
			
			angle_changed_callback: function(value, index, angle, unit){
				$('#seconds-data').html(set_html(value, index, angle, unit));
			}
		});
		
		self.degrees = $('#degrees').round_slider({
			min: 0,
			max: 359,
			unit_sign: '\u00b0',
			
			bg: 'img/bg/degrees-theme.png',
			handle_bg: 'img/handles/wheel-33-33.png',
			input_bg: 'img/input/round-50.png',
			points_bg: 'img/points/degress-white.png',
			
			angle_changed_callback: function(value, index, angle, unit){
				$('#degrees-data').html(set_html(value, index, angle, unit));
			}
		});
	});
	
})(jQuery);
