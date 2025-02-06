<template>
  <div class="col-sm-3">
    <div class="sidebar bg-light">
      <div class="text-center my-4">
        <img src="@/assets/label.png" alt="Logo" class="logo" />
      </div>
      <button v-for="btn in sidebarButtons" :key="btn" class="btn btn-primary w-100 my-2">
        {{ btn }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarButtons: ["data_extract", "manual_update", "auto_update", "organize_overwrite", "settings", "terminal"],
    };
  }
};
</script>

<style scoped>
.sidebar {
  height: 100vh;
  padding: 10px;
}
.logo {
  max-width: 80%;
  height: auto;
}

</style>
