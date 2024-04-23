<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useMovies } from '../store/movies.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronsRight, ChevronRight } from 'lucide-vue-next';

const storeMovies = useMovies()

const {
  moviesList,
  page,
  pages,
  results,
  moviesLength,
  hasNextPage,
  hasPreviousPage,
  isLoading } = storeToRefs(storeMovies);

const goToNextPage = () => {
  storeMovies.nextPage()
}

const goToPreviousPage = () => {
  storeMovies.previousPage()
}


onMounted(async () => {
  await storeMovies.getMovies();
})

</script>

<template>
  <div>
    <div>
      <div v-if="isLoading">Carregando...</div>
      <div v-else>
        <div class="bg-gray-900 py-12">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-semibold text-white mb-6">filmes em destaque</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <button class="mx-8 my-5" v-for="movie in moviesList" :key="movie.id">
                <img class="rounded-xl h-56" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
              </button>
            </div>
          </div>
          <div>

            <!-- <span>mostrando {{ moviesLength }} de {{ results }} items</span>
            <span><span>pagina {{ page }} de {{ pages }}</span></span> -->
            <div className='flex gap-1.5'>


              <button class="bg-slate-100" @click="goToPreviousPage" :disabled="!hasPreviousPage">
                <ChevronLeft className='size-4' />
              </button>
              <button class="bg-slate-100" @click="goToNextPage" :disabled="!hasNextPage">
                <ChevronsRight className='size-4' />
              </button>
              <h2 class="text-slate-50">{{ page }}</h2>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
