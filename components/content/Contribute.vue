<script setup>
const { hostname } = useAppConfig()
const route = useRoute()

const title = ref('')

const slug = computed(() => {
  return _kebabCase(title.value)
})

const search = async function(opts, query) {
  return await fetch('/api/games', { method: 'POST', body: JSON.stringify({ query }) })
    .then(async (response) => {
      return await response.json().then((results) => {
        const mapped = _map(results, game => game.name)
        const uniq = _uniq(mapped)
        console.log(uniq)
        return uniq
      })
  })
}
</script>

<template>
<TntForm method="POST" action="https://staticman.thombruce.com/v3/entry/github/thombruce/thedefinitiveedition/main/articles">
  <!-- hidden -->
  <input name="options[redirect]" type="hidden" :value="`${hostname}${route.path}`" />

  <!-- visible -->
  <TntInput id="contributionAuthor" label="Name" name="fields[author]" type="text" />

  <TntInput id="contributionEmail" label="Email" name="fields[email]" type="email" hint="This won't be shown." />

  <TntInput id="contributionTitle" label="Title" name="fields[title]" type="text" v-model="title" />
  <input name="fields[slug]" type="hidden" :value="slug" />

  <TntCombobox
    label="Game"
    labelAlt="Powered by <a href='https://www.igdb.com/' target='_blank'>IGDB</a>"
    id="contributionGame"
    name="fields[game]"
    :filter="search"
    :debounce="{ wait: 250, maxWait: 500 }"
  />

  <TntTextarea id="contributionContent" label="Content" name="fields[content]" labelAlt="Supports Markdown" />

  <TntButton />
</TntForm>
</template>
