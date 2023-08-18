<script setup>
const { hostname } = useAppConfig()
const route = useRoute()

const { data } = await useFetch('/api/games')
</script>

<template>
<form method="POST" action="https://staticman.thombruce.com/v3/entry/github/thombruce/thedefinitiveedition/main/articles">
  <!-- hidden -->
  <input name="options[redirect]" type="hidden" :value="`${hostname}${route.path}`" />

  <!-- visible -->
  <div class="form-control">
    <label for="contributionName" class="label"><span class="label-text">Name</span></label>
    <input id="contributionName" name="fields[name]" type="text" class="input input-bordered" />
  </div>
  <div class="form-control">
    <label for="contributionEmail" class="label"><span class="label-text">E-mail</span></label>
    <input id="contributionEmail" name="fields[email]" type="email" class="input input-bordered" />
    <label for="contributionEmail" class="label"><span class="label-text-alt">This won't be shown.</span></label>
  </div>
  <div class="form-control">
    <label for="contributionTitle" class="label"><span class="label-text">Title</span></label>
    <input id="contributionTitle" name="fields[title]" type="text" class="input input-bordered" />
  </div>
  <div class="form-control">
    <label for="contributionGame" class="label"><span class="label-text">Game</span></label>
    <input id="contributionGame" name="fields[game]" type="text" class="input input-bordered" />
    <!-- TODO: Implement search -->
    <!-- TODO: Slugify for use as Dir name -->
  </div>
  <div class="form-control">
    <label for="contributionContent" class="label">
      <span class="label-text">Content</span>
      <span class="label-text-alt">Supports Markdown</span>
    </label>
    <textarea id="contributionContent" name="fields[content]" class="textarea textarea-bordered"></textarea>
  </div>

  <div class="mt-5">
    <button type="submit" class="btn btn-primary">Submit!</button>
  </div>
</form>
</template>
