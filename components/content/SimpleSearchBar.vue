<script setup>
defineProps([
  'inputid',
  'inputname',
  'inputclass'
])

const query = ref('')

// TODO: Auto-generate slugs if result origin is IGDB (/content should already have nice slugs)
// TODO: Query content/ first and combine results
// TODO: Filter results; no duplicates, except same title different year
const results = ref([])

const isActive = ref(false)

const search = _debounce(async () => {
  const response = await fetch('/.netlify/functions/games', { method: 'POST', body: JSON.stringify({ query: query.value }) })
  results.value = await response.json()
  console.log(results.value)
}, 250, { 'maxWait': 500 })

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
      autocomplete="off"
      @focus="isActive = true"
      @input="search()"
      v-model="query"
    />
    <ul class="menu bg-base-200 join-item" v-show="isActive && results.length">
      <li v-for="result in results" :key="result.name">
        <a @click="populate(result.name)">
          {{ result.name }}
          <span v-if="result.release_date">({{ result.release_date }})</span>
        </a>
      </li>
    </ul>
  </div>
</template>
