<template>
    <div class="container mt-2">
        <div class="row h-100">

            <div class="container mt-4">
                <h3>手動更新・{{ serviceName }}</h3> 
            </div>
            
            <div class="container mt-4">
                <div class="d-flex align-items-center justify-content-between">
                    <button class="btn btn-primary btn-lg px-4 py-3 shadow"
                     :class="{ disabled: !file }"
                     @click="handleUpload">アップロード</button>
                    <div
                        class="file-drop-zone border rounded d-flex flex-column align-items-center justify-content-center"
                        @dragover.prevent
                        @drop="handleDrop"
                        @click="selectFile"
                    >
                            <input type="file" ref="fileInput" class="d-none" @change="handleFileUpload" />
                            <p v-if="!file" class="upload-text">
                                ここにSocial Insightから取得したデータをアップロード
                            </p>
                            <div v-if="file" class="preview mt-3">
                            <p><strong>File:</strong> {{ file.name }}</p>
                            <div class="progress mt-2" style="width: 100%">
                                <div
                                    class="progress-bar"
                                    :style="{ width: progress + '%' }"
                                    role="progressbar"
                                    :aria-valuenow="progress"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                ></div>
                            </div>
                        </div>
                    </div>
            </div>
    </div>
</div>    
</div>
</template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from "vue-router";


  const route = useRoute();
  const serviceName = route.query.service_name;
  
  const file = ref(null);
  const progress = ref(0);
  const fileInput = ref(null);
  
  const selectFile = () => {
    fileInput.value.click();
  };
  
  const handleFileUpload = (event) => {
    file.value = event.target.files[0];
    uploadFile();
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    file.value = event.dataTransfer.files[0];
    uploadFile();
  };
  
  const uploadFile = () => {
    if (!file.value) return;
    
    const fakeUploadInterval = setInterval(() => {
      if (progress.value >= 100) {
        clearInterval(fakeUploadInterval);
      } else {
        progress.value += 10;
      }
    }, 300);
  };
  </script>
  
  <style scoped>  
  /* 文件上传区域 */
  .file-drop-zone {
      width: 60%;
      height: 280px;
      border: 2px dashed rgba(255, 255, 255, 0.7);
      background-color: rgba(255, 255, 255, 0.1);
      text-align: center;
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

      /* Explicitly reset box model */
      box-sizing: border-box !important;
      font-size: inherit !important;
      line-height: normal !important;
  }
  
  .file-drop-zone:hover {
      background-color: rgba(255, 255, 255, 0.2);
      border-color: white;
  }
  
  /* 上传区域的文字样式 */
  .upload-text {
      font-size: 20px;
      font-family: 'Noto Sans JP', sans-serif;
      font-weight: bold;
      color: white;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
      text-align: center;
  }
  </style>
