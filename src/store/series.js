import {defineStore} from 'pinia'
 import axios from 'axios'
 import { ref, computed } from 'vue'

 export const useSeries = defineStore('series', () => {
    const catalog = ref();
    const isLoadingSeries = ref(false);
    const series = ref([]);

    const getSeries = async () => {
        try {
            isLoadingSeries.value = true
            const apiKey = '4fed3f5d3a4f4c308c5a51f02e7113f6'
            const response = await axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR`);
            catalog.value = response.data;
            series.value = response.data.results;
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
        } finally {
            isLoadingSeries.value = false
        }

        
    }

    const seriesLength = computed(() => catalog.value.lenght)
    const page = computed(() => catalog.value.page)
    const totalPages = computed(() => catalog.value.data.total_pages)
    const totalResults = computed(() => catalog.value.data.total_results)
    const seriesList = computed(() => series.value)

    return {
        seriesList,
        page,
        totalPages,
        totalResults,
        getSeries,
        seriesLength,
        isLoadingSeries
    }

 })