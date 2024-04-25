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
    fetchMyList } = storeToRefs(storeMyList);




onMounted(async () => {
    await storeMovies.fetchMyList();
})

</script>

<template>
    <div class="bg-gray-900">
        <div>
            <div v-if="isLoadingMyList">Carregando...</div>
            <div v-else>
                <div class="bg-gray-900 py-12">
                    <div class="container mx-auto px-4">
                        <h2 class="text-3xl font-semibold text-white mb-6">Meus Favoritos</h2>
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            <button @click="redirectMovieDetails(movie.id)" class="mx-8 my-5"
                                v-for="myList in getMyListMovies" :key="myList.id">
                                <img class="rounded-xl w-full sm:h-72"
                                    :src="'https://image.tmdb.org/t/p/w500/' + myList.poster_path" />
                            </button>
                        </div>
                    </div>
                    <!-- <div class="flex items-center justify-between mx-10 text-sm text-zinc-300">
                        <div>
                            mostrando {{ getMyListMovies.length }} de {{ results }} items
                        </div>
                        <div class="flex gap-2 items-center">
                            <span>pagina {{ page }} de {{ pages }}</span>
                            <button class="border border-white/10 rounded-md p-1.5 bg-black/20"
                                @click="goToPreviousPage">
                                <ChevronLeft class="size-4" />
                            </button>
                            <button class="border border-white/10 rounded-md p-1.5 bg-black/20" @click="goToNextPage">
                                <ChevronRight class="size-4" />
                            </button>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
