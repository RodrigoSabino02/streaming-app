<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useSeries } from '../store/series.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const storeSeries = useSeries()

const { seriesList, isLoadingSeries } = storeToRefs(storeSeries);



onMounted(async () => {
  await storeSeries.getSeries();
})

</script>

<template>
  <div>
    <div>
      <div v-if="isLoadingSeries">Carregando...</div>
      <div v-else>
        <div class="bg-gray-900 py-12">
          <div class="container mx-auto px-4">
            <h2 class="text-3xl font-semibold text-white mb-6">Series em destaque</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <button class="mx-8 my-5" v-for="serie in seriesList" :key="serie.id">
                <img class="rounded-xl h-56" :src="'https://image.tmdb.org/t/p/w500/' + serie.poster_path" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
