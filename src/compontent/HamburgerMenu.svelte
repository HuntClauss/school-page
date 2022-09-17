<script lang="ts">

import {navbar} from "../store.js";
</script>

<div class="hamburger-menu" class:active={$navbar} on:click={_ => $navbar = !$navbar}>
	<div class="hamburger-line"></div>
	<div class="hamburger-line"></div>
	<div class="hamburger-line"></div>
</div>

<nav class:active={$navbar}>
	<a href="#">Strona Główna</a>
	<a href="#">Plany Nauczycieli</a>
	<a href="#">Plan Dyżurów</a>
	<a href="#">Ustawienia</a>
</nav>

<style lang="scss">
	.hamburger-menu {
		cursor: pointer;
		pointer-events: all;
		width: fit-content;
		position: relative;
		left: 10px;
		top: 10px;
		z-index: 2;
		&.active > * {
			&:nth-child(1) {
				rotate: 45deg;
				translate: 0 12px;
			}

			&:nth-child(2) {
				opacity: 0;
			}

			&:nth-child(3) {
				rotate: -45deg;
				translate: 0 -12px;
			}
		}
	}

	.hamburger-line {
		content: '';
		width: 35px;
		height: 4px;
		border-radius: 30px;
		background-color: #676767;
		margin: 0.5rem;
		transition: all .2s ease-in-out;
	}

	nav {
		position: absolute;
		top: 0;
		left: 20px;
		font-size: 20px;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	a {
		color: unset;
		text-decoration: none;
		width: 0;
		overflow: hidden;
		transition: .2s all ease-in-out;
		display: block;
		//pointer-events: none;
		box-sizing: border-box;
		white-space: nowrap;
		margin: 1rem 0;
		padding: 1rem 0;
		cursor: pointer;
	}

	nav.active > a {
		translate: 0;
		width: 100%;
	}

	a:nth-child(2) {
		transition-delay: .05s;
	}

	a:nth-child(3) {
		transition-delay: .1s;
	}

	a:nth-child(4) {
		transition-delay: .15s;
	}
</style>