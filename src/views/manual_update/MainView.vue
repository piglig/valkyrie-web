<template>
  <div class="container mt-2">
    <div class="row h-100">
        <div v-if="isNormalChannel(serviceTag)">
          <BasicAddon :basicTitle="`手動更新・${serviceName} ${serviceTag}`" startMsg="Since" endMsg="Until" />
        </div>
        <div v-else-if="serviceTag === CHANNEL_ENUM.X">
          <h1>111</h1>
        </div>
    </div>
  </div>
</template>
  
<script setup>
  import { CHANNEL_ENUM } from "@/constant.js";
  import { useRoute } from "vue-router";
  import BasicAddon from "@/components/BasicAddon.vue";


  const route = useRoute();
  const serviceName = route.query.service_name;
  const serviceTag = Number(route.query.service_tag);

  const isNormalChannel = function (serviceTag) {
    return serviceTag === CHANNEL_ENUM.FiveCh || serviceTag === CHANNEL_ENUM.Wiki || 
      serviceTag === CHANNEL_ENUM.Youtube || serviceTag === CHANNEL_ENUM.Pixiv || serviceTag === CHANNEL_ENUM.Adjust;
  };
</script>
  