<template>
  <div class="container">
    <h1>Hello, <em>{{ user?.username ?? 'Guest' }}</em></h1>

    <div v-if="!user">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <input v-model="registerForm.username" placeholder="Username (any)" />
        <input v-model="registerForm.email" placeholder="Email" type="email" />
        <input v-model="registerForm.password" placeholder="Password" type="password" />
        <input v-model="registerForm.birthdate" placeholder="Birthdate YYYY-MM-DD" type="date" />
        <button type="submit">Register</button>
      </form>

      <h2>Login</h2>
      <form @submit.prevent="login">
        <input v-model="loginForm.email" placeholder="Email" type="email" />
        <input v-model="loginForm.password" placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </form>
    </div>

    <div v-else>
      <button @click="logout">Logout</button>
      <button @click="fetchMe">Refresh Me</button>
    </div>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface User {
  id: string
  username: string
  email?: string
}

const user = ref<User | null>(null)
const error = ref<string>('')

const registerForm = ref({ username: '', email: '', password: '', birthdate: '' })
const loginForm = ref({ email: '', password: '' })

async function register() {
  error.value = ''
  try {
    const { data, error: fetchErr } = await useFetch('/api/register', {
      method: 'POST',
      body: registerForm.value
    })
    if (fetchErr.value) throw fetchErr.value
    user.value = data.value as User
  } catch (e: any) {
    error.value = e?.statusMessage || e?.message || 'Registration failed'
  }
}

async function login() {
  error.value = ''
  try {
    const { data, error: fetchErr } = await useFetch('/api/login', {
      method: 'POST',
      body: loginForm.value
    })
    if (fetchErr.value) throw fetchErr.value
    user.value = data.value as User
  } catch (e: any) {
    error.value = e?.statusMessage || e?.message || 'Login failed'
  }
}

async function logout() {
  await useFetch('/api/logout', { method: 'POST' })
  user.value = null
}

async function fetchMe() {
  try {
    const { data } = await useFetch('/api/me')
    user.value = data.value as User
  } catch {
    user.value = null
  }
}

fetchMe()
</script>

<style scoped>
.container { max-width: 400px; margin: 2rem auto; font-family: sans-serif; }
input { display: block; margin: 0.5rem 0; width: 100%; padding: 0.4rem; }
button { margin-top: 0.5rem; }
.error { color: red; margin-top: 1rem; }
</style>
