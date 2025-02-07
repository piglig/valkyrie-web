<template>
    <div class="container-fluid h-100">
      <div class="row h-100">
        <Sidebar />
        <h4 id="slogan" class="col-sm-2 text-center align-self-center">Data Extraction Settings</h4>
        <div id="data-extract" class="col-sm-7 p-3 border bg-secondary text-white">
            <BasicAddon startMsg="Since" endMsg="Until" />
            
            <!-- <label>Until</label>
            <input type="number" class="form-control" placeholder="YYYYMMDDHHMMSS" aria-describedby="basic-addon1"/> -->

          <!-- <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1">@</span>
            <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">
        </div> -->
  
          
  
          <div class="form-group mt-3">
            <label>Services</label>
            <div class="d-flex flex-wrap">
              <div v-for="service in services" :key="service" class="form-check form-check-inline">
                <input type="checkbox" class="form-check-input" :id="service" />
                <label class="form-check-label" :for="service">{{ service }}</label>
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
  import { ref } from "vue";
  
  const keywords = ref(["BA", "AK", "CTA", "NOVA", "AZ", "MJ"]);
  const services = ref(["5ch", "wiki", "X", "Pixiv", "YouTube", "ADJUST"]);
  </script>
  
  <style scoped>
  .form-group {
    max-width: 500px;
  }
  </style>
  