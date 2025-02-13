<script setup>
import { ref } from "vue";
import TitleSelect from "@/components/Title.vue";

defineProps({
  basicTitle: {
    type: String,
    required: true,
  },
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
      <h3>{{ basicTitle }}</h3> 
      <form>
        <blockquote class="blockquote">
            <p id="prompt" class="mb-3 text-white fw-bold" v-text="promptText"></p>
        </blockquote>
        

        <!-- Input row with labels and tilde perfectly centered -->
        <div class="row mb-3">
            <div class="d-flex align-items-center w-50">
                <!-- Start Input -->
                <div class="d-flex flex-column flex-grow-1">
                    <label class="mb-1">{{ startMsg }}</label>
                    <input type="datetime-local" class="form-control"/>
                </div>

                <!-- Tilde (~) perfectly centered -->
                <div class="d-flex align-items-center justify-content-center px-3 fw-bold" style="height: 38px;">
                    ~
                </div>

                <!-- End Input -->
                <div class="d-flex flex-column flex-grow-1">
                  <label class="mb-1">{{ endMsg }}</label>
                  <input type="datetime-local" class="form-control"/>
                </div>
            </div>
        </div>

        <div class="form-group col-sm-3 mt-2">
            <TitleSelect></TitleSelect>
        </div>
      </form>
    </div>
</template>

<style scoped>
#prompt {
  white-space: pre-line; /* Ensures new lines are preserved */
}
</style>