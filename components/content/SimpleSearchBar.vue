<script setup>
const query = ref('')

const results = ref({})

async function search() {
  await useFetch('/.netlify/functions/games', { method: 'post', body: { query: query.value } })
    .then((response) => {
      console.log(response.data)
      results.value = JSON.parse(JSON.stringify(response.data))
      console.log(results.value)
    })
}
</script>

<template>
  <details class="dropdown mb-32">
    <summary class="list-none">
      <input type="text" class="input input-bordered" @change="search()" v-model="query" />
    </summary>
    <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
      <li v-for="result in results">
        <a>{{ result.name }}</a>
      </li>
    </ul>
  </details>
  <p>{{ results }}</p>
</template>
