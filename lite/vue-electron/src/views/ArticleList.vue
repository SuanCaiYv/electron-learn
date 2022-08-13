<template>
    <div class="article-list">
        <Layout></Layout>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue"
import Layout from "../components/articlelist/Layout.vue"

const name = ref<String>("ArticleList")
</script>

<style scoped>
.article-list {
    width: 100%;
    height: 100%;
}
</style>