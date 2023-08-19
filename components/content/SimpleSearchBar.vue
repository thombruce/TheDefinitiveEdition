<script setup>
defineProps([
  'inputid',
  'inputname',
  'inputclass'
])

const query = ref('')

// TODO: Auto-generate slugs if result origin is IGDB (/content should already have nice slugs)
// TODO: Query content/ first and combine results
const results = ref([])

const isActive = ref(false)

const search = _debounce(async () => {
  const response = await fetch('/.netlify/functions/games', { method: 'POST', body: JSON.stringify({ query: query.value }) })
  results.value = await response.json()
  console.log(results.value)
}, 500, { 'maxWait': 1000 })

function populate(value) {
  query.value = value
  search() // Reperform search with updated value
  isActive.value = false
}

const target = ref(null)

onClickOutside(target, () => isActive.value = false)
</script>

<template>
  <div class="join join-vertical" ref="target">
    <input
      :id="inputid"
      :name="inputname"
      :class="`${inputclass}${isActive && results.length ? ' join-item' : ''}`"
      type="text"
      @focus="isActive = true"
      @input="search()"
      v-model="query"
    />
    <ul class="menu bg-base-200 join-item" v-show="isActive && results.length">
      <li v-for="result in results" :key="result.name">
        <a @click="populate(result.name)">{{ result.name }}</a>
      </li>
    </ul>
  </div>
</template>
