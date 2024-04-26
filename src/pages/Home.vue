<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useMovies } from '../store/movies.js'
import { useSeries } from '../store/series.js'
import { useMyList } from '../store/myList.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue';


import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { useRouter } from 'vue-router';

const router = useRouter();

const redirectMovieDetails = (id) => {
  router.push({ name: 'movie', params: { id: id } });
}

const redirectSerieDetails = (id) => {
  router.push({ name: 'serie', params: { id: id } });
}


const storeMovies = useMovies()
const storeSeries = useSeries()
const storeMyList = useMyList()

const { moviesList, isLoading } = storeToRefs(storeMovies);
const { getMyListMovies, getMyListSeries, isLoadingMyList } = storeToRefs(storeMyList);
const { seriesList, isLoadingSeries } = storeToRefs(storeSeries);

onMounted(async () => {
  await storeMyList.fetchMyListMovies()
  await storeMyList.fetchMyListSeries()
  await storeMovies.getMovies();
  await storeSeries.getSeries();

});

</script>

<template>
  <div class="bg-gray-900">
    <!-- my list -->
    <div>
      <div v-if="isLoadingMyList">Carregando...</div>
      <div v-else>
        <div class="bg-gray-900 py-8">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-semibold text-white mb-6">Meus Favoritos</h2>
            <div v-if="getMyListMovies.length < 0">
              <p class="text-gray-300 text-center"> Você ainda não adicionou nada a sua
                lista de favoritos </p>
            </div>
            <div v-else>
              <swiper :slidesPerView="getMyListMovies.length < 4 ? getMyListMovies.length : 4" :spaceBetween="4"
                :freeMode="true" :pagination="{ clickable: true }" :navigation="true" class="mySwiper">
                <swiper-slide v-for="myListMovie in getMyListMovies" :key="myListMovie.id">
                  <button @click="redirectMovieDetails(myListMovie.id)" class="focus:outline-none relative">
                    <img class="rounded-xl w-full"
                      :src="'https://image.tmdb.org/t/p/w200/' + myListMovie.poster_path" />
                    <div class="absolute inset-0 bg-black opacity-0 hover:opacity-80 transition-opacity rounded-xl">
                    </div>
                  </button>
                </swiper-slide>
                <swiper-slide v-for="myListSeries in getMyListSeries" :key="myListSeries.id">
                  <button @click="redirectSerieDetails(myListSeries.id)" class="focus:outline-none relative">
                    <img class="rounded-xl w-full"
                      :src="'https://image.tmdb.org/t/p/w200/' + myListSeries.poster_path" />
                    <div class="absolute inset-0 bg-black opacity-0 hover:opacity-80 transition-opacity rounded-xl">
                    </div>
                  </button>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- filmes -->
    <div>
      <div v-if="isLoading">Carregando...</div>
      <div v-else>
        <div class="bg-gray-900 py-8">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-semibold text-white mb-6">Filmes em destaque</h2>
            <swiper :slidesPerView="moviesList.length < 4 ? moviesList.length : 4" :spaceBetween="4" :freeMode="true"
              :pagination="{ clickable: true }" :navigation="true" class="mySwiper">
              <swiper-slide v-for="movie in moviesList" :key="movie.id">
                <button @click="redirectMovieDetails(movie.id)" class="focus:outline-none relative">
                  <img class="rounded-xl w-full" :src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path" />
                  <div class="absolute inset-0 bg-black opacity-0 hover:opacity-80 transition-opacity rounded-xl"></div>
                </button>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
    <!-- series -->
    <div>
      <div v-if="isLoadingSeries">Carregando...</div>
      <div v-else>
        <div class="bg-gray-900 py-8">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-semibold text-white mb-6">Series em destaque</h2>
            <swiper :slidesPerView="seriesList.length < 4 ? seriesList.length : 4" :spaceBetween="4" :freeMode="true"
              :pagination="{ clickable: true }" :loop="true" class="mySwiper">
              <swiper-slide v-for="serie in seriesList" :key="serie.id">
                <button @click="redirectSerieDetails(serie.id)" class="focus:outline-none relative">
                  <img class="rounded-xl w-full" :src="'https://image.tmdb.org/t/p/w200/' + serie.poster_path" />
                  <div class="absolute inset-0 bg-black opacity-0 hover:opacity-80 transition-opacity rounded-xl"></div>
                </button>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
