<template>
  <main>
    <h1>The Definitive Edition</h1>

    <p><em>The Definitive Edition</em> is a blog dedicated to documenting the best way to play classic games.</p>

    <ContentNavigation v-slot="{ navigation }">
      <ul>
        <li v-for="link of navigation" :key="link._path">
          <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
        </li>
      </ul>
    </ContentNavigation>
  </main>
</template>
