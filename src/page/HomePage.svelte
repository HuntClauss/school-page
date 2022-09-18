<script lang="ts">

	import {trans} from "../store";

	const lang = $trans["homepage"]

</script>

<div class="wrapper">
	<section>
		<div class="header">{lang.what.header}</div>
		<main class="content indent">
			<p>{lang.what.content[0]}</p>
			<p>
				{lang.what.content[1]}
				<a href="https://codepen.io/ZSL_Poznan/pen/LYOJBMz">codepen.io</a>
				{lang.what.content[2]}
			</p>
			<p>{lang.what.content.slice(3,).join('')}</p>
		</main>
	</section>
	<section>
		<div class="header">{lang.subpages.header}</div>
		<div class="indent">
			{#each lang.subpages.content as elem}
				<div class="element">
					<span class="page-name">{elem.page}</span> - {elem.description}
				</div>
			{/each}
		</div>

	</section>
</div>

<style>
	.wrapper {
		padding: 1rem;
		overflow-y: scroll;
		font-size: 15px;
	}

	section {
		margin-bottom: 3rem;
	}

	.indent {
		margin-left: 1rem;
	}

	.header {
		font-size: 36px;
		margin-bottom: 10px;
	}

	.element {
		margin-bottom: 1rem;
	}

	.page-name {
		font-weight: 600;
		font-size: 18px;
	}
</style>