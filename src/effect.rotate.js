/**
* @author Daniel Holzmann http://d.velopment.at
* @copyright 2011
* @package Rotation Effects for Script.aculo.us
* @license GPL
* @dependencies prototype.js 1.5.1+, scriptaculous.js (effects.js)
*/

/* This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

Effect.Rotate = Class.create();
Object.extend(Object.extend(Effect.Rotate.prototype, Effect.Base.prototype), {
	initialize: function (element) {
		this.element = $(element);
		var options = Object.extend({
			degrees: 90,
			mode: 'relative'
		}, arguments[1] || {} );
		this.start(options);
	},
	setup: function() {
		this.element._rotation = this.element._rotation || 0;
		this.transformProperty = false;
		this.startRotation = (this.options.mode == 'relative') ? this.element._rotation : 0;
		
		var properties = [
				'transform',
				'WebkitTransform',
				'MozTransform',
				'msTransform',
				'OTransform'
				];
	
		var p;
	
		while (p = properties.shift()) {
			if (typeof this.element.style[p] != 'undefined') {
				this.transformProperty = p;
				break;
			}
		}
	},
	update: function(position) {
		var currentDegrees = this.startRotation + Math.ceil(this.options.degrees * position);
  	this.element._rotation = currentDegrees;
  	var property = 'rotate(' + currentDegrees + 'deg)';
		if (this.transformProperty) {
			this.element.style[this.transformProperty] = property;
		}
		if (this.element._rotation > 360)
			this.element._rotation -= 360;
		if (this.element._rotation < -360)
			this.element._rotation += 360;
	}
});