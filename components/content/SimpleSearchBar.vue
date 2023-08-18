<script setup>
const query = ref('')

const results = ref({})

async function search() {
  const response = await useFetch('/.netlify/functions/games', { method: 'post', body: { query: query.value } })
  results.value = await JSON.parse(response.data)
}
</script>

<template>
  <input type="text" class="input input-bordered" @change="search()" v-model="query" />
  <div v-if="results">
    {{ results }}
  </div>


  <div class="dropdown mb-32">
    <summary class="m-1 btn">
      <input type="text" class="input input-bordered" @change="search()" v-model="query" />
    </summary>
    <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
      <li v-for="result in results">
        <a>{{ result.name }}</a>
      </li>
    </ul>
  </div>
</template>
