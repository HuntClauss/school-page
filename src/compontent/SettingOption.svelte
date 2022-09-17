<script lang="ts">
	import Icon from "./Icon.svelte";

	export let icon = ''
	export let name = ''
	export let value = ''
	export let action = () => {console.log("W.I.P.")}
</script>

<div class="option" on:click={action}>
	<div class="icon">
		<Icon name="{icon}" width="22px" height="22px"/>
	</div>
	<div class="name">{name}</div>
	<div class="value">{value}</div>
	<div class="expand">
		<Icon name="chevron-right.svg" width="18px" height="18px"/>
	</div>
</div>

<style>
	.option {
		background-color: #ebeaeb;
		display: grid;
		align-items: center;
		grid-template-columns: min-content max-content auto min-content;
		margin-bottom: 7px;
		font-size: 15px;
		padding: 0.7rem 0;
		border-radius: 10px;
	}

	.value {
		color: #5A5A5A;
		text-align: right;
	}

	.icon, .expand {
		padding: 0 10px;
		display: flex;
		align-items: center;
	}
</style>