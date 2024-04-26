/* eslint-disable vue/return-in-computed-property */
/* eslint-disable no-unused-vars */
import {defineStore} from 'pinia'
 import { ref, computed } from 'vue'
 import axios from 'axios'

 export const useMyList = defineStore('myList', () => {
    const isLoadingMyList = ref(false);
    const myListMoviesId = ref([]);
    const myListMovies = ref([]);
    const myListSeriesId = ref([]);
    const myListSeries = ref([])

    async function fetchMyListMovies() {
        isLoadingMyList.value = true
        try {
            myListMoviesId.value.map(async id => {
                const apiKey = '4fed3f5d3a4f4c308c5a51f02e7113f6'
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
                myListMovies.value = response.data;
            })

        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        } finally {
            isLoadingMyList.value = false
        }
    }

    async function fetchMyListSeries() {
        isLoadingMyList.value = true
        try {
            getMyListMoviesId.value.map(async id => {
                const apiKey = '4fed3f5d3a4f4c308c5a51f02e7113f6'
                const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`);
                myListSeries.value = response.data;
            })

        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        } finally {
            isLoadingMyList.value = false
        }
    }

    function addSerieMyList(id) {
        if (id === myListMoviesId.value.includes(id)) {
            return removeMovieMyList(id)
        }
        myListSeriesId.value.push(id);
    }

    function removeSerieMyList(id) {
        myListSeriesId.value = myListSeriesId.value.filter(item => item !== id);
    }

    function addMovieMyList(id) {
        myListMoviesId.value.push(id);
    }

    function removeMovieMyList(id) {
        myListMoviesId.value = myListMoviesId.value.filter(item => item !== id);
    }


    const getMyListMovies = computed(() => myListMovies.value);
    const getMyListSeries = computed(() => myListSeries.value)
    const getMyListMoviesId = computed(() => myListMoviesId.value)


    return {
        isLoadingMyList,
        addMovieMyList,
        addSerieMyList,
        removeMovieMyList,
        removeSerieMyList,
        myListMoviesId,
        myListSeriesId,
        getMyListMovies,
        getMyListSeries,
        fetchMyListMovies,
        fetchMyListSeries,
        getMyListMoviesId
    }
 })