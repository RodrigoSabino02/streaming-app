<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useMovies } from '../store/movies.js'
import { useSeries } from '../store/series.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';
import { useRouter } from 'vue-router';

const router = useRouter();

const redirect = (id) => {
  router.push({ name: 'details', params: { id: id } });
  console.log(id)
}


const storeMovies = useMovies()
const storeSeries = useSeries()

const { moviesList, isLoading } = storeToRefs(storeMovies);
const { seriesList, isLoadingSeries } = storeToRefs(storeSeries);

onMounted(async () => {
  await storeMovies.getMovies();
  await storeSeries.getSeries();

});

</script>

<template>
  <div>
    <!-- my list -->
    <div>
      <div v-if="isLoading">Carregando...</div>
      <div v-else>
        <div class="bg-gray-900 py-8">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-semibold text-white mb-6">Meus Favoritos</h2>
            <swiper :slidesPerView="9" :spaceBetween="30" :freeMode="true" :pagination="{
              clickable: true,
            }" :modules="modules" class="mySwiper">
              <swiper-slide v-for="movie in moviesList" :key="movie.id">
                <pre>{{ movie.id }}</pre>
                <button @click="redirect(movie.id)" class="">
                  <img class="rounded-xl" :src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path" />
                </button>
              </swiper-slide>
            </swiper>
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
            <swiper :slidesPerView="9" :spaceBetween="30" :freeMode="true" :pagination="{
              clickable: true,
            }" :modules="modules" class="mySwiper">
              <swiper-slide v-for="movie in moviesList" :key="movie.id">
                <button class="">
                  <img class="rounded-xl" :src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path" />
                </button>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
    <!-- series -->
    <div>
      <div v-if="isLoading">Carregando...</div>
      <div v-else>
        <div class="bg-gray-900 py-8">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-semibold text-white mb-6">Series em destaque</h2>
            <swiper :slidesPerView="9" :spaceBetween="30" :freeMode="true" :pagination="{
              clickable: true,
            }" :modules="modules" class="mySwiper">
              <swiper-slide v-for="series in seriesList" :key="series.id">
                <button class="">
                  <img class="rounded-xl" :src="'https://image.tmdb.org/t/p/w200/' + series.poster_path" />
                </button>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>

    </div>
  </div>
  <!--  -->
</template>
