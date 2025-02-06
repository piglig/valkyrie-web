<template>
  <div class="container-fluid vh-100">
    <div class="row h-100">
      <SidebarOne />
      <LogView />
    </div>
  </div>

</template>

<script setup>
    import SidebarOne from "@/components/SideBar.vue";
    import LogView from "@/components/LogView.vue";
</script>