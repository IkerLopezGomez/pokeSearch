<script setup>
  import {useRouter} from 'vue-router';
  const router = useRouter();
</script>

<template>
  <nav>
    <button @click="router.push('/')">buscar</button>
    <button @click="router.push('/lista')">lista</button>
    <button @click="router.push('/info')">info</button>
    <button @click="router.push('/favoritos')">favoritos</button>
  </nav>
  <router-view />
</template>

<style scoped></style>
