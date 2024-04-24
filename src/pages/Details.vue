<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { defineProps, ref, watch } from 'vue'
import { Heart, Play } from 'lucide-vue-next';
import { useRouter } from 'vue-router';

const props = defineProps({
    id: Number
});

const router = useRouter();

const redirect = () => {
    router.push('/player')
}

const loading = ref(false)
const post = ref(null)
const error = ref(null)

watch(() => props.id, fetchMovie, { immediate: true })

async function fetchMovie(id) {
    error.value = post.value = null
    loading.value = true

    try {
        const apiKey = '4fed3f5d3a4f4c308c5a51f02e7113f6'
        post.value = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);

    } catch (err) {
        error.value = err.toString()
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div v-if="isLoading">Carregando...</div>
    <div v-else>
        <div class="flex items-start justify-center bg-slate-900 text-slate-200">
            <div class=" gap-3 flex flex-col justify-between items-start ml-10 ">
                <h1 class="w-full font-bold pt-60 text-4xl">{{ console.log(post) }}</h1>
                <div class="flex gap-4 text-slate-400 mt-2">
                    <span>2024</span>
                    <span>6.7/10</span>
                    <span>|</span>
                    <span>115 min</span>
                </div>
                <p class="w-1/2 mt-2">
                    O poderoso Kong e o temível Godzilla se unem contra uma colossal ameaça mortal escondida no mundo
                    dos
                    humanos, que ameaça a existência de sua espécie e da nossa. Mergulhando profundamente nos mistérios
                    da
                    Ilha da Caveira e nas origens da Terra Oca, o filme irá explorar a antiga batalha de Titãs que
                    ajudou a
                    forjar esses seres extraordinários e os ligou à humanidade para sempre.
                </p>
                <div class="flex gap-4 font-bold mt-6">
                    <button @click="redirect" class="flex items-center justify-center bg-red-600 p-3 rounded-2xl gap-1">
                        <Play /> Trailer
                    </button>
                    <button @click="handleAddMyList"
                        class="flex items-center justify-center bg-green-600 p-3 rounded-2xl gap-1">
                        <Heart /> Salvar
                    </button>
                </div>
            </div>
            <div class="w-screen h-screen ">
                <img class="w-full h-full object-fill"
                    src="https://image.tmdb.org/t/p/original/qPLQIVTVkhSm0tmhPMX0OeEuG0P.jpg" alt="">
            </div>
        </div>
    </div>

</template>
