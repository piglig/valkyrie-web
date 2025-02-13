<template>
  <div class="container mt-2">
      <div class="row h-100">

          <div class="container mt-4">
              <h3>自動更新・{{ serviceName }}</h3> 
          </div>
          <div v-if="isNormalChannel(serviceTag)">
            <div class="form-group col-sm-3 mt-2">
              <TitleSelect></TitleSelect>
            </div>
          </div>
          <div v-else-if="serviceTag === CHANNEL_ENUM.X">
            <p>該当機能は開放されていませんごめんね</p>
          </div>
          <div v-else-if="serviceTag === CHANNEL_ENUM.Adjust">
            <p>設定できるオプションはありませんでした~</p>
          </div>
    </div>
  </div>
</template>
  
<script setup>
  import TitleSelect from "@/components/Title.vue";
  import { CHANNEL_ENUM } from "@/constant.js";
  import { useRoute } from "vue-router";


  const route = useRoute();
  const serviceName = route.query.service_name;
  const serviceTag = Number(route.query.service_tag);

  const isNormalChannel = function (serviceTag) {
    return serviceTag === CHANNEL_ENUM.FiveCh || serviceTag === CHANNEL_ENUM.Wiki || 
      serviceTag === CHANNEL_ENUM.Youtube || serviceTag === CHANNEL_ENUM.Pixiv;
  };
</script>
  