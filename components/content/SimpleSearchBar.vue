<script setup>
const query = ref('')

// TODO: Auto-generate slugs if result origin is IGDB (/content should already have nice slugs)
// TODO: Query content/ first and combine results
// TODO: Debounce IGDB queries
const results = ref([])

// TODO: Use @input and debounce the search somehow - maybe use lodash _debounce?
async function search() {
  const response = await fetch('/.netlify/functions/games', { method: 'POST', body: JSON.stringify({ query: query.value }) })
  results.value = await response.json()
  console.log(results.value)
}
</script>

<template>
  <div class="form-control">
    <label for="contributionGame" class="label">
      <span class="label-text">Game</span>
      <span class="label-text-alt">Powered by <a href="https://www.igdb.com/" target="_blank">IGDB</a></span>
    </label>
    <div class="join join-vertical">
      <input
        id="contributionGame"
        type="text"
        :class="`input input-bordered${results.length ? ' join-item' : ''}`"
        @change="search()"
        v-model="query"
      />
      <ul class="menu bg-base-200 join-item" v-show="results.length">
        <li v-for="result in results" :key="result.name">
          <a>{{ result.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
