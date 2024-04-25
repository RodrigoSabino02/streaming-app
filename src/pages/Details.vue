<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useMyList } from '../store/myList.js'
import { defineProps, ref, watch } from 'vue'
import { Heart, Play, Star } from 'lucide-vue-next';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'
import axios from 'axios';

const loading = ref(false)
const post = ref(null)
const error = ref(null)
const movieYear = ref()

const props = defineProps({
    id: Number
});

const router = useRouter();
const storeMyList = useMyList();

const { isLoading,
    addMovieMyList,
    removeMovieMyList,
    myListMoviesId,
    getMyListMovies,
    fetchMyList } = storeToRefs(storeMyList)

const redirect = (id) => {
    router.push({ name: 'player', params: { id: id } });

}

const handleAddMyList = (id) => {

    storeMyList.removeMovieMyList(id)

    storeMyList.addMovieMyList(id)
}



watch(() => props.id, fetchMovie, { immediate: true })

async function fetchMovie(id) {
    error.value = post.value = null
    loading.value = true

    try {
        const apiKey = '4fed3f5d3a4f4c308c5a51f02e7113f6'
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
        post.value = response.data;
        movieYear.value = response.data.release_date.split("-")

    } catch (err) {
        error.value = err.toString()
    } finally {
        loading.value = false
    }
}


</script>

<template>
    <div class="bg-gray-900" v-if="loading">Carregando...</div>
    <div v-else>
        <div class="flex flex-col-reverse md:flex-row items-center justify-center bg-slate-900 text-slate-200 gap-2">
            <div class="gap-3 flex flex-col justify-between items-start mx-6 md:mx-10">
                <h1 class="w-full font-bold pt-8 md:pt-60 text-4xl">{{ post.title }}</h1>
                <div class="flex flex-wrap gap-4 text-slate-400 mt-2">
                    <span>{{ movieYear[0] }}</span>
                    <span class="flex items-center gap-1">
                        {{ Math.round(post.vote_average) }}
                        <Star size="16" color="#FFD700" />
                    </span>
                    <span>|</span>
                    <span>{{ post.runtime }} min</span>
                </div>
                <p class="w-full mt-2 md:w-1/2">{{ post.overview }}</p>
                <div class="flex flex-wrap gap-4 font-bold mt-6 mb-4">
                    <button @click="console.log(myListMoviesId)"
                        class="flex items-center justify-center bg-red-600 p-3 rounded-2xl gap-1">
                        <Play /> Trailer
                    </button>
                    <button @click="handleAddMyList(id)"
                        class="flex items-center justify-center bg-green-600 p-3 rounded-2xl gap-1">
                        <Heart /> Salvar
                    </button>
                </div>
            </div>
            <div class="w-full md:w-screen h-screen overflow-hidden">
                <img class="w-full h-full object-cover" :src="'https://image.tmdb.org/t/p/w500/' + post.poster_path"
                    alt="">
            </div>
        </div>
    </div>

</template>
