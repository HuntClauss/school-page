<script lang="ts">

	import HamburgerMenu from "../compontent/HamburgerMenu.svelte";
	import InputBar from "../compontent/InputBar.svelte";
	import Carousel from "../compontent/Carousel.svelte";
	import {working_days} from '../global.d.ts'

	let filter = ''
	let selected_day = default_selection();

	function default_selection(): string {
		const curr_day = new Date().getDay()
		return 1 < curr_day < 6 ? working_days[curr_day - 1] : working_days[0]
	}

</script>

<div class="wrapper">
	<div class="navigation">
		<HamburgerMenu></HamburgerMenu>
	</div>
	<div class="filter-wrapper">
		<InputBar bind:value={filter}/>
	</div>
	<div class="day-selector">
		<Carousel keys="{working_days}" selected="{selected_day}"/>
	</div>
	<div class="horizontal-line"></div>
</div>

<style>

	.wrapper {
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.navigation {
		width: 100%;
		display: flex;
		justify-content: right;
		padding: 0.7rem;
		box-sizing: border-box;
	}

	.filter-wrapper {
		width: 100%;
		box-sizing: border-box;
		padding: 1rem;
		margin-bottom: 4rem;
	}

	.day-selector {
		display: flex;
	}

	.horizontal-line {
		width: 100%;
		height: 2px;
		background-color: #000;
		z-index: 0;
		position: absolute;
		bottom: 0;
	}

</style>