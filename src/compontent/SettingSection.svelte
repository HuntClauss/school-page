<script lang="ts">
	export let name = ''

</script>

<section>
	<div class="name">{name}</div>
	<slot></slot>
</section>

<style>
	section {
		padding: 0 1rem;
	}

	.name {
		background-color: var(--background-2);
		border-radius: 10px 10px 0   0;
		width: fit-content;
		padding: 2px 20px;
		font-size: 14px;
		margin-left: 0.6rem;
	}
</style>