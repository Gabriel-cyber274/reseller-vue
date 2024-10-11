<script setup>
import '../../../assets/plugins/bootstrap/css/bootstrap.min.css'
import '../../../assets/plugins/font-awesome/css/all.min.css'
import '../../../assets/plugins/perfectscroll/perfect-scrollbar.css'
import '../../../assets/css/main.min.css'
import '../../../assets/css/custom.css'
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { environment } from '../../../environment'
import { useRouter } from 'vue-router'

// Form state
const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const termsAgreed = ref(false)

const toast = useToast()
const router = useRouter()

// Submit handler
const registerUser = async () => {
  if (!termsAgreed.value) {
    toast.error('Please agree to the terms and conditions.')
    return
  }

  // Create form data
  const data = {
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value
    // admin: true
  }

  try {
    const response = await axios.post(`${environment.app_url}/register`, data)

    if (response.data.success) {
      toast.success(response.data.message)
      router.push('/admin/login')
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
    if (error.response && error.response.data) {
      toast.error(`Error: ${error.response.data.message}`)
    } else {
      toast.error('There was an error during registration. Please try again.')
    }
  }
}
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
                <p>Enter your details to create your account</p>
              </div>

              <!-- Form with v-model binding -->
              <form @submit.prevent="registerUser">
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="Fullname"
                      v-model="name"
                    />
                    <label for="floatingInput">Fullname</label>
                  </div>
                </div>
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInput1"
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
                <div class="mb-3">
                  <div class="form-floating">
                    <input
                      type="password"
                      class="form-control"
                      id="floatingPassword1"
                      placeholder="Confirm Password"
                      v-model="password_confirmation"
                    />
                    <label for="floatingPassword">Confirm Password</label>
                  </div>
                </div>
                <div class="mb-3 form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                    v-model="termsAgreed"
                  />
                  <label class="form-check-label" for="exampleCheck1">
                    I agree to the <a href="#">Terms and Conditions</a>
                  </label>
                </div>
                <div class="d-grid">
                  <button type="submit" class="btn btn-primary m-b-xs">Register</button>
                </div>
              </form>

              <div class="authent-login">
                <p>
                  Already have an account?
                  <RouterLink to="/admin/login">Sign in</RouterLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
