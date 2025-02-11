<template>
    <div class="container-fluid h-100">
      <div class="row h-100">
        <Sidebar />
        <!-- <ServiceBar /> -->
         <router-view></router-view>
        <div class="col-sm-8 p-3 border bg-secondary text-white">
          <BasicAddon basicTitle="Manual Update" startMsg="Since" endMsg="Until" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import ServiceBar from "@/views/ServiceBar.vue";
  import BasicAddon from "@/components/BasicAddon.vue";
  import { getFormattedChannels } from "@/api/channel";
  import { ref, onMounted } from "vue";
  
  const services = ref([]);
  const selectedItem = ref(null); // Stores the clicked item's details
  const ChannelEnum = Object.freeze({
    Twitter: 1,
    Wiki: 2,
    X: 3,
    Pixiv: 4,
    Youtube: 5,
    Adjust: 6,
  });

  const isPixiv = (selectedItem) => {
    return selectedItem.channel_tag === ChannelEnum.Pixiv;
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

// Handle item selection
const selectItem = (item) => {
  selectedItem.value = item;

  if (isPixiv(item)) {
    // Ensure `pixiv_age_limit` exists before accessing `checkedOptions`
    if (!selectedItem.value.pixiv_age_limit) {
      selectedItem.value.pixiv_age_limit = {};
    }
  }
};

</script>
  
<style scoped src="@/assets/check_box.css">
  .form-group {
    max-width: 500px;
  }
</style>
  