<template>
	<svg class="artwork">
	<defs>
		<linearGradient id="e" x1="0" :y1="0" :x2="y_width" :y2="x_height" gradientUnits="userSpaceOnUse">
			<stop stop-color="#fff" offset="0" />
			<stop stop-color="transparent" offset="0.5" />
			<stop stop-color="#fff" offset="1" />
		</linearGradient>
	</defs>
		<path :d="path" stroke="url(#e)" :stroke-width="strokeWidth" fill="transparent"></path>
	</svg>
</template>

<style scoped>

	.artwork{
		position: absolute;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		opacity: 0.4;
	}

</style>
<script>
import Vue from 'vue' 

export default {
    props: {
        seed: {
            default: 2,
            type: Number
        },
    },
	data(){
		return {
			path: '',
			wavelength: window.innerWidth/this.seed,
			xOffset: 0,
			y_loc: window.innerHeight/4,
			y_width: window.innerWidth,
			x_height: window.innerHeight,
			frequency: 3 * (6-this.seed),
			path_tail: null,

			strokeWidth: (this.seed%3 + 1)*2
		}
	},
	methods: {
		
		draw: function(){
			let vm = this;
			if(vm.frequency > 0) vm.xOffset += (+vm.frequency);

			let _wavelength = vm.wavelength;
			if(vm.xOffset >= _wavelength*2) vm.xOffset = 0;

			let _y = vm.y_loc;

			let _path = [];

			_path.push(['M', vm.xOffset- _wavelength*4, _y].join(' '));
			if(vm.path_tail == null){
				vm.redraw_tail();
			}

			_path.push(vm.path_tail);
			vm.path = _path.join(' ');

			requestAnimationFrame(vm.draw);
		},
		redraw_tail: function(){

			let vm = this;
			let _wavelength = vm.wavelength;
			let _y = vm.y_loc;

			let _path_tail = [];
			_path_tail.push(['q', _wavelength/2, 0, _wavelength, _y].join(' '));

			for (var i = (vm.y_width/_wavelength) + 3; i >= 0; i--) {
				_path_tail.push(['t', _wavelength, 0].join(' '));
			}
			vm.path_tail = _path_tail.join(' ');
		}
	},
	watch: {
		wavelength: function(){ this.redraw_tail() },
		frequency: function(){ this.redraw_tail() },
	},
	mounted: function(){
		this.draw();
	}
}
</script>