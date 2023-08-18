<script setup>
const query = ref('foo')

const { data: results } = {}

async function search() {
  results = await useFetch('/.netlify/functions/igdb/games', { body: { query } })
  console.log(results)
}
</script>

<template>
  <input type="text" class="input input-bordered" @change="search()" v-model="query" />
  <span>{{ query }}</span>
  <div v-if="results">
    {{ results }}
  </div>
</template>
