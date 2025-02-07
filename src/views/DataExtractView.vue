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
                <div class="d-flex flex-wrap">
                    <div v-for="service in services" :key="service" class="form-check custom-checkbox form-check-inline">
                        <input type="checkbox" class="form-check-input" :id="service" />
                        <label class="form-check-label" :for="service">{{ service }}</label>
                    </div>
                </div>
            </div>

            <!-- Main Layout Row (List on Left, Details on Right) -->
            <div class="row g-1">
              <!-- Left: Services List -->
              <div class="col-md-2">
                <ul class="list-group">
                    <li v-for="service in services" 
                        :key="service" 
                        class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                        :class="{ active: selectedItem === service }" 
                        @click="selectItem(service)">
                        {{ service }}
                        <input type="checkbox" class="form-check-input" :id="service" />
                    </li>
                    
                </ul>
              </div>

              <!-- Right: Details Panel -->
              <div class="col-md-8">
                <div v-if="selectedItem" class="card p-3 shadow">
                  <h3>{{ selectedItem }}</h3>
                  <p>Detail information about {{ selectedItem }}</p>
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
  import { getChannels } from "@/api/channel";
  import { ref, onMounted } from "vue";
  
  const services = ref(["5ch", "Wiki"]);
  const selectedItem = ref(null); // Stores the clicked item's details

  const getChannel = async () => {
  try {
    services.value = await getChannels();
  } catch (error) {
    console.error("Error fetching channels:", error);
  }
};

onMounted(() => {
    if (services.value.length > 0) {
        selectedItem.value = services.value[0];
    }
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
  