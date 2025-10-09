<template>
	<div class="d-flex section">
		<div class="block block-1 flex-grow-6 " style="background-color:#fff3e0">
			<div class="content flex-grow-2 mt-4">
				<div class="content-block">
					<h1 class="title mb-5 mt-3">
						<strong>Vehículos en venta</strong>
					</h1>
					<p class="lead-text mt-2">
						Encontrá tu próximo vehículo en nuestra selección de autos usados de calidad.<br />
						<br />
						<br />
						<strong
							>Todos nuestros vehículos cuentan con garantía y están en excelente estado de mantenimiento.</strong
						>
					</p>
					<router-link tag="a" to="/venta-de-usados" class="btn btn-primary mt-3">
						Ver Vehículos
					</router-link>
				</div>
			</div>
		</div>

		<div class="d-none d-md-flex  flex-grow-3 flex-column ml-md-2">
			<div class="block block-2 flex-grow-3">
				<div
					class="image background-cover hover-effect"
					:style="'background-image:url(' + require('@/assets/img/home2.jpg') + ')'"
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
	max-height: 780px;
	display: grid;
	align-items: flex-end;
	padding: 18px;
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
	/* max-width: 500px; */
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
}
</style>

