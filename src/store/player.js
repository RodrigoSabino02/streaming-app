/* eslint-disable vue/return-in-computed-property */
/* eslint-disable no-unused-vars */
import {defineStore} from 'pinia'
 import { ref, computed } from 'vue'

 export const usePlayer = defineStore('player', () => {
    const isLoading = ref(false);

    const getMovies = async () => {
        try {
            isLoading.value = true
            // Carrega a API do YouTube
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

             // Inicializa o player quando a API estiver pronta
            window.onYouTubeIframeAPIReady = () => {
                this.player = new window.YT.Player(this.$refs.player, {
                    height: '360',
                    width: '640',
                    videoId: 'MaKEBn3ve4E', // Substitua 'VIDEO_ID_HERE' pelo ID do vídeo do YouTube que você deseja reproduzir
                    events: {
                        'onReady': this.onPlayerReady,
                    },
                });
            };
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        } finally {
            isLoading.value = false
        }        
    }


    const moviesLength = computed(() => movies.value.lenght)
    const page = computed(() => pageIndex.value)
    const pages = computed(() => totalPages.value)
    const results = computed(() => totalResults.value)
    const moviesList = computed(() => movies.value)

    return {

    }

 })