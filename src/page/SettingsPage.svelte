<script lang="ts">

	import SettingSection from "../compontent/SettingSection.svelte";
	import SettingOption from "../compontent/SettingOption.svelte";

	const sections = [
		{
			name: 'Personalizacja',
			options: [
				{icon: 'globe.svg', name: 'Język', value: 'polski'},
				{icon: 'funnel.svg', name: 'Filtry', value: ''},
				{icon: 'moon.svg', name: 'Motyw', value: 'jasny'},
				{icon: 'calendar.svg', name: 'Domyślny dzień', value: 'inteligentny'},
			]
		},
	]

</script>

<div class="wrapper">
	<div class="header">USTAWIENIA</div>
	{#each sections as sec}
		<SettingSection name="{sec.name}">
			{#each sec.options as opt}
				<SettingOption {...opt}/>
			{/each}
		</SettingSection>
	{/each}
</div>

<style>
	.header {
		font-size: 36px;
		font-weight: 300;
		width: 100%;
		text-align: center;
		padding: 0.5rem;
		margin-bottom: 2rem;
	}
</style>