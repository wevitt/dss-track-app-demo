<script setup lang="ts">
  import { useApi } from '../composable/useApi'
  import { ref, onMounted } from 'vue'

  interface Veichle {
    Alarms: Array<string>,
    AllowExternal: Boolean,
    ArchivedALarms: Array<string>
    CodeRequired: Boolean
    Contracts: void | Array<string>
    Devices: Array<string>
    Drivers: Array<string>
    EnforceEscort: Boolean
    Escorts: Array<string>
    Groups: Array<string>
    ID: string
    ID2: string
    ID3: void | string
    Model: string
    OperatorNote: void | string
    ServiceProfile: Object
  }

  const api = useApi()
  const veichles = ref([])

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
    if(response) {
      const Items = response.data.Items
        veichles.value = Items
    }
  }

  onMounted(() => {
    fetchVeichles()
  })
</script>
<template>
  <div>
    <button type="button" @click="fetchVeichles">Lista veicoli</button>
    <p>Trovati {{veichles.length }}</p>
    <div class="vehicles-list">
      <div
        v-for="vehicle in veichles"
        :key="vehicle.ID"
        class="vehicles-list__item"
      >
        {{ vehicle.Groups[0].Description || vehicle.ID2 }}<br/>{{ vehicle.ID }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.vehicles-list {
  display: flex;
  flex-wrap: wrap;
}
.vehicles-list__item {
  background-color: #575757;
  padding: 10px;
  color: white;
  margin: 5px;
  border-radius: 5px;
}
</style>