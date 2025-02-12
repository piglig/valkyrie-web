<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <SideBar />
      <LogView />
    </div>
  </div>

</template>

<script setup>
    import SideBar from "@/components/SideBar.vue";
    import LogView from "@/components/LogView.vue";
</script>