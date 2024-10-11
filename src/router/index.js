import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Admin/auth/Register.vue'
import Login from '../views/Admin/auth/Login.vue'
import Dashboard from '../views/Admin/dashboard/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin/register',
      name: 'admin-register',
      component: Register
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: Login
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user_info') !== null

  // Check if the route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login page or any other route
    next({ name: 'admin-login' }) // Make sure you have a route named 'login'
  } else {
    next() // Allow access to the route
  }
})

export default router
