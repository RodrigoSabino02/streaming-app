<template>
    <div class="flex items-center justify-center">
        <div ref="player"></div>
        <button @click="playVideo">Play</button>
        <button @click="pauseVideo">Pause</button>
    </div>
</template>

<script>
export default {
    mounted() {
        // Carrega a API do YouTube
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Inicializa o player quando a API estiver pronta
        window.onYouTubeIframeAPIReady = () => {
            this.player = new window.YT.Player(this.$refs.player, {
                height: '847',
                width: '100%',
                videoId: 'MaKEBn3ve4E', // Substitua 'VIDEO_ID_HERE' pelo ID do vídeo do YouTube que você deseja reproduzir
                events: {
                    'onReady': this.onPlayerReady,
                },
            });
        };
    },
    methods: {
        onPlayerReady(event) {
            console.log('Player ready');
        },
        playVideo() {
            this.player.playVideo();
        },
        pauseVideo() {
            this.player.pauseVideo();
        },
    },
    data() {
        return {
            player: null,
        };
    },
};
</script>