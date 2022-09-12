<script lang="ts">

	import HamburgerMenu from "../compontent/HamburgerMenu.svelte";
	import InputBar from "../compontent/InputBar.svelte";
	import Carousel from "../compontent/Carousel.svelte";
	import {ITouchCtx, times, working_days} from '../const'
	import ExpandList from "../compontent/ExpandList.svelte";
	import {onMount} from "svelte";
	import {duties_accu} from "../store"

	let filter = ''
	let selected_index = default_selection()
	let _duties_ref = new Array(3)
	let div: HTMLElement
	let block = false

	$: change_day(selected_index)

	function default_selection() {
		const curr_day = new Date().getDay()
		return (1 < curr_day && curr_day < 6) ? curr_day - 1 : 2
	}

	function change_day(index: number) {
		if (!_duties_ref[index]) return
	}

	onMount(async () => {
		const resp = await fetch('/data/duties.json')
		$duties_accu = await resp.json()
	})

	const touch_ctx: ITouchCtx = {start: undefined, boundaries: [], index: 0, width: 0}
	function touch_start(e: TouchEvent) {
		touch_ctx.width = _duties_ref[1].clientWidth
		touch_ctx.start = e.touches.item(0).clientX
		touch_ctx.index = selected_index
		for (let i = 0; i < 3; i++) {
			touch_ctx.boundaries[i] = _duties_ref[i].offsetLeft
			_duties_ref[i].style.transition = ''
		}
	}

	const margin = 160
	function touch_move(e: TouchEvent) {
		const pos = e.touches.item(0).clientX
		// console.log('change', touch_ctx.start - pos)
		const v_c = - (touch_ctx.start - pos)
		for (let i = 0; i < 3; i++) {
			_duties_ref[i].style.left = `${v_c}px`
		}

		console.log(_duties_ref[1].offsetLeft, touch_ctx.width / 2)


		// if (touch_ctx.boundaries[0] >= _duties_ref[1].offsetLeft) {
		// 	selected_index = touch_ctx.index + 1
		// 	// console.log('change page')
		// }
	}

	function touch_end(e: TouchEvent) {
		console.log('end', e)
		touch_ctx.start = undefined

		let pos = 0
		if (_duties_ref[1].offsetLeft < -touch_ctx.width / 2) {
			pos = -touch_ctx.width
		} else
		if (_duties_ref[1].offsetLeft > touch_ctx.width / 2) {
			pos = touch_ctx.width
		} else {
			// pos =
		}

		for (let i = 0; i < 3; i++) {
			_duties_ref[i].style.transition = 'all .2s ease-out'
			_duties_ref[i].style.left = `${pos}px`
		}

	}

	// function boundaryCheck(curr: number, start: number, width: number, margin: number): boolean {
	// 	return (curr )
	// }

</script>

<div class="wrapper">
	<div class="navigation">
		<HamburgerMenu></HamburgerMenu>
	</div>
	<div class="filter-wrapper">
		<InputBar bind:value={filter}/>
	</div>
	<div class="day-selector">
		<Carousel keys="{working_days}" bind:selected="{selected_index}" bind:block={block}/>
	</div>
	<div class="plan-wrapper" bind:this={div} on:touchmove={touch_move} on:touchstart={touch_start} on:touchend={touch_end}>
		<div class="duties" bind:this={_duties_ref[0]}>
			{#each Object.keys(times) as _, time}
				<ExpandList dayKey={selected_index - 1} timeKey="{time}"/>
			{/each}
		</div>
		<div class="duties" bind:this={_duties_ref[1]}>
			{#each Object.keys(times) as _, time}
				<ExpandList dayKey={selected_index} timeKey="{time}"/>
			{/each}
		</div>
		<div class="duties" bind:this={_duties_ref[2]}>
			{#each Object.keys(times) as _, time}
				<ExpandList dayKey={selected_index + 1} timeKey="{time}"/>
			{/each}
		</div>
	</div>
</div>

<style>
	.wrapper {
		/*position: relative;*/
	}

	.plan-wrapper {
		/*position: relative;*/
		display: flex;
		justify-content: center;
		overflow: hidden;
	}

	.duties {
		position: relative;
		min-width: 100vw;
		margin-right: 2rem;
		/*transition: all .2s ease-out;*/
	}

	.duties:last-child {
		margin-right: 0;
	}


	.wrapper {
		display: flex;
		flex-direction: column;
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

</style>