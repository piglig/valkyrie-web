<template>
    <div class="login-container d-flex align-items-center justify-content-center vh-100">
      <div class="card login-card shadow-lg p-4">
        <h2 class="text-center mb-4">Login</h2>
  
        <form @submit.prevent="handleLogin">
          <!-- Email Input -->
          <div class="mb-3">
            <label for="email" class="form-label">Email Address</label>
            <input 
              type="email" 
              class="form-control" 
              id="email" 
              v-model="email"
              placeholder="Enter your email" 
              required
            />
          </div>
  
          <!-- Password Input -->
          <div class="mb-3 position-relative">
            <label for="password" class="form-label">Password</label>
            <div class="input-group">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                class="form-control" 
                id="password" 
                v-model="password"
                placeholder="Enter your password" 
                required
              />
              <button class="btn btn-outline-secondary" type="button" @click="togglePassword">
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
          </div>
  
          <!-- Remember Me Checkbox -->
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="rememberMe" v-model="rememberMe" />
            <label class="form-check-label" for="rememberMe">Remember Me</label>
          </div>
  
          <!-- Login Button -->
          <button 
            type="submit" 
            class="btn btn-primary w-100" 
            :disabled="loading"
          >
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            {{ loading ? ' Logging in...' : 'Login' }}
          </button>
  
          <!-- Forgot Password & Register -->
           <!-- Forgot Password -->
          <!-- <div class="mt-3 text-center">
            <a href="#" class="text-decoration-none">Forgot Password?</a> |
            <a href="#" class="text-decoration-none">Register</a>
          </div> -->
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { login } from "@/api/login";

  const router = useRouter();
  
  const email = ref("");
  const password = ref("");
  const rememberMe = ref(false);
  const showPassword = ref(false);
  const loading = ref(false);
  const errorMessage = ref("");
  
  // Toggle Password Visibility
  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
  
  // Handle Login
  const handleLogin = async () => {
    loading.value = true;
    errorMessage.value = "";

    try {
        const response = await login(email.value, password.value)

      // Store JWT in localStorage or sessionStorage
      localStorage.setItem("jwt_token", response.token);
      
      // Redirect to home
      router.push("/home");
    } catch (error) {
        errorMessage.value = "Login failed. Please check your credentials.";
        console.error("Error logging in:", error);
    } finally {
        loading.value = false;
    }
  };
  </script>
  
  <style scoped>
  /* Centering the Login Card */
  .login-container {
    background-color: #f8f9fa;
  }
  
  .login-card {
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
  }
  </style>
  