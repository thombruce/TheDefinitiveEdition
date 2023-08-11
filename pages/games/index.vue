<template>
  <main>
    <h1>Games</h1>
    <ContentList path="/games" v-slot="{ list }">
      <ul>
        <li v-for="article in list" :key="article._path">
          <NuxtLink :to="article._path">{{ article.title }}</NuxtLink>
        </li>
      </ul>
    </ContentList>
    <NuxtLink to="/">Back home</NuxtLink>
  </main>
</template>
