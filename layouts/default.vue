<script setup>
const appInfo = await queryContent('/_app/config').only(['name', 'footer']).findOne()
</script>

<template>
  <div>
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <NuxtLink to="/" class="btn btn-ghost normal-case text-xl">{{ appInfo.name }}</NuxtLink>
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
    <div  class="prose mx-auto">
      <slot />
    </div>
    <footer class="footer footer-center p-10 bg-base-200 text-base-content">
      <div>
        <div v-html="appInfo.footer.icon" class="fill-current"></div>
        <p class="font-bold whitespace-pre">
          {{ appInfo.footer.text }}
        </p>
        <p>Copyright © {{ new Date().getFullYear() }} - All rights reserved</p>
      </div>
    </footer>
  </div>
</template>
