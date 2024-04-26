import {defineStore} from 'pinia'
 import axios from 'axios'
 import { ref, computed } from 'vue'

 export const useSeries = defineStore('series', () => {
    const catalog = ref();
    const isLoadingSeries = ref(false);
    const series = ref([]);
    const pageIndex = ref(1);
    const totalPages = ref(1);
    const totalResults = ref(1);
    const apiKey = '4fed3f5d3a4f4c308c5a51f02e7113f6';
    const language = 'pt-BR';

    const getSeries = async () => {
        try {
            isLoadingSeries.value = true
            const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=${language}&page=${pageIndex.value}`);
            catalog.value = response.data;
            series.value = response.data.results;
            pageIndex.value = response.data.page;
            totalPages.value = response.data.total_pages;
            totalResults.value = response.data.total_results;
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        } finally {
            isLoadingSeries.value = false
        }
    }

    const nextPage = () => {
        if (pageIndex.value < totalPages.value) {
            pageIndex.value++;
            getSeries();
        }
    };

    const prevPage = () => {
        if (pageIndex.value > 1) {
            pageIndex.value--;
            getSeries();
        }
    };
    const resetPage = () => {
            pageIndex.value = 1
    };

    const page = computed(() => pageIndex.value);
    const pages = computed(() => totalPages.value);
    const results = computed(() => totalResults.value);
    const seriesList = computed(() => series.value)

    return {
        seriesList,
        page,
        pages,
        results,
        isLoadingSeries,
        getSeries,
        nextPage,
        prevPage,
        resetPage
    }

 })