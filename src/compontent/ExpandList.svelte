<script lang="ts">

	import {times} from "../const";
	import {duties_accu} from "../store";

	export let dayKey = 0
	export let timeKey = 0
	let duties
	$: duties = $duties_accu[dayKey][timeKey]
	let collapsed = true

	function toggle() {
		collapsed = !collapsed
	}

</script>

<div class="wrapper">
	<div class="section">
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