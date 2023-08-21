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

const treated = computed(() => {
  const mapped = _map(results.value, (game) => {
    const release_date = _minBy(game.release_dates, 'y')?.y
    const title = game.name + (release_date ? ` (${release_date})` : '')
    const slug = title.replace(/\s/, '')
    const platforms = _map(_sortBy(game.release_dates, 'y'), (r) => r.platform.abbreviation).join(', ')
    return { title, slug, platforms }
  })
  const uniq = _uniq(mapped)
  return uniq
})

const isActive = ref(false)

const search = _debounce(async () => {
  const response = await fetch('/.netlify/functions/games', { method: 'POST', body: JSON.stringify({ query: query.value }) })
  results.value = await response.json()
  console.log(results.value)
}, 250, { 'maxWait': 500 })

function populate(value) {
  query.value = value
  search()
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
      :class="`${inputclass}${isActive && treated.length ? ' join-item' : ''}`"
      type="text"
      autocomplete="off"
      @focus="isActive = true"
      @input="search()"
      v-model="query"
    />
    <ul class="menu bg-base-200 join-item" v-show="isActive && treated.length">
      <li v-for="result in treated" :key="result.slug" class="truncate">
        <a @click="populate(result.title)" class="flex flex-row">
          <div class="w-2/3">
            {{ result.title }}
          </div>
          <div class="w-1/3 text-neutral-content truncate">
            {{ result.platforms }}
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
