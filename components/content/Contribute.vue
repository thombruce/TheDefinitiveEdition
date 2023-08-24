<script setup>
const { hostname } = useAppConfig()
const route = useRoute()

const contribution = ref({
  name: '',
  email: '',
  title: '',
  game: '',
  content: '',
})

const filter = _debounce(async (opts, query) => {
  // Search
  const response = await fetch('/.netlify/functions/games', { method: 'POST', body: JSON.stringify({ query: query }) })
  const arr = await response.json()

  // Parse
  const mapped = _map(arr, (game) => {
    const release_date = _minBy(game.release_dates, 'y')?.y
    const title = game.name + (release_date ? ` (${release_date})` : '')
    const slug = title.replace(/\s/, '')
    const platforms = _uniq(_map(_sortBy(game.release_dates, 'y'), (r) => r.platform.abbreviation)).join(', ')
    // return { title, slug, platforms }
    return `${title} (${platforms})`
  })
  const uniq = _uniq(mapped)
  return uniq
}, 250, { 'maxWait': 500 })
</script>

<template>
<TntForm method="POST" action="https://staticman.thombruce.com/v3/entry/github/thombruce/thedefinitiveedition/main/articles">
  <!-- hidden -->
  <input name="options[redirect]" type="hidden" :value="`${hostname}${route.path}`" />

  <!-- visible -->
  <TntInput v-model="contribution.name" id="contributionName" name="fields[name]" label="Name"/>
  <TntInput v-model="contribution.email" id="contributionEmail" name="fields[email]" type="email" label="Email" hint="This won't be shown publicly." />
  <TntInput v-model="contribution.title" id="contributionTitle" name="fields[title]" label="Title"/>

  <TntCombobox
    v-model="contribution.game"
    id="contributionGame"
    name="fields[game]"
    label="Game"
    labelAlt="Powered by <a href='https://www.igdb.com/' target='_blank'>IGDB</a>"
    :filter="filter"
  />

  <TntTextarea v-model="contribution.content" id="contributionContent" name="fields[content]" label="Content" labelAlt="Supports Markdown" />
  <TntButton />
</TntForm>
</template>
