<script setup>
const { hostname } = useAppConfig()
const route = useRoute()

const title = ref('')

const slug = computed(() => {
  return _kebabCase(title.value)
})
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

  <div class="form-control">
    <label for="contributionGame" class="label">
      <span class="label-text">Game</span>
      <span class="label-text-alt">Powered by <a href="https://www.igdb.com/" target="_blank">IGDB</a></span>
    </label>
    <SimpleSearchBar inputid="contributionGame" inputname="fields[game]" inputclass="input input-bordered" />
    <!-- TODO: Slugify for use as Dir name -->
  </div>

  <TntTextarea id="contributionContent" label="Content" name="fields[content]" labelAlt="Supports Markdown" />

  <TntButton />
</TntForm>
</template>
