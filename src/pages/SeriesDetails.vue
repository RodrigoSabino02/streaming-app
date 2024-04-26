<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useMyList } from '../store/myList.js'
import { defineProps, ref, watch } from 'vue'
import { Heart, Play } from 'lucide-vue-next';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from 'axios';

const props = defineProps({
    id: Number
});

const router = useRouter();
const storeMyList = useMyList();

const { myListSeriesId } = storeToRefs(storeMyList)

const redirect = () => {
    console.log(myListSeriesId)
    // router.push({ name: 'playerSerie', params: { id: id } });
}

const loading = ref(false)
const post = ref(null)
const error = ref(null)
const serieYear = ref()



const handleAddMyList = (id) => {
    storeMyList.addSerieMyList(id)
    notify()
}

watch(() => props.id, fetchSerie, { immediate: true })

async function fetchSerie(id) {
    error.value = post.value = null
    loading.value = true

    try {
        const apiKey = '4fed3f5d3a4f4c308c5a51f02e7113f6'
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=pt-BR`);
        post.value = response.data;
        serieYear.value = response.data.first_air_date.split("-")

    } catch (err) {
        error.value = err.toString()
    } finally {
        loading.value = false
    }
}

const notify = () => {
    toast("Adicionado a sua lista com sucesso", {
        theme: "dark",
        type: "success",
        position: "bottom-center",
        dangerouslyHTMLString: true,
        closeOnClick: false,
        pauseOnHover: false,
    })
};


</script>

<template>
    <div class="bg-gray-900" v-if="loading">Carregando...</div>
    <div v-else>
        <div class="flex items-start justify-center bg-slate-900 text-slate-200">
            <div class=" gap-3 flex flex-col justify-between items-start ml-10 ">
                <h1 class="w-full font-bold pt-60 text-4xl">{{ post.name }}</h1>
                <div class="flex gap-4 text-slate-400 mt-2">
                    <span>{{ serieYear[0] }}</span>
                    <span>{{ Math.round(post.vote_average) }}/10</span>
                    <span>|</span>
                    <span>{{ post.number_of_seasons }} temporadas</span>
                </div>
                <p class="w-1/2 mt-2">{{ post.overview }}</p>
                <div class="flex gap-4 font-bold mt-6">
                    <button @click="redirect" class="flex items-center justify-center bg-red-600 p-3 rounded-2xl gap-1">
                        <Play /> Trailer
                    </button>
                    <button @click="handleAddMyList(id)"
                        class="flex items-center justify-center bg-green-600 p-3 rounded-2xl gap-1">
                        <Heart /> Salvar
                    </button>
                </div>
            </div>
            <div class="w-screen h-screen ">
                <img class="w-full h-full object-fill" :src="'https://image.tmdb.org/t/p/w500/' + post.poster_path"
                    alt="">
            </div>
        </div>
    </div>

</template>
