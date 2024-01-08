<template>
	<svg width="100%" height="100%" opacity="0.07" class="noise">
		<defs>
			<filter
				id="nnnoise-filter"
				x="-20%"
				y="-20%"
				width="140%"
				height="140%"
				filterUnits="objectBoundingBox"
				primitiveUnits="userSpaceOnUse"
				color-interpolation-filters="linearRGB"
			>
				<feTurbulence
					type="turbulence"
					baseFrequency="0.1"
					numOctaves="4"
					seed="15"
					stitchTiles="stitch"
					x="0%"
					y="0%"
					width="100%"
					height="100%"
					result="turbulence"
				></feTurbulence>
				<feSpecularLighting
					surfaceScale="13"
					specularConstant="0.8"
					specularExponent="20"
					lighting-color="#f3f3f3"
					x="0%"
					y="0%"
					width="100%"
					height="100%"
					in="turbulence"
					result="specularLighting"
				>
					<feDistantLight azimuth="3" elevation="8"></feDistantLight>
				</feSpecularLighting>
			</filter>
		</defs>
		<rect width="100%" height="100%" fill="transparent" rx="15"></rect>
		<rect fill="#737373" width="100%" height="100%" filter="url(#nnnoise-filter)" rx="15"></rect>
	</svg>
</template>
<style scoped>
.noise {
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	pointer-events: none;
}
.noise rect {
	position: absolute;
	top: 0;
}
</style>
