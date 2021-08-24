<template>
	<div class="displays mt-5 mb-3">
		<router-link
			tag="a"
			to="/flota"
			class="main-display hover-effect"
			:style="'background-image:url(' + require('@/assets/img/brands-models.png') + ')'"
		>
			<div class="content-block">
				<h1 class="title mb-3">
					Marcas y modelos disponibles
				</h1>
				<p class="lead-text mt-2">
					Tenemos un vehículo ideal para tu empresa
				</p>
			</div>
		</router-link>

		<div class="secondary-display">
			<a href="http://www.audi.com.uy?ref=lestido-renting" target="_blank" class="block">
				<div
					class="image background-contain hover-effect"
					style="background-size: 50%;"
					:style="'background-image:url(' + require('@/assets/img/audi-logo.png') + ')'"
				>
					<span>
						Ir a Audi en Uruguay
					</span>
				</div>
			</a>
			<a href="http://www.volkswagen.com.uy?ref=lestido-renting" target="_blank" class="block">
				<div
					class="image background-contain hover-effect"
					style="background-size: 50%;"
					:style="'background-image:url(' + require('@/assets/img/volkswagen-logo.png') + ')'"
				>
					<span>
						Ir a Volkswagen en Uruguay
					</span>
				</div>
			</a>
		</div>
	</div>
</template>
<style scoped>
.displays {
	display: flex;
	flex-direction: column;
}
.main-display {
	min-height: 540px;
	background-repeat: no-repeat;
	background-position: bottom right;
	/* height: 80vw; */
	padding: 18px;
	background-color: #f5f5f5;
	flex-grow: 5;
	flex-basis: 0;
	margin: 0px 0px 15px 0px;
}
.secondary-display {
	display: flex;
	flex-grow: 5;
	flex-basis: 0;
	flex-direction: row;
}
.secondary-display > .block {
	background-color: #f5f5f5;
	flex-grow: 1;
	background-repeat: no-repeat;
	background-position: center center;
}
.secondary-display > .block .image {
	background-repeat: no-repeat;
	background-position: center center;
	flex-grow: 1;
	width: 100%;
	height: 100%;
	min-height: 180px;
	position: relative;
}
.secondary-display > .block .image span {
	width: 100%;
	text-align: center;
	/* display: block; */
	position: absolute;
	bottom: 20px;
}

.secondary-display > .block:first-child {
	margin: 0px 15px 0px 0px;
}

@media (min-width: 991px) {
	.displays {
		flex-direction: row;
	}
	.main-display {
		margin: 0px 15px 0px 0px;
	}
	.secondary-display {
		display: flex;
		flex-grow: 2;
		flex-direction: column;
	}
	.secondary-display > .block:first-child {
		margin: 0px 0px 15px 0px;
	}
}

.content-block {
	/* max-width: 500px; */
	/* height: fit-content; */
}

.block {
	/* display: flex;
	flex-direction: column;
	background-repeat: no-repeat;
	background-position: right; */
}

.block .image {
	/* background-repeat: no-repeat;
	background-position: center center; */
	/* width: auto; */
	/* height: 80vw; */
	/* max-height: 780px; */
	/* display: grid; */
	/* align-items: flex-end; */
	/* padding: 18px; */
	/* flex-grow: 1; */
}

.block .content {
	/* display: flex;
	flex-basis: 0; */
}

.block.block-1 {
}

.block.block-2 {
	/* background: #f5f5f5; */
}

.block.block-2 .image {
	/* height: 100%; */
}
</style>
