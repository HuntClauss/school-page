<script lang="ts">

	import {times} from "../const";
	import {duties_accu} from "../store";
	import Icon from "./Icon.svelte";

	export let dayKey = 0
	export let timeKey = 0
	export let elements = 0
	export let activeFilters = []

	let duties
	$: duties = apply_filter($duties_accu[dayKey][timeKey], activeFilters)
	let collapsed = true
	let skip_render = collapsed
	let item_list: HTMLElement

	let last_id = undefined
	function toggle() {
		collapsed = !collapsed
		if (last_id !== undefined) clearTimeout(last_id)

		if (collapsed) {
			item_list.style.maxHeight = '0'
			last_id = setTimeout(() => skip_render = true, 500)
		} else {
			item_list.style.maxHeight = `${Math.min(elements * 40, window.innerHeight)}px`
			skip_render = false
		}
	}

	function apply_filter(list, filter: string[]) {
		let result = list

		filter = filter.map(v => v.toLowerCase())

		if (filter.length !== 0) {
			result = []
			list.forEach(entry => {
				if (filter.includes(entry.place.toLowerCase()) || filter.includes(entry.person.toLowerCase())) {
					result.push(entry)
				}
			})
		}

		elements = result.length
		return result
	}

</script>

<div class="wrapper">
	<div class="section" class:collapsed class:hidden={duties.length === 0}>
		<div class="time" on:click={toggle}>
			<div class="left"><div></div></div>
			<div class="middle">{`${times[timeKey].str_start} - ${times[timeKey].str_end}`}</div>
			<div class="right icon"><Icon name="expand.svg" width="24px" height="24px"/></div>
		</div>
		<div class="item-list" bind:this={item_list}>
			{#if !skip_render}
				{#each duties as duty}
					<div class="item">
						<div class="place">{duty.place}</div>
						<div class="person">{duty.person}</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	/* FEATURE W.I.P. */
	/*.proposal {*/
	/*	width: 12px;*/
	/*	height: 12px;*/
	/*	border-radius: 50%;*/
	/*	background-color: var(--accent-color);*/
	/*}*/

	.place {
		width: 50%;
	}

	.hidden {
		display: none
	}

	.icon {
		padding-right: 10px;
		text-align: right;
		transition: all .25s ease-in-out;
	}

	.time {
		width: 100%;
		background-color: #D2D2D2;
		text-align: center;
		font-size: 16px;
		padding: 0.5rem 0;
		margin: 4px 0 0 0;
		border-radius: 5px;
		display: flex;
		cursor: pointer;
	}

	.time > * {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.left {
		justify-content: left;
		margin-left: 0.5rem;
	}

	.middle {
		justify-content: center;
	}

	.right {
		justify-content: right;
	}

	.collapsed .item-list {
		max-height: 0;
	}

	.collapsed .time .icon {
		scale: 1 -1;
		top: 0;
	}

	.item-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 0.8rem;
		overflow: hidden;
		transition: max-height 0.3s ease-in-out;
	}

	.item {
		width: 100%;
		display: inline-flex;
		background-color: #ECECEC;
		padding: 0.4rem;
		margin-bottom: 2px;
		font-size: 14px;
	}

	.item:last-child {
		border-radius: 0 0 5px 5px;
	}

	.place {
		color: #5A5A5A;
	}
</style>