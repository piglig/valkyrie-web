<template>
    <div class="col-sm-2 d-flex flex-column justify-content-center align-items-center vh-100">
        <button v-for="(btn, index) in mainButtons" :key="index" class="btn btn-outline-dark mb-3 w-50">
        {{ btn }}
        </button>
    </div>
</template>
  
  <script setup>
  import { ref } from "vue";
  
  // Main content buttons
  const mainButtons = ref(["5ch", "wiki", "pixiv", "youtube", "Twitter(X)", "ADJUST"]);
  </script>
  
  <style scoped>
 
  
  </style>
  