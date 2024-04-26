/* eslint-disable vue/return-in-computed-property */
/* eslint-disable no-unused-vars */
import {defineStore} from 'pinia'
 import { ref, computed } from 'vue'
 import axios from 'axios'

 export const usePlayer = defineStore('player', () => {
    const isLoading = ref(false);
    const trailerId = ref();

    const getTrailerMovie = async (id) => {
        try {
            isLoading.value = true
            const apiKey = '4fed3f5d3a4f4c308c5a51f02e7113f6'
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=pt-BR`);
            trailerId.value = response.data.results[0].key;
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        } finally {
            isLoading.value = false
        }        
    }

    const getTrailerSerie = async (id) => {
        try {
            isLoading.value = true
            const apiKey = '4fed3f5d3a4f4c308c5a51f02e7113f6'
            const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=pt-BR`);
            trailerId.value = response.data.results[0].key;
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        } finally {
            isLoading.value = false
        }        
    }


    const youtubeId = computed(() => trailerId.value)


    return {
        getTrailerMovie,
        youtubeId,
        getTrailerSerie
    }

 })