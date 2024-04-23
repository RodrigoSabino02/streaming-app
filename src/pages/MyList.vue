<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useMovies } from '../store/movies.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination } from 'swiper/modules';

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




onMounted(async () => {
    await storeMovies.getMovies();
})


// return {
//     modules: [FreeMode, Pagination],
// };
</script>

<template>
    <swiper :slidesPerView="9" :spaceBetween="30" :freeMode="true" :pagination="{
        clickable: true,
    }" :modules="modules" class="mySwiper">
        <swiper-slide v-for="movie in moviesList" :key="movie.id">
            <button class="">
                <img class="rounded-xl" :src="'https://image.tmdb.org/t/p/w200/' + movie.poster_path" />
            </button>
        </swiper-slide>
    </swiper>
</template>
