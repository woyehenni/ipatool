<script setup lang="ts">
import type { NuxtError } from "#app"

const toast = useToast()
const authStore = useAuthStore() // make authenticated state reactive

useHead({
  title: "Apple ID Login",
})

const user = ref({
  appleid: "",
  password: "",
  code: "",
})
const rememberMe = ref(false)
const codeVisible = ref(false)

onMounted(() => {
  const remember = localStorage.getItem("rememberMe")
  if (remember) {
    rememberMe.value = true
    const { appleid, password } = JSON.parse(remember)
    user.value.appleid = appleid ?? ""
    user.value.password = password ?? ""
  }
})

function doLogin() {
  if (rememberMe.value) {
    localStorage.setItem(
      "rememberMe",
      JSON.stringify({
        appleid: user.value.appleid,
        password: user.value.password,
      })
    )
  } else {
    localStorage.removeItem("rememberMe")
  }
  authenticate(user.value)
    .then(() => {
      // redirect to homepage if user is authenticated
      if (authStore.value.authenticated) {
        navigateTo("/")
      }
    })
    .catch((error: NuxtError) => {
      setError(error)
      if ((error.data as any).failureType === "1") {
        codeVisible.value = true
      }
    })
}
</script>
<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Apple ID Login
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label
            for="appleid"
            class="block text-sm font-medium leading-6 text-gray-900"
            >AppleID</label
          >
          <div class="mt-2">
            <UInput
              id="appleid"
              name="appleid"
              type="text"
              autocomplete="appleid"
              required
              variant="outline"
              placeholder="Apple ID"
              icon="i-raphael-apple"
              v-model="user.appleid"
            />
            <!-- <v-input
              id="appleid"
              name="appleid"
              type="appleid"
              autocomplete="appleid"
              required
              class="w-full"
              v-model="user.id"
            /> -->
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <UInput
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              v-model="user.password"
            />
          </div>
        </div>

        <div v-if="codeVisible">
          <label
            for="code"
            class="block text-sm font-medium leading-6 text-gray-900"
            >验证码</label
          >
          <div class="mt-2">
            <UInput
              id="code"
              name="code"
              type="text"
              required
              class="w-full"
              v-model="user.code"
            />
          </div>
        </div>
        <div>
          <UCheckbox color="primary" label="Remember me" v-model="rememberMe" />
        </div>
        <div>
          <UButton
            type="button"
            block
            :disabled="!user.appleid || !user.password"
            @click.prevent="doLogin"
          >
            Login
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>
<style></style>
