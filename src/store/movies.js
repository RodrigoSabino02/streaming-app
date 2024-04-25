/* eslint-disable vue/return-in-computed-property */
/* eslint-disable no-unused-vars */
// import {defineStore} from 'pinia'
//  import axios from 'axios'
//  import { ref, computed } from 'vue'

//  export const useMovies = defineStore('movies', () => {
//     const isLoading = ref(false);
//     const movies = ref([]);
//     const pageIndex = ref(1);
//     const totalPages = ref(1)
//     const totalResults = ref(1)

//     const getMovies = async () => {
//         try {
//             isLoading.value = true
//             const apiKey = '4fed3f5d3a4f4c308c5a51f02e7113f6'
//             const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${pageIndex.value}`);
//                 movies.value = response.data.results;
//                 pageIndex.value = response.data.page;
//                 totalPages.value = response.data.total_pages;
//                 totalResults.value = response.data.total_results;
//         } catch (error) {
//             console.error('Erro ao buscar filmes:', error);
//         } finally {
//             isLoading.value = false
//         }        
//     }


//     const moviesLength = computed(() => movies.value.lenght)
//     const page = computed(() => pageIndex.value)
//     const pages = computed(() => totalPages.value)
//     const results = computed(() => totalResults.value)
//     const moviesList = computed(() => movies.value)

//     return {
//         moviesList,
//         page,
//         pages,
//         results,
//         moviesLength,
//         isLoading,
//         getMovies,
//     }
//  })

import { defineStore } from 'pinia';
import axios from 'axios';
import { ref, computed } from 'vue';

export const useMovies = defineStore('movies', () => {
    const isLoading = ref(false);
    const movies = ref([]);
    const pageIndex = ref(1);
    const totalPages = ref(1);
    const totalResults = ref(1);
    const apiKey = '4fed3f5d3a4f4c308c5a51f02e7113f6';
    const language = 'pt-BR';

    const getMovies = async () => {
        try {
            isLoading.value = true;
            const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=${pageIndex.value}`);
            movies.value = response.data.results;
            pageIndex.value = response.data.page;
            totalPages.value = response.data.total_pages;
            totalResults.value = response.data.total_results;
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        } finally {
            isLoading.value = false;
        }        
    };

    const nextPage = () => {
        if (pageIndex.value < totalPages.value) {
            pageIndex.value++;
            getMovies();
        }
    };

    const prevPage = () => {
        if (pageIndex.value > 1) {
            pageIndex.value--;
            getMovies();
        }
    };

    const moviesLength = computed(() => movies.value.length);
    const page = computed(() => pageIndex.value);
    const pages = computed(() => totalPages.value);
    const results = computed(() => totalResults.value);
    const moviesList = computed(() => movies.value);

    return {
        moviesList,
        page,
        pages,
        results,
        moviesLength,
        isLoading,
        getMovies,
        nextPage,
        prevPage,
    };
});