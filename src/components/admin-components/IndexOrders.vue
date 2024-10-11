<script setup>
import { ref, onMounted } from 'vue'
import { environment } from '../../environment'
import axios from 'axios'
import VueApexCharts from 'vue3-apexcharts'
import { useToast } from 'vue-toastification'

const toast = useToast()
const userInfo = JSON.parse(localStorage.user_info)
const allTime = ref(null)
const thisYear = ref(null)
const thisMonth = ref(null)
const thisWeek = ref(null)
const thisToday = ref(null)
const monthlyOnboarding = ref([])

const chartOptions = ref({
  chart: {
    type: 'bar'
  },
  xaxis: {
    categories: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  },
  series: [
    {
      name: 'Orders Count',
      data: [] // Initialize with an empty array
    }
  ]
})

onMounted(() => {
  console.log(userInfo)

  getAllOrdersData()
})

const getAllOrdersData = async () => {
  try {
    // Define headers with Bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` // Ensure `token` is defined or passed
      }
    }

    // Fetch all-time orders
    const allTimeResponse = await axios.get(`${environment.app_url}/orders-all`, config)
    allTime.value = allTimeResponse.data.orders

    // Fetch orders this year
    const thisYearResponse = await axios.get(`${environment.app_url}/orders-allYearly`, config)
    thisYear.value = thisYearResponse.data.orders

    // // Fetch orders this month
    const thisMonthResponse = await axios.get(`${environment.app_url}/orders-allMonthly`, config)
    thisMonth.value = thisMonthResponse.data.orders

    // // Fetch orders this week
    const thisWeekResponse = await axios.get(`${environment.app_url}/orders-allWeekly`, config)
    thisWeek.value = thisWeekResponse.data.orders

    // // Fetch orders today
    const thisTodayResponse = await axios.get(`${environment.app_url}/orders-allDaily`, config)
    thisToday.value = thisTodayResponse.data.orders

    const monthlyOnboardingResponse = await axios.get(
      `${environment.app_url}/orders-allcreatedMonthly`,
      config
    )
    monthlyOnboarding.value = monthlyOnboardingResponse.data.orders
    const userCounts = monthlyOnboardingResponse.data.orders.map((item) => item.order_count)

    chartOptions.value.series[0].data = userCounts
  } catch (error) {
    console.error('Error fetching users data:', error)
    toast.error(JSON.stringify(error))
  }
}
</script>
<template>
  <div class="row">
    <div class="col-md-6 col-xl-3">
      <div class="card stat-widget">
        <div class="card-body">
          <h5 class="card-title">All Time</h5>
          <h2 style="float: left !important">
            {{ allTime == null ? 'Loading' : allTime?.length.toLocaleString() }}
          </h2>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card stat-widget">
        <div class="card-body">
          <h5 class="card-title">Annually</h5>
          <h2 style="float: left !important">
            {{ thisYear == null ? 'Loading' : thisYear?.length.toLocaleString() }}
          </h2>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card stat-widget">
        <div class="card-body">
          <h5 class="card-title">Monthly</h5>
          <h2 style="float: left !important">
            {{ thisMonth == null ? 'Loading' : thisMonth?.length.toLocaleString() }}
          </h2>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card stat-widget">
        <div class="card-body">
          <h5 class="card-title">Weekly</h5>
          <h2 style="float: left !important">
            {{ thisWeek == null ? 'Loading' : thisWeek?.length.toLocaleString() }}
          </h2>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card stat-widget">
        <div class="card-body">
          <h5 class="card-title">Daily</h5>
          <h2 style="float: left !important">
            {{ thisToday == null ? 'Loading' : thisToday?.length.toLocaleString() }}
          </h2>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12 col-xl-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Orders Placed per month</h5>
          <!-- <div id="apex1"></div> -->
          <div class="bar_chart" style="width: 100%">
            <apexchart
              type="bar"
              height="350"
              :options="chartOptions"
              :series="chartOptions.series"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
