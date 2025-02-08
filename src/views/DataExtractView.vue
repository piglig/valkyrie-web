<template>
    <div class="container-fluid h-100">
      <div class="row h-100">
        <Sidebar />
        <h4 id="slogan" class="col-sm-2 text-center align-self-center">Data Extraction Settings</h4>
        <div id="data-extract" class="col-sm-7 p-3 border bg-secondary text-white">
        <BasicAddon basicTitle="Data Extraction" startMsg="Since" endMsg="Until" />
            
          <div class="container mt-2">
            <div id="services" class="form-group mb-2">
                <label>Services</label>
            </div>

            <!-- Main Layout Row (List on Left, Details on Right) -->
            <div class="row g-1">
              <!-- Left: Services List -->
              <div class="col-md-3">
                <ul class="list-group">
                    <li v-for="service in services" 
                        :key="service" 
                        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        :class="{ active: selectedItem === service }" 
                        @click="selectItem(service)">
                        {{ service.channel_name }}
                        <input type="checkbox" class="form-check-input" :id="service.channel_tag" />
                    </li>
                    
                </ul>
              </div>

              <!-- Right: Details Panel -->
              <div class="col-md-8">
                <div v-if="selectedItem" class="card p-3 shadow">
                  <h3>{{ selectedItem.channel_name }}</h3>
                  <p>Detail information about {{ selectedItem }}</p>

                  <div v-if="isPixiv(selectedItem)" class="form-group">
                      <label>Age Limit </label>
                      <div class="d-flex flex-wrap">
                        <div class="form-check form-check-inline" v-for="option in getFrontEnd(selectedItem).pixiv_age_limit" :key="option.tag">
                          <input type="checkbox" class="form-check-input" :id="'pixiv-age-' + option.tag" />
                          <label class="form-check-label" :for="'pixiv-age-' + option.tag">{{ option.text }}</label>
                        </div>
                      </div>
                      
                  </div>
                </div>
                <div v-else class="text-center text-muted">
                  <p>Select an item from the list</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from "@/components/Sidebar.vue";
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
};
</script>
  
<style scoped src="@/assets/check_box.css">
  .form-group {
    max-width: 500px;
  }
</style>
  