eslint-disable vue/multi-word-component-names
<script setup>
import { useMyList } from '../store/myList.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { ChevronLeft, ChevronRight } from 'lucide-vue-next';

const storeMyList = useMyList()

const {
    isLoadingMyList,
    getMyListMovies,
} = storeToRefs(storeMyList);




onMounted(async () => {
    await storeMovies.fetchMyListMovies();
})

</script>

<template>
    <div class="bg-gray-900">
        <div>
            <div v-if="isLoadingMyList">Carregando...</div>
            <div v-else>
                <div class="bg-gray-900 py-12">
                    <div class="container mx-auto px-4">
                        <h2 class="w-full text-center text-3xl font-semibold text-white mb-6">Meus Favoritos</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            <button @click="redirectMovieDetails(myMovieList.id)" class="mx-8 my-5 relative"
                                v-for="myMovieList in getMyListMovies" :key="myMovieList.id">
                                <img class="rounded-xl w-full sm:h-72"
                                    :src="'https://image.tmdb.org/t/p/w500/' + myMovieList.poster_path" />
                                <div
                                    class="absolute inset-0 bg-black opacity-0 hover:opacity-80 transition-opacity rounded-xl">
                                </div>
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
