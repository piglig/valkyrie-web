<template>
    <div class="row g-1">
      <label>Keywords Setting</label>
      <div class="mb-2 d-flex gap-2" v-if="items.length > 0">
        <div v-for="item in items" :key="item.way_tag" class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            :id="'checkbox-' + item.way_tag"
            :value="item.way_tag"
            v-model="selectedItems"
          />
          <label class="form-check-label" :for="'checkbox-' + item.way_tag">
            {{ item.way_name }}
          </label>
        </div>
      </div>
      <div v-else>Loading...</div>
      <!-- Display textareas based on checked checkboxes -->
      <div class="mt-1">
        <!-- <h4>Details Panel</h4> -->
        <div v-for="id in selectedItems" :key="'textarea-' + id" class="mb-3">
          <label :for="'textarea-' + id" class="form-label">Details for {{ getItemName(id) }}</label>
          <textarea class="form-control" :id="'textarea-' + id" v-model="details[id]"></textarea>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
    import { getKeywordWays } from "@/api/keyword";
    import { ref, onMounted } from "vue";

    const items = ref([]);
    const selectedItems = ref([]);
    const details = ref({});

    const getKeywordWay = async () => {
        try {
            items.value = await getKeywordWays();
        } catch (error) {
            console.error("Error fetching channels:", error);
        }
    };

    // Get item name by Tag
    const getItemName = (way_tag) => {
        const item = items.value.find((item) => item.way_tag === way_tag);
        return item ? item.way_name : "Unknown";
    };
  
    // Fetch items when the component is mounted
    onMounted(getKeywordWay);
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  </style>
  