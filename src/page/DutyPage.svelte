<script lang="ts">

	import HamburgerMenu from "../compontent/HamburgerMenu.svelte";
	import InputBar from "../compontent/InputBar.svelte";
	import Carousel from "../compontent/Carousel.svelte";
	import {working_days} from '../const'
	import type {ITouchCtx} from "../types";
	import {onMount} from "svelte";
	import {duties_accu} from "../store"
	import DayPlan from "../compontent/DayPlan.svelte";

	let filter = ''
	let panel_index = default_selection()
	let _duties_ref = new Array(5)
	let div: HTMLElement
	let meta = {position: 0, distance: 0}

	$: changePlan(panel_index)

	function default_selection(): number {
		const curr_day = new Date().getDay()
		return (1 < curr_day && curr_day < 6) ? curr_day - 1 : 2
	}

	let offsets = new Array(working_days.length)
	function setup_offsets() {
		_duties_ref.forEach((ref, i) => {
			offsets[i] = - (ref.offsetLeft - parseInt(ref.style.left))
		})
	}

	function setup_transition() {
		_duties_ref.forEach(ref => {
			ref.style.transition = 'all .2s ease-out'
		})
	}

	function changePlan(index: number) {
		if (!_duties_ref[index]) return

		_duties_ref.forEach(ref => {
			ref.style.left = `${offsets[index]}px`
		})
	}


	onMount(async () => {
		const pos = -_duties_ref[panel_index].offsetLeft
		_duties_ref.forEach(ref => {
			ref.style.left = `${pos}px`
		})
		setup_offsets()
		setup_transition()

		const resp = await fetch('/data/duties.json')
		$duties_accu = await resp.json()
	})

	const touch_ctx: ITouchCtx = {start: 0, start_time: 0, boundaries: [], moving: false}
	function touch_start(e: TouchEvent) {
		touch_ctx.start = e.touches.item(0).clientX
		touch_ctx.start_time = e.timeStamp

		meta.position = 0
		meta.distance = offsets[0] - offsets[1]

		_duties_ref.forEach((ref, i) => {
			ref.style.transition = ''
			touch_ctx.boundaries[i] = ref.offsetLeft
		})
	}

	function touch_move(e: TouchEvent) {
		const pos = e.touches.item(0).clientX
		const v_c = -(touch_ctx.start - pos - offsets[panel_index])
		const v_i = -(touch_ctx.start - pos)

		if (touch_ctx.moving || Math.abs(touch_ctx.start - pos) > 30) {
			touch_ctx.moving = true
			meta.position = v_i
			_duties_ref.forEach(ref => {
				ref.style.left = `${v_c}px`
			})
		}
	}

	function touch_end(e: TouchEvent) {
		touch_ctx.moving = false

		let direction = 0
		if (e.changedTouches.length !== 0 && e.timeStamp - touch_ctx.start_time < 150) {
			direction = touch_ctx.start - e.changedTouches.item(0).clientX
		}


		const left = touch_ctx.boundaries[panel_index - 1]
		const mid = _duties_ref[panel_index].offsetLeft
		const right = touch_ctx.boundaries[panel_index + 1]

		const center = window.innerWidth * 0.75 // bigger number = more gentle transition from cards

		let pos = offsets[panel_index]
		if (panel_index != working_days.length - 1 && (mid - center < -right || direction > 25)) {
			pos = offsets[++panel_index]
			console.log(pos, "change to right")
		} else
		if (panel_index !== 0 && (mid + center > -left || direction < -25)) {
			pos = offsets[--panel_index]
			console.log("change to left")
		} else {
			meta.position = 0
		}


		_duties_ref.forEach(ref => {
			ref.style.transition = 'all .2s ease-out'
			ref.style.left = `${pos}px`
		})
	}
</script>

<div class="wrapper">
	<div class="filter-wrapper">
		<InputBar bind:value={filter}/>
	</div>
	<div class="day-selector">
		<Carousel keys="{working_days}" bind:selected="{panel_index}" meta="{meta}"/>
	</div>
	<div class="plan-wrapper"
	     bind:this={div}
	     on:touchmove={touch_move} on:touchstart={touch_start} on:touchend={touch_end}>
		{#each new Array(working_days.length) as _, day}
			<div class="duties" bind:this={_duties_ref[day]}>
				<DayPlan day="{day}"/>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.plan-wrapper {
		display: flex;
		justify-content: center;
		overflow-x: hidden;
		height: 100%;
		scrollbar-width: none;
		background-color: var(--background);

		&::-webkit-scrollbar {
			display: none;
		}
	}

	.duties {
		position: relative;
		min-width: 100vw;
		margin-right: 2rem;

		&:last-child {
			margin-right: 0;
		}
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		height: 100%;
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

</style>