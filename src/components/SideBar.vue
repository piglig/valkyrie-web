<template>
  <div class="col-2 h-100 p-0">
    <div class="sidebar bg-light">
      <div class="my-2 align-self-center">
        <img src="@/assets/label.png" alt="Logo" class="logo" @click="navigator('/')"/>
      </div>

      <ul class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
        <li v-for="btn in sidebarButtons" :key="btn.name" class="nav-item"
          >
          <div v-if="btn.submenu" class="dropdown">
            <a class="nav-link dropdown-toggle"
            :class="{ active: isDropdownActive(btn.name) }" 
              @click="toggleDropdown(btn.name)"
            id="dropdownMenuButton">
              {{ btn.name }}
            </a>

            <!-- Dropdown Items -->
            <ul class="dropdown-menu" :class="{ show: isDropdownActive(btn.name) }">
              <li class="dropdown" v-for="service in dropdownItems[btn.name]" :key="service.channel_tag">
                <a class="dropdown-item"
                 :class="{ active: isActive(service.route) }"
                 @click="navigator(service.route)">
                  {{ service.channel_name }}
                </a>
              </li>
            </ul>
          </div>
            
           <!-- Normal Sidebar Links -->
           <a v-else class="nav-link"
             :class="{ active: isActive(btn.route) }"
             @click="navigator(btn.route)"
             >
            {{ btn.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { getFormattedChannels } from "@/api/channel";
import { ref, onMounted } from "vue";

const router = useRouter();
const route = useRoute();

const activeDropdown = ref(null);
const dropdownItems = ref({
  manual_update: [],
  auto_update: [],
});

const sidebarButtons = [
  { name: "data_extract", route: "/data-extract" },
  { name: "manual_update", route: "/manual-update", submenu: true },
  { name: "auto_update", route: "/auto-update", submenu: true },
  { name: "organize_overwrite", route: "/organize-overwrite" },
  { name: "settings", route: "/settings" },
  { name: "terminal", route: "/terminal" }
];

const navigator = (route) => {
  if (route) {
    router.push(route);
    activeDropdown.value = null;
  }
};

const isDropdownActive = (dropdownName) => {
  // 如果当前路径与 dropdownName 的 route 匹配，也应当高亮
  const parentRoute = sidebarButtons.find(btn => btn.name === dropdownName)?.route;
  return route.path === parentRoute || dropdownItems.value[dropdownName]?.some(item => route.path === item.route);
};


// Function to check if a button should be marked as active
const isActive = (buttonRoute) => {
  console.log(route.path, buttonRoute);
  return route.path === buttonRoute;
};

// Toggle dropdown visibility
const toggleDropdown = (dropdownName) => {
  const parentRoute = sidebarButtons.find(btn => btn.name === dropdownName)?.route;
  if (parentRoute) {
    router.push(parentRoute); // 让父菜单也能跳转
  }
  activeDropdown.value = activeDropdown.value === dropdownName ? null : dropdownName;
};

const fetchDropdownItems = async () => {
  try {
    const serviceData = await getFormattedChannels();

    // const serviceData = [
    //   {
    //     channel_tag: 1,
    //     channel_name: "Twitter",
    //     route: "/manual-update/twitter"
    //   },
    //   {
    //     channel_tag: 2,
    //     channel_name: "Wiki",
    //     route: "/manual-update/wiki"
    //   }
    // ]
    dropdownItems.value.manual_update = serviceData;
    dropdownItems.value.auto_update = serviceData;
  } catch (error) {
    console.error("Error fetching dropdown items:", error);
  }
}


// Fetch dropdown data when component is mounted
onMounted(fetchDropdownItems);
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

/* Dropdown menu positioning */
.dropdown-menu {
  position: absolute;
  left: 100%;
  top: 0;
  margin-left: 10px;
}
</style>
