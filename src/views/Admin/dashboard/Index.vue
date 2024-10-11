<script setup>
import Skeleton from './Skeleton.vue'
import { ref, onMounted } from 'vue'
import { environment } from '../../../environment'
import axios from 'axios'
import IndexUsers from '../../../components/admin-components/IndexUsers.vue'
import IndexOrders from '../../../components/admin-components/IndexOrders.vue'

const userInfo = JSON.parse(localStorage.user_info)
const name = ref('')

const activeTab = ref('users')

const setActiveTab = (tab) => {
  activeTab.value = tab
}

onMounted(() => {
  console.log(userInfo)
  name.value = userInfo.user.name
})
</script>
<template>
  <skeleton>
    <div class="page-content">
      <div class="main-wrapper">
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <div class="card shadow-sm stat-widget mb-2">
              <div class="card-body p-3">
                <div class="d-flex align-items-center mb-3">
                  <div
                    class="rounded-circle bg-light d-flex justify-content-center align-items-center"
                    style="width: 60px; height: 60px"
                  >
                    <i class="ri-user-line text-primary" style="font-size: 30px"></i>
                  </div>

                  <div class="ms-3">
                    <h1 class="h4 mb-0">Good day, {{ name }}</h1>

                    <h6 class="card-title mb-0 text-muted d-flex align-items-center">
                      <!-- Conditional Rendering for Verified and Unverified Status -->

                      <template v-if="userInfo.user.email_verified_at !== null">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          class="me-2 h-5 w-5 flex-shrink-0 text-success"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span class="mt-1">Verified account</span>
                      </template>

                      <template v-else>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          class="me-2 h-5 w-5 flex-shrink-0 text-danger"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3m0 3h.01M12 6a9 9 0 100 18 9 9 0 000-18z"
                          />
                        </svg>
                        <span class="mt-1">Unverified account</span>
                      </template>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 col-lg-12">
            <div class="card table-widget mb-3">
              <div class="card-body pt-0">
                <div class="table-responsive">
                  <div class="d-flex p-3 align-items-center">
                    <!-- Users Tab -->
                    <h6
                      class="me-3"
                      :class="{ 'active-tab': activeTab === 'users' }"
                      @click="setActiveTab('users')"
                    >
                      Users
                    </h6>

                    <!-- Orders Tab -->
                    <h6
                      class="me-3"
                      :class="{ 'active-tab': activeTab === 'orders' }"
                      @click="setActiveTab('orders')"
                    >
                      Orders
                    </h6>

                    <!-- Products Tab -->
                    <h6
                      class="me-3"
                      :class="{ 'active-tab': activeTab === 'products' }"
                      @click="setActiveTab('products')"
                    >
                      Products
                    </h6>

                    <!-- Account Tab -->
                    <h6
                      :class="{ 'active-tab': activeTab === 'account' }"
                      @click="setActiveTab('account')"
                    >
                      Balance
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <template v-if="activeTab === 'users'">
          <IndexUsers />
        </template>

        <template v-if="activeTab === 'orders'">
          <IndexOrders />
        </template>
      </div>
    </div>
  </skeleton>
</template>

<style scoped>
.active-tab {
  position: relative; /* Required for the ::after positioning */
  color: #007bff; /* Color for the active tab */
  cursor: pointer;
}

.active-tab::after {
  content: ''; /* Necessary for the pseudo-element */
  position: absolute; /* Position relative to the text */
  left: 0; /* Align with the left edge of the text */
  bottom: -2px; /* Adjust distance from the text */
  width: 100%; /* Full width of the text */
  height: 3px; /* Thickness of the underline */
  background-color: #007bff; /* Color for the underline */
  border-radius: 2px; /* Optional: rounded edges */
}

/* Styling for non-active tabs */
h6 {
  cursor: pointer;
  color: #6c757d; /* Default color for non-active tabs */
}

/* Add hover effect if needed */
h6:hover {
  color: #0056b3; /* Hover color for tabs */
}
</style>
