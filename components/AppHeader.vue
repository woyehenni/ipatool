<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <header class="bg-indigo-600">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div
        class="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none"
      >
        <div class="w-full flex justify-between items-center">
          <UIcon name="grommet-icons:apple-app-store" class="w-10 h-10 text-white" />
          <!-- <a href="#">
            <span class="sr-only">ipatool</span>
            <img
              class="h-10 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
              alt=""
            />
          </a> -->
          <div class="hidden ml-10 space-x-8 lg:block">
            <a href="#" class="flex-shrink-0 group block">
              <div class="flex items-center">
                <div class="h-9 w-9 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    class="h-full w-full rounded-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <p
                    class="text-sm font-medium text-white group-hover:text-white"
                  >
                    {{ accountInfo.appleId }}
                  </p>
                  <p
                    class="text-xs font-medium text-white group-hover:text-white"
                  >
                    {{ accountInfo.address.lastName }}
                    {{ accountInfo.address.firstName }}
                  </p>
                </div>
              </div>
            </a>
          </div>
          <!-- <div class="hidden ml-10 space-x-8 lg:block">
            <a v-for="link in navigation" :key="link.name" :href="link.href" class="text-base font-medium text-white hover:text-indigo-50">
              {{ link.name }}
            </a>
          </div> -->
        </div>
        <div class="ml-10 space-x-4">
          <!-- <a
            href="#"
            class="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
            @click="doLogin"
            >Sign in</a
          >
          <a
            href="#"
            class="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
            @click="doLogout"
            >Logout</a
          > -->
          <UButton type="button" icon="grommet-icons:logout" @click.prevent="doLogout"> Logout </UButton>
        </div>
      </div>
      <!-- <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        <a v-for="link in navigation" :key="link.name" :href="link.href" class="text-base font-medium text-white hover:text-indigo-50">
          {{ link.name }}
        </a>
      </div> -->
    </nav>
  </header>
</template>

<script lang="ts" setup>
const accountInfo: Ref<{
  appleId: string
  address: {
    firstName: string
    lastName: string
  }
}> = useCookie("account")
function doLogout() {
  const token = useCookie("token")
  token.value = null
  resetApps()
  navigateTo("/login")
}
</script>
