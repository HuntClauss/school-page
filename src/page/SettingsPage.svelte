<script lang="ts">

	import SettingSection from "../compontent/SettingSection.svelte";
	import SettingOption from "../compontent/SettingOption.svelte";
	import language from "../compontent/settings/language.svelte";
	import {trans} from "../store";
	import wip from "../compontent/settings/wip.svelte";

	const lang = $trans["settings"]

	const sections = [
		{
			name: lang.personalize,
			options: [
				{icon: 'globe.svg', name: lang.language, value: 'polski',
					action: _ => selectPopup(language)},
				{icon: 'funnel.svg', name: lang.filters, value: '',
					action: _ => selectPopup(wip)},
				{icon: 'moon.svg', name: lang.theme, value: 'jasny',
					action: _ => selectPopup(wip)},
				{icon: 'calendar.svg', name: lang.default_day, value: 'inteligentny',
					action: _ => selectPopup(wip)},
			]
		},
	]

	function selectPopup(content) {
		popup_content = content
		show_popup = true
	}

	let show_popup = false
	let popup_content

</script>

<div class="wrapper">
	<div class="popup" class:show={show_popup}>
		<div class="panel">
			<svelte:component this="{popup_content}" close={_ => show_popup = false}/>
		</div>
	</div>
	<div class="header" on:click={_ => show_popup = !show_popup}>USTAWIENIA</div>
	{#each sections as sec}
		<SettingSection name="{sec.name}">
			{#each sec.options as opt}
				<SettingOption {...opt}/>
			{/each}
		</SettingSection>
	{/each}
</div>

<style lang="scss">
	.popup {
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: #00000000;
		z-index: -1;
		transition: all .3s ease-in-out;
		overflow: hidden;
	}

	.popup.show {
		background-color: #0000004D;
		z-index: 5;
	}

	.show .panel {
		translate: 0 0;
	}

	.panel {
		position: absolute;
		background-color: var(--background);
		width: 100vw;
		height: 90vh;
		border-radius: 35px 35px 0 0;
		translate: 0 100%;
		bottom: 0;
		transition: all .3s ease-in-out;
	}

	.header {
		font-size: 36px;
		font-weight: 300;
		width: 100%;
		text-align: center;
		padding: 0.5rem;
		margin-bottom: 2rem;
	}
</style>