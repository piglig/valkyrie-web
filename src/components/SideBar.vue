<template>
  <div class="col-sm-3">
    <div class="sidebar bg-light">
      <div class="text-center my-4">
        <img src="@/assets/label.png" alt="Logo" class="logo" @click="navigator('/')"/>
      </div>
      <button v-for="btn in sidebarButtons" :key="btn.name" class="btn btn-primary w-100 my-2"
        @click="navigator(btn.route)">
        {{ btn.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const sidebarButtons = [
  { name: "data_extract", route: "/data-extract" },
  { name: "manual_update", route: "/manual-update" },
  { name: "auto_update", route: "/auto-update" },
  { name: "organize_overwrite", route: "/organize-overwrite" },
  { name: "settings", route: "/settings" },
  { name: "terminal", route: "/terminal" }
];

const navigator = (route) => {
  if (route) {
    router.push(route);
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
