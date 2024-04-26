<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useMovies } from '../store/movies.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { useRouter } from 'vue-router';


const storeMovies = useMovies()

const {
  moviesList,
  page,
  pages,
  results,
  isLoading,
} = storeToRefs(storeMovies);

const router = useRouter();

const redirectMovieDetails = (id) => {
  router.push({ name: 'movie', params: { id: id } });
}

const goToNextPage = () => {
  storeMovies.nextPage()
}

const goToPreviousPage = () => {
  storeMovies.prevPage()
}


onMounted(async () => {
  await storeMovies.getMovies();
})

</script>


<template>
  <div class="bg-gray-900">
    <div>
      <div v-if="isLoading">Carregando...</div>
      <div v-else>
        <div class="bg-gray-900 py-12">
          <div class="container mx-auto px-4">
            <h2 class="w-full text-center text-3xl font-semibold text-white mb-6">filmes</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              <button @click="redirectMovieDetails(movie.id)" class="mx-8 my-5 relative" v-for="movie in moviesList"
                :key="movie.id">
                <img class="rounded-xl w-full sm:h-72" :src="'https://image.tmdb.org/t/p/w500/' + movie.poster_path" />
                <div class="absolute inset-0 bg-black opacity-0 hover:opacity-80 transition-opacity rounded-xl"></div>
              </button>

            </div>
            <div class="flex items-center justify-between mx-10 text-sm text-zinc-300">
              <div class="hidden md:block">
                mostrando {{ moviesList.length }} de {{ results }} items
              </div>
              <div class="flex gap-2 items-center">
                <span class="hidden md:inline">pagina {{ page }} de {{ pages }}</span>
                <button class="border border-white/10 rounded-md p-1.5 bg-black/20" @click="goToPreviousPage">
                  <ChevronLeft class="size-4" />
                </button>
                <button class="border border-white/10 rounded-md p-1.5 bg-black/20" @click="goToNextPage">
                  <ChevronRight class="size-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
