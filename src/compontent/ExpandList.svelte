<script lang="ts">

	import {times} from "../const";
	import {duties_accu, filters} from "../store";

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
		list.forEach(entry => {
			if (filter.includes(entry.place) || filter.includes(entry.person)) {
				result.push(entry)
			}
		})
		return result
	}

</script>

<div class="wrapper">
	<div class="section" class:hidden={duties.length === 0}>
		<div class="time" on:click={toggle}>{`${times[timeKey].start} - ${times[timeKey].end}`}</div>
		<div class="item-list" class:collapsed>
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

	.time {
		width: 100%;
		background-color: #D2D2D2;
		text-align: center;
		font-size: 16px;
		padding: 0.5rem 0;
		margin: 4px 0 0 0;
		border-radius: 5px;
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

	.collapsed {
		max-height: 0;
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