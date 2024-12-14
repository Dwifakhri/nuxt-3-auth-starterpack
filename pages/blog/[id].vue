<script setup>
definePageMeta({
  layout: "login"
})
useHead({
  title: "guest"
})
const { params } = useRoute()
</script>

<template>
  <div class="main">
    <p>Blog {{ params.id }}</p>
  </div>
</template>


<style lang="scss" scoped></style>