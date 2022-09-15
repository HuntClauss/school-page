<script lang="ts">

	import {times} from "../const";
	import {duties_accu, filters} from "../store";
	import Icon from "./Icon.svelte";

	export let dayKey = 0
	export let timeKey = 0
	let duties
	$: duties = apply_filter($duties_accu[dayKey][timeKey], $filters)
	let collapsed = true

	function toggle() {
		collapsed = !collapsed
	}

	function apply_filter(list, filter: string[]) {
		let result = []
		if (filter.length === 0) return list
		filter = filter.map(v => v.toLowerCase())

		list.forEach(entry => {
			if (filter.includes(entry.place.toLowerCase()) || filter.includes(entry.person.toLowerCase())) {
				result.push(entry)
			}
		})
		return result
	}

</script>

<div class="wrapper">
	<div class="section" class:collapsed class:hidden={duties.length === 0}>
		<div class="time" on:click={toggle}>
			{`${times[timeKey].start} - ${times[timeKey].end}`}
			<div class="icon">
				<Icon name="expand.svg" width="24px" height="24px"/>
			</div>
		</div>
		<div class="item-list">
			{#each duties as duty}
				<div class="item">
					<div class="place">{duty.place}</div>
					<div class="person">{duty.person}</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.place {
		width: 50%;
	}

	.hidden {
		display: none
	}

	.icon {
		position: absolute;
		right: 10px;
		top: 50%;
		transform: translateY(-35%);
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
		position: relative;
	}

	.collapsed .item-list {
		max-height: 0;
	}

	.collapsed .time .icon {
		-moz-transform: scaleY(-1);
		-o-transform: scaleY(-1);
		-webkit-transform: scaleY(-1);
		transform: scaleY(-1);
		top: 0;
	}

	.item-list {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 0.8rem;
		max-height: 100vh;
		overflow: hidden;
		transition: all 0.25s ease-in-out;
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