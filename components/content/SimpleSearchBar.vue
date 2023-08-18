<script setup>
const query = ref('')

const results = ref({})

async function search() {
  results.value = await useFetch('/.netlify/functions/games', { method: 'post', body: { query: query.value } })
  console.log(results.value)
}
</script>

<template>
  <input type="text" class="input input-bordered" @change="search()" v-model="query" />
  <div v-if="results">
    {{ results }}
  </div>
</template>
