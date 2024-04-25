/* eslint-disable vue/return-in-computed-property */
/* eslint-disable no-unused-vars */
import {defineStore} from 'pinia'
 import { ref, computed } from 'vue'
 import axios from 'axios'

 export const useMyList = defineStore('myList', () => {
    const isLoadingMyList = ref(false);
    const myListMoviesId = ref([]);
    const myListMovies = ref([])
    const list = ref()


    async function fetchMyList() {
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


    function addMovieMyList(id) {
        myListMoviesId.value.push(id);
    }

    const removeMovieMyList = (id) => {
        myListMoviesId.value = myListMoviesId.value.filter(item => item !== id);
    }


    const getMyListMovies = computed(() => myListMovies.value)


    return {
        isLoadingMyList,
        addMovieMyList,
        removeMovieMyList,
        myListMoviesId,
        getMyListMovies,
        fetchMyList
    }


 })