<script setup>
import { ref, onMounted } from "vue";
import { fetchTitles } from "@/api/title";

defineProps({
  startMsg: {
    type: String,
    required: true,
  },
  endMsg: {
    type: String,
    required: true,
  },
  maxLength: {
      type: Number,
      required: false,
      default: 16,
  }
})

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

// Define the multi-line text as a variable
const promptText = ref(`いつから
Since より遅い時間を記入してください
Until より早い時間を記入してください
14桁の数字、分割なし、
年月日時分秒で記入します
24時間制を使用する`)
</script>

<template>
    <div class="container mt-4">
      <form>
        <blockquote class="blockquote">
            <p id="prompt" class="mb-3 text-white fw-bold" v-text="promptText"></p>
        </blockquote>
        

        <div class="form-row">
            <div class="form-group col-md-3">
                <label>{{ startMsg }}</label>
                <input type="text" class="form-control" placeholder="YYYYMMDDHHMMSS"/>
            </div>
        </div>

        <div class="form-group col-md-3">
            <label>{{ endMsg }}</label>
            <input type="text" class="form-control" placeholder="YYYYMMDDHHMMSS"/>
        </div>

        <div class="form-group col-md-3">
            <label>Title</label>
            <div class="d-flex flex-wrap">
              <div v-for="title in titles" :key="title" class="form-check form-check-inline">
                <input type="checkbox" class="form-check-input" :id="title" />
                <label class="form-check-label" :for="title">{{ title }}</label>
              </div>
            </div>
        </div>
      </form>
    </div>
</template>

<style scoped>
#prompt {
  white-space: pre-line; /* Ensures new lines are preserved */
}
</style>