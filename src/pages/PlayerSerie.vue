<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue';
import { usePlayer } from '../store/player.js';
import { storeToRefs } from 'pinia'

const props = defineProps({
    id: Number
});

const player = ref(null);

const storePlayer = usePlayer();

const { youtubeId } = storeToRefs(storePlayer);

const initializePlayer = (id) => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
        player.value = new window.YT.Player(document.getElementById('player'), {
            height: '847',
            width: '100%',
            videoId: id,
            events: {
                'onReady': onPlayerReady,
            },
        });
    };
};

const onPlayerReady = (event) => {
    console.log('Player ready');
};



onMounted(async () => {
    await storePlayer.getTrailerSerie(props.id);
    initializePlayer(youtubeId);
});
</script>

<template>
    <div>
        <div id="player" class="relative"></div>
    </div>
</template>