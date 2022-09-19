<script lang="ts">

	import Icon from "../Icon.svelte";

	export let close = () => console.log('Unimplemented close behaviour')
	export let header = 'W.I.P.'
	export let description = 'Work In Progress'

</script>

<div class="top-bar" on:click={close}>
	<Icon name="chevron-left.svg"/>
</div>
<div class="header">{header}</div>
<div class="description">{description}</div>
<hr>

<style>
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