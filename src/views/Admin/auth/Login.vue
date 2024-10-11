<script setup>
import '../../../assets/plugins/bootstrap/css/bootstrap.min.css'
import '../../../assets/plugins/font-awesome/css/all.min.css'
import '../../../assets/plugins/perfectscroll/perfect-scrollbar.css'
import '../../../assets/css/main.min.css'
import '../../../assets/css/custom.css'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { environment } from '../../../environment'
import { useRouter } from 'vue-router'

// Form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const toast = useToast()
const router = useRouter()

// Login handler
const loginUser = async () => {
  const data = {
    email: email.value,
    password: password.value,
    remember: rememberMe.value
  }

  try {
    const response = await axios.post(`${environment.app_url}/login`, data)

    if (response.data.success) {
      toast.success(response.data.message)
      localStorage.setItem('user_info', JSON.stringify(response.data))
      //   router.push('/admin/dashboard')
      setTimeout(() => {
        window.location.href = '/admin/dashboard'
      }, 1000)
    } else if (!response.data.success && !response.data.errors) {
      toast.error(response.data.message)
    } else {
      Object.keys(response.data.errors).forEach((key) => {
        response.data.errors[key].forEach((error) => {
          toast.error(error)
        })
      })
    }
  } catch (error) {
    console.log(error)
    if (error.response && error.response.data) {
      toast.error(`Error: ${error.response.data.message}`)
    } else {
      toast.error('There was an error during login. Please try again.')
    }
  }
}

onMounted(() => {
  if (localStorage.user_info !== null || localStorage.user_info !== undefined) {
    localStorage.removeItem('user_info')
  }
})
</script>

<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col-md-12 col-lg-4">
          <div class="card login-box-container">
            <div class="card-body">
              <div class="authent-logo">
                <img src="../../../assets/images/logo@2x.png" alt="" />
              </div>
              <div class="authent-text">
                <p>Welcome to Reseller</p>
                <p>Please sign in to your account</p>
              </div>

              <!-- Login form -->
              <form @submit.prevent="loginUser">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      v-model="email"
                    />
                    <label for="floatingInput">Email address</label>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      v-model="password"
                    />
                    <label for="floatingPassword">Password</label>
                  </div>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="rememberMe"
                    v-model="rememberMe"
                  />
                  <label class="form-check-label" for="rememberMe">Remember me</label>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary m-b-xs">Sign In</button>
                </div>
              </form>

              <div class="authent-reg">
                <p>
                  Not registered?
                  <RouterLink to="/admin/register">Create an account</RouterLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
