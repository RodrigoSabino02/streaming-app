<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue';
import { usePlayer } from '../store/player.js';
import { storeToRefs } from 'pinia'

// Definir uma referência para o player do YouTube
const props = defineProps({
    id: Number
});

const player = ref(null);

const storePlayer = usePlayer();

const { youtubeId } = storeToRefs(storePlayer);

// Método para inicializar o player quando a API estiver pronta
const initializePlayer = (id) => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
        player.value = new window.YT.Player(document.getElementById('player'), {
            height: '847',
            width: '100%',
            videoId: id, // Substitua 'VIDEO_ID_HERE' pelo ID do vídeo do YouTube que você deseja reproduzir
            events: {
                'onReady': onPlayerReady,
            },
        });
    };
};

// Método para ser executado quando o player estiver pronto
const onPlayerReady = (event) => {
    console.log('Player ready');
};



// Carregar a API do YouTube ao montar o componente
onMounted(async () => {
    await storePlayer.getTrailerMovie(props.id);
    initializePlayer(youtubeId);
});
</script>

<template>
    <div>
        <div id="player" class="relative"></div>
    </div>
</template>