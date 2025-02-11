<template>
    <div>
      <h1>Selected Service: {{ service }}</h1>
    </div>
  </template>
  
  <script setup>  
  defineProps({
    service: String,
  });
  </script>
  