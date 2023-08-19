<script setup>
import { throttle as _throttle } from 'lodash'

defineProps([
  'inputid',
  'inputname',
  'inputclass'
])

const query = ref('')

// TODO: Auto-generate slugs if result origin is IGDB (/content should already have nice slugs)
// TODO: Query content/ first and combine results
const results = ref([])

async function search() {
  console.log('searching')
  results.value = await _throttle(fetchList, 500)
  console.log(results.value)
}

async function fetchList() {
  console.log('throttled search')
  const response = await fetch('/.netlify/functions/games', { method: 'POST', body: JSON.stringify({ query: query.value }) })
  return await response.json()
}

function populate(value) {
  query.value = value
}
</script>

<template>
  <div class="join join-vertical">
    <input
      :id="inputid"
      :name="inputname"
      :class="`${inputclass}${results.length ? ' join-item' : ''}`"
      type="text"
      @input="search()"
      v-model="query"
    />
    <ul class="menu bg-base-200 join-item" v-show="results.length">
      <li v-for="result in results" :key="result.name">
        <a @click="populate(result.name)">{{ result.name }}</a>
      </li>
    </ul>
  </div>
</template>
