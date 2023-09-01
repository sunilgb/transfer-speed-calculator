<script setup lang="ts">
import Basic from './components/Basic.vue'
import WithFileSize from './components/WithFileSize.vue'
</script>

<template>
  <header>
    <h1 class="wrapper green">
      Transfer Speed Calculator
    </h1>
  </header>

  <main>
    <Basic />
    <!-- <br />
    <br />
    <br /> -->
    <!-- <WithFileSize /> -->
  </main>
</template>

<style scoped>
  header {
    line-height: 1.5;
    margin: 2rem;
    text-align: center;
  }

  h1 {
    font-weight: 500;
    font-size: 2.6rem;
    position: relative;
    top: -10px;
  }

  main {
    display: grid;
    grid-template-columns: 1fr 0fr;
    padding: 0 2rem;
  }
</style>
