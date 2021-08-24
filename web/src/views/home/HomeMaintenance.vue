<template>
	<div class="d-flex section">
		<div class="d-none d-md-flex  flex-grow-3 flex-column mr-md-2">
			<div class="block block-2 flex-grow-3">
				<div
					class="image background-cover hover-effect"
					:style="'background-image:url(' + require('@/assets/img/service.jpg') + ')'"
				></div>
			</div>
		</div>

		<div class="block block-1 flex-grow-6 " style="background-color:#e1f2fa">
			<div class="content flex-grow-2 mt-4">
				<div class="content-block">
					<!-- <div class="badge text-white">MANTENIMIENTO</div> -->
					<h1 class="title mb-5 mt-3">
						<strong>Agendá tu mantenimiento</strong>
					</h1>
					<p class="lead-text mt-2">
						Mantené el vehículo en óptimo estado para asegurar su correcto funcionamiento.<br />
						<br />
						<br />
						<strong
							>Tené en cuenta que es muy importante programar tu mantenimiento antes de llegar al kilometraje de
							servicio.</strong
						>
					</p>
					<router-link tag="a" to="/agenda-mantenimiento" class="btn btn-primary mt-3">
						Agendar
					</router-link>
				</div>
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
}
</style>
