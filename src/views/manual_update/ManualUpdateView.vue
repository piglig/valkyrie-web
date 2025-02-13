<template>
    <div class="container-fluid h-100">
      <div class="row h-100">
        <Sidebar />
        <div class="col-sm-10 p-3 border bg-secondary text-white">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { CHANNEL_ENUM } from "@/constant.js";
  import { getFormattedChannels } from "@/api/channel";
  import { ref, onMounted } from "vue";
  
  const services = ref([]);
  const selectedItem = ref(null); // Stores the clicked item's details

  const isPixiv = (selectedItem) => {
    return selectedItem.channel_tag === CHANNEL_ENUM.Pixiv;
  };

  const getFrontEnd = (selectedItem) => {
    return selectedItem?.config?.front_end || {};
  };

  const getChannel = async () => {
  try {
    services.value = await getFormattedChannels();
    if (services.value.length > 0) {
        selectedItem.value = services.value[0];
    }
  } catch (error) {
    console.error("Error fetching channels:", error);
  }
};

onMounted(() => {
    getChannel();
});

</script>
  
<style scoped src="@/assets/check_box.css">
.form-group {
  max-width: 500px;
}
</style>
  