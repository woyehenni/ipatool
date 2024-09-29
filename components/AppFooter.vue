<template>
  <footer class="bg-white absolute bottom-0 w-full">
    <UDivider class="px-4" />
    <div
      class="max-w-7xl mx-auto py-4 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8"
    >
      <div class="flex justify-center space-x-6 md:order-2">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          target="_blank"
          class="text-gray-400 hover:text-gray-500"
        >
          <span class="sr-only">{{ item.name }}</span>
          <UIcon :name="item.icon" class="w-5 h-5" />
          <!-- <component :is="item.icon" class="h-6 w-6" aria-hidden="true" /> -->
        </a>
      </div>
      <div class="mt-8 md:mt-0 md:order-1">
        <p class="text-center text-base text-gray-400">
          &copy; 2024
          <ULink
            to="mailto:woyehenni@gmail.com"
            target="_blank"
            active-class="text-primary"
            inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            gufsh
          </ULink>
          All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navigation = [
  {
    name: "Github",
    icon: "grommet-icons:github",
    href: "https://github.com/woyehenni/ipatool",
  },
  {
    name: "QQ",
    icon: "ant-design:qq-outlined",
    href: "https://wpa.qq.com/msgrd?v=3&uin=153353695&site=qq&menu=yes",
  },
  {
    name: "Weibo",
    icon: "ant-design:weibo-outlined",
    href: "https://weibo.com/woyehenni",
  },
  {
    name: "Facebook",
    icon: "grommet-icons:facebook",
    href: "https://www.facebook.com/gufsh",
  },
  {
    name: "X",
    icon: "grommet-icons:x",
    href: "https://x.com/woyehenni",
  },
]
</script>
