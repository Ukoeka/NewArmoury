<template>
    <div>
    <NuxtLayout>
        <!-- <NuxtLoadingIndicator /> -->
        <NuxtPage />
    </NuxtLayout>
    <Toaster position="top-right"  />
    </div>
</template>
<script setup lang="ts">
import { Toaster } from "vue-sonner"
import 'vue-sonner/style.css'
</script>