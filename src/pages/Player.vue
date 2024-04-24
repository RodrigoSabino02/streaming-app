<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>

        <div id="player" class="relative"></div>
        <button @click="playVideo">Play</button>
        <button @click="pauseVideo">Pause</button>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
    setup() {
        // Definir uma referência para o player do YouTube
        const player = ref(null);

        // Método para inicializar o player quando a API estiver pronta
        const initializePlayer = () => {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                player.value = new window.YT.Player(document.getElementById('player'), {
                    height: '847',
                    width: '100%',
                    videoId: 'O-b2VfmmbyA', // Substitua 'VIDEO_ID_HERE' pelo ID do vídeo do YouTube que você deseja reproduzir
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

        // Método para reproduzir o vídeo
        const playVideo = () => {
            player.value.playVideo();
        };

        // Método para pausar o vídeo
        const pauseVideo = () => {
            player.value.pauseVideo();
        };

        // Carregar a API do YouTube ao montar o componente
        onMounted(initializePlayer);

        // Retornar os métodos e a referência do player
        return {
            playVideo,
            pauseVideo,
        };
    },
};
</script>