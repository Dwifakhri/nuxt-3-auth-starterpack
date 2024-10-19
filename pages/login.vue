<script setup>

definePageMeta({
  layout: 'login',
  middleware: "check-auth"
})

useHead({
  title: "Login"
})

const { signIn } = useAuth()

const form = ref({ email: "", password: "" })
const loading = ref(false)
const error = ref("")

const login = () => {
  loading.value = true
  signIn(form.value, { redirect: false })
    .then(() => {
      navigateTo("/", { external: false })
    })
    .catch((err) => {
      loading.value = false
      form.value.password = ""
      error.value = err?.response?._data?.message ?? "Internal server error"
    })
}
</script>

<template>
  <div class="main">
    <form class="login-form" @submit.prevent="login()">
      <h2><img src="/icon/lock.svg" alt="sidebase nuxt auth" width="30" height="20">Local Provider Nuxt Auth</h2>
      <div v-if="error" class="notif-alert">
        <span>{{ error }}</span>
        <span class="btn-close" @click="error = ''">x</span>
      </div>
      <div class="input-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required v-model="form.email">
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required v-model="form.password">
      </div>
      <button class="login-btn" type="submit" :disabled="loading">Login</button>
    </form>
  </div>
</template>

<style>
.login-form {
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  margin: 0 15px;
}

.login-form h2 {
  text-align: center;
  margin-bottom: 2rem;
}

.login-btn {
  background-color: #1da968;
}

.btn-close {
  cursor: pointer;
  opacity: 0.8;
}
</style>