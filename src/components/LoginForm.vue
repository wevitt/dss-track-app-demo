<script setup lang="ts">
import { useApi } from '../composable/useApi'
import { reactive, ref } from 'vue'
import { AxiosResponse } from 'axios';

const mode = ref('login') // login, request, reset
const credentials = reactive({
  username: '',
  password: ''
})
const key = ref('')
const api = useApi()

const doLogin = async () => {
  const loginData = await api.post('Auth/Login', {...credentials}).catch(e => console.log(e))
  console.log(loginData.data.Item.Token)
  if(loginData) {
    const { data: { Item: { Token }} } = loginData
    document.cookie = 'dss-token=' + Token
    window.history.pushState({}, '', '/dss-track-app-demo/#/dashboard')
    window.dispatchEvent(new HashChangeEvent("hashchange"))
  }
}

const doResetRequest = async () => {
  const data = await api.get('Auth/RequestResetPassword', { params: { username : credentials.username }}).catch(e => console.log(e))
  console.log(data)
  mode.value = 'reset'
}

const doResetPassword = async () => {
  const data = await api.post('Auth/ResetPassword', {
    username: credentials.username,
    newPassword: credentials.password,
    key: key.value
  }).catch(e => console.log(e))
  console.log(data)
  mode.value = 'login'
}
</script>

<template>
  <div>
    <form v-if="mode === 'login'" @submit.prevent="doLogin">
      <div>
        <input
          v-model="credentials.username"
          type="text"
          name="usename"
          placeholder="Username"
        >
      </div>
      <div>
        <input
          v-model="credentials.password"
          type="password"
          name="password"
          placeholder="Password"
          autocomplete="current-password"
        >
      </div>
      <div>
        <button type="submit">Accedi</button>
      </div>
      <small><a href="#request" @click.prevent="mode = 'request'">Ho dimenticato la password</a></small>
    </form>
    <form v-if="mode === 'request'" @submit.prevent="doResetRequest">
      <div>
        <input
          v-model="credentials.username"
          type="text"
          name="usename"
          placeholder="Username"
        >
      </div>
      <div>
        <button type="submit">Richiedi reset password</button>
      </div>
      <small><a href="#login" @click.prevent="mode = 'login'">torna alla login</a></small>
    </form>
    <form v-if="mode === 'reset'" @submit.prevent="doResetPassword">
      <div>
        <input
          v-model="credentials.username"
          type="text"
          name="usename"
          placeholder="Username"
        >
      </div>
      <div>
        <input
          v-model="credentials.password"
          type="password"
          name="password"
          placeholder="Nuova Password"
          autocomplete="current-password"
        >
      </div>
      <div>
        <input
          v-model="key"
          type="text"
          name="string"
          placeholder="Chiave di reset"
        >
      </div>
      <div>
        <button type="submit">Resetta</button>
      </div>
      <small><a href="#login" @click.prevent="mode = 'login'">torna alla login</a></small>
    </form>
  </div>
</template>

<style>
button {
  margin: 10px 0;
}
</style>
