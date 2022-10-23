<script setup lang="ts">
  import { useApi } from '../composable/useApi'
  import { reactive, ref } from 'vue'

  const api = useApi()

  const getCookie = (cname: string): string =>  {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const fetchVeichles = async () => {
    const token = getCookie('dss-token')
    const response = await api.get('AVehicle/GetByCurrentUser', { 
      headers: {
        Authorization: 'bearer ' + token,
        Accept: 'application/json'
      }
    }).catch(e => console.log(e))
    console.log(response)
  }
</script>
<template>
  <div>
    <button type="button" @click="fetchVeichles">Lista veicoli</button>
  </div>
</template>