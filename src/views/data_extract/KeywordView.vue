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
    <div class="mt-1 position-relative">
      <div v-for="id in selectedItems" :key="'textarea-' + id" class="mb-3">
        <!-- Label with Tooltip -->
        <label
          :for="'textarea-' + id"
          class="form-label position-relative"
          @mouseover="showTooltip(id, $event)"
          @mouseleave="hideTooltip"
        >
          <strong>{{ getItemName(id) }}</strong> Setting
        </label>

        <!-- Tooltip Card -->
        <div
          v-if="hoveredItem === id"
          class="tooltip-card"
          :style="tooltipStyle"
        >
            <!-- <strong>{{ tooltipContent.title }}</strong> -->
            <blockquote>
                <p id="prompt" class="mb-3 text-white fw-bold" v-text="tooltip.content"></p>
            </blockquote>
        </div>

        <!-- Unique text area for each selected checkbox -->
        <textarea class="form-control" :id="'textarea-' + id"  v-model="textValues[id]" 
          :placeholder="placeholder"></textarea>
      </div>
    </div>


    </div>
  </template>
  
  <script setup>
    import { getKeywordWays } from "@/api/keyword";
    import { ref, onMounted } from "vue";

    const items = ref([]);
    const selectedItems = ref([]);
    const textValues = ref({}); // Object to store text values for each checkbox
    const details = ref({});
    const hoveredItem = ref(null);
    const tooltipStyle = ref({ top: "0px", left: "0px" });

    // Customizable tooltip content
    const tooltip = ref({
        title: "Keyword Setting Info",
        content: `実際の作業で使われるキーワード半角の「,」で分割して、\n「;」で終了\n\n事前に記入してください\n\nすべてのキーワードはOr関係になる、一つでも当たれば抽出される`
    });

    const placeholder = ref("Enter keywords here\nkeyword:ブルアカ,buruaka,先生;");

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

    // Ensure each selected checkbox has a corresponding text field
    const initializeTextField = (id) => {
        if (!textValues.value[id]) {
            textValues.value[id] = "";
        }
    };

    // Show tooltip with dynamic positioning
    const showTooltip = (id, event) => {
        hoveredItem.value = id;
        tooltipStyle.value = {
            top: `${event.target.offsetTop - 10}px`,
            left: `${event.target.offsetLeft + event.target.offsetWidth + 10}px`
        };
    };

    // Hide tooltip
    const hideTooltip = () => {
        hoveredItem.value = null;
    };
  
    // Fetch items when the component is mounted
    onMounted(getKeywordWay);
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }

  #prompt {
  white-space: pre-line; /* Ensures new lines are preserved */
}

  /* Tooltip Styling */
.tooltip-card {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 12px;
  max-width: 300px;
  z-index: 10;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
}
  </style>
  