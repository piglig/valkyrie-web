<template>
  <div class="col-sm-9 p3 border d-flex flex-column h-100">
    <div class="bg-light p-2 d-flex flex-column flex-grow-1">
      <div class="d-flex flex-row gap-2 mb-3 justify-content-between">
        <div class="d-flex gap-2">
          <button class=" btn btn-primary my-2">auto_update_execute</button>
          <button class=" btn btn-primary my-2">manual_update_execute</button>
        </div>

        <button 
          class="btn my-2"
          :class="logSwitchOn ? 'btn-danger' : 'btn-primary'" 
          @click="toggleLogSwitch"
        >
          {{ logSwitchOn ? "Log/On" : "Log/Off" }}
        </button>
      </div>

      <!-- Log Window -->
      <h4>LOG</h4>
      <div class="flex-grow-1">
        <textarea 
          ref="logWindow" 
          class="bg-black text-white form-control h-100"
          readonly 
          v-model="logs"
          @mouseenter="isCursorInside = true" 
          @mouseleave="isCursorInside = false"
        ></textarea>
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

const logs = ref(""); // 绑定到 textarea
const logsArray = ref([]); // 存储日志数组
const logWindow = ref(null);
let logInterval = null;
const logSwitchOn = ref(true); // 记录日志开关状态
const isCursorInside = ref(false); // Track whether cursor is inside textarea

const MAX_LOG_LINES = 2000; // 设置最大日志行数

// 监听 logsArray 的变化，并批量更新 logs
watch(logsArray, async () => {
  logs.value = logsArray.value.join("\n"); // 合并数组为字符串，减少 Vue 计算
  await nextTick();
  if (logWindow.value) {
    logWindow.value.scrollTop = logWindow.value.scrollHeight;
  }
});

// 获取日志并优化性能
const fetchLogs = async () => {
  if (!logSwitchOn.value) return;
  try {
    const eventSource = new EventSource(import.meta.env.VITE_BASE_URL +"/logs/stream");
    eventSource.onmessage = (event) => {
      const newLogs = event.data.split("\n"); // 按行拆分日志
      logsArray.value.push(...newLogs); // 追加新日志到数组
    }

    // const response = await axios.get("/api/logs"); // 假设 API 返回的是新日志内容
    // const newLogs = response.data.split("\n"); // 按行拆分日志
    // logsArray.value.push(...newLogs); // 追加新日志到数组

    // **超过 MAX_LOG_LINES 时，丢弃旧日志**
    if (logsArray.value.length > MAX_LOG_LINES) {
      logsArray.value.splice(0, logsArray.value.length - MAX_LOG_LINES);
    }

    // **Update logs.value explicitly to force Vue reactivity**
    logs.value = logsArray.value.join("\n");
    // **Auto-scroll only if cursor is outside textarea**
    if (!isCursorInside.value) {
      await nextTick();
      if (logWindow.value) {
        logWindow.value.scrollTop = logWindow.value.scrollHeight;
      }
    }
  } catch (error) {
    console.error("日志获取失败:", error);
  }
};

// 切换日志开关
const toggleLogSwitch = () => {
  logSwitchOn.value = !logSwitchOn.value;
  if (!logSwitchOn.value && logInterval) {
    clearInterval(logInterval); // 停止日志拉取
    logInterval = null;
  } else if (logSwitchOn.value) {
    logInterval = setInterval(fetchLogs, 2000);
  }
};

// 清空日志
const clearLog = () => {
  logsArray.value = [];
  logs.value = "";
};

// 组件加载时启动定时拉取日志
onMounted(() => {
  fetchLogs(); // 立即获取一次日志
  logInterval = setInterval(fetchLogs, 2000);
});

// 组件卸载时清除定时器
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