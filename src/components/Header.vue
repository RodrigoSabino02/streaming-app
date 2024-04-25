<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { RouterLink } from "vue-router";

</script>

<template>
    <div class="max-w-full h-16 px-4 flex items-center justify-start bg-gray-600">
        <RouterLink to="/" class="text-slate-50">
            <img class="w-10 mr-6" src="../assets/icons/icon.png" alt="" />
        </RouterLink>

        <div class='flex items-center gap-5'>
            <RouterLink to="/movies" class="text-slate-50">Filmes</RouterLink>
            <RouterLink to="/series" class="text-slate-50">Series</RouterLink>
            <RouterLink to="/my-list" class="text-slate-50">Minha lista</RouterLink>
        </div>
    </div>
</template>
