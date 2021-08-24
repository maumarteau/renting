<template>
	<div class="d-flex section">
		<div class="block block-1 flex-grow-3" style="background-color:#fff">
			<div class="content flex-grow-2 mt-4 ">
				<div class="content-block">
					<h1 class="title mt-3">
						<strong>
							¿Necesitás ayuda?
						</strong>
					</h1>
					<h1 class="title  mt-2">
						<small>
							Contactanos y te asesoramos!
						</small>
					</h1>
					<router-link
						tag="a"
						to="/contacto"
						class="btn btn-primary mt-4"
					>
						Contactanos
					</router-link>
				</div>
			</div>
		</div>
		<div class="d-none d-md-flex flex-grow-6 flex-column ">
			<div class="block block-2 flex-grow-3">
				<div
					class="image background-cover hover-effect"
					:style="
						'background-image:url(' +
							require('@/assets/img/home-contact.jpg') +
							')'
					"
				></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.section {
	margin-top: 16px;
	margin-bottom: 16px;
}
.block {
	display: flex;
	flex-direction: column;
	background-repeat: no-repeat;
	background-position: right;
}

.block .image {
	background-repeat: no-repeat;
	background-position: center center;
	width: auto;
	height: 80vw;

	padding-bottom: 25vw;
	max-height: 780px;
	display: grid;
	align-items: flex-end;
	flex-grow: 1;
}
.block .image .title {
	color: #fff;
	font-size: 24px;
}
.block .content {
	display: flex;
	flex-basis: 0;

	padding: 18px;
}
.block .content .content-block {
	max-width: 500px;
	height: fit-content;
}

.block.block-1 {
	background-color: #f5f5f5;
}

.block.block-2 {
	background: #f5f5f5;
}

.block.block-2 .image {
	height: 100%;
}

@media (min-width: 991px) {
	.section {
		margin-top: 36px;
		margin-bottom: 36px;
	}
	.block {
		flex-direction: row;
	}

	.block-1 {
	}
}
</style>
