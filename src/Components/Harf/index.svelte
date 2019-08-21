<script>
    import { fade,fly } from 'svelte/transition';
    export let deger = '';
    export let acik = false;
</script>

<style src="./style.scss">

</style>

<div class="harf shadow mr-3">
    {#if acik}
        <span transition:fade="{{ duration: 800 }}">{deger}</span>
    {:else}
        <span />
    {/if}
</div>
