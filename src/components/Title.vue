<script setup>
import { fetchTitles } from "@/api/title";
import { ref, onMounted } from "vue";
const titles = ref(["BA", "AK"]);

const getTitles = async () => {
  try {
    titles.value = await fetchTitles();
  } catch (error) {
    console.error("Error fetching titles:", error);
  }
};

onMounted(() => {
    getTitles();
});

</script>


<template>
    <label>Title</label>
    <div class="d-flex flex-wrap">
        <div v-for="title in titles" :key="title" class="form-check form-check-inline me-4">
          <input type="checkbox" class="form-check-input" :id="title" />
          <label class="form-check-label" :for="title">{{ title }}</label>
        </div>
    </div>
</template>