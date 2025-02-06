<template>
  <div class="col-sm-9 p3 border d-flex flex-column h-100">
    <div class="bg-light p-2 d-flex flex-column flex-grow-1">
      <div class="d-flex justify-content-end gap-2 mb-3">
        <button class=" btn btn-primary my-2">auto_update_execute</button>
        <button class=" btn btn-primary my-2">manual_update_execute</button>
        <button 
          class="btn my-2"
          :class="logSwitchOn ? 'btn-danger' : 'btn-primary'" 
          @click="toggleLogSwitch"
        >
          {{ logSwitchOn ? "Log/On" : "Log/Off" }}
        </button>
      </div>

      <!-- Log Window -->
      <div class="flex-grow-1">
        <textarea ref="logWindow" class="form-control h-100" readonly v-model="logs"></textarea>
      </div>

      <div class="d-flex justify-content-end gap-2">
        <button class=" btn btn-primary my-2" @click="clearLog">clear_log</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from "vue";
import axios from "axios";

const logs = ref(""); // 存储日志内容
const logWindow = ref(null); // 用于滚动 textarea
let logInterval = null; // 定时器 ID
const logSwitchOn = ref(true); // 记录日志开关状态（默认开启）

// 监听 logs 变化并自动滚动
watch(logs, async () => {
  await nextTick(); // 确保 DOM 已更新
  if (logWindow.value) {
    logWindow.value.scrollTop = logWindow.value.scrollHeight;
  }
});

// 模拟从服务器获取日志的函数（你可以替换为真实 API）
const fetchLogs = async () => {
  try {
    if (!logSwitchOn.value) return; // 如果开关关闭，不获取日志
    const response = await axios.get("/api/logs"); // 假设你的 API 是 /api/logs
    logs.value += response.data + "\n"; // 追加新日志
  } catch (error) {
    console.error("日志获取失败:", error);
  }
};

// 切换日志开关
const toggleLogSwitch = () => {
  logSwitchOn.value = !logSwitchOn.value;
  if (!logSwitchOn.value && logInterval) {
    clearInterval(logInterval); // 关闭日志获取
    logInterval = null;
  } else if (logSwitchOn.value) {
    logInterval = setInterval(fetchLogs, 2000); // 重新启动日志获取
  }
};

// 清空日志
const clearLog = () => {
  logs.value = "";
};

// 组件加载时启动定时拉取日志
onMounted(() => {
  fetchLogs(); // 页面加载时立即获取一次
  logInterval = setInterval(fetchLogs, 2000); // 每 2 秒获取一次日志
});

// 组件卸载时清除定时器，防止内存泄漏
onUnmounted(() => {
  if (logInterval) {
    clearInterval(logInterval);
  }
});
</script>

<style scoped>
textarea {
  font-family: monospace;
  white-space: pre-wrap;
  overflow-y: auto;
}
</style>