<template>
  <div>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">The Definitive Edition</NuxtLink>
      </div>
      <ContentNavigation v-slot="{ navigation }">
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li v-for="link of navigation" :key="link._path">
              <NuxtLink :to="link._path">{{ link.title }}</NuxtLink>
            </li>
          </ul>
        </div>
      </ContentNavigation>
    </div>
    <div  class="prose mx-auto my-10">
      <slot />
    </div>
  </div>
</template>
