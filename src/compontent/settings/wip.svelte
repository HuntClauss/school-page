<script lang="ts">

	import Icon from "../Icon.svelte";
	export let close


</script>

<div class="wrapper">
	<div class="top-bar" on:click={close}>
		<Icon name="chevron-left.svg"/>
	</div>
	<div class="header">W.I.P.</div>
	<div class="description">W trakcie tworzenia.</div>
	<hr>
</div>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		padding: 1rem;
		box-sizing: border-box;
	}

	.top-bar {
		width: fit-content;
		margin-bottom: 1rem;
	}

	.header {
		width: 100%;
		font-size: 30px;
	}

	.description {
		margin-top: 12px;
		margin-left: 5px;
		font-size: 14px;
		color: #5A5A5A;
	}
</style>