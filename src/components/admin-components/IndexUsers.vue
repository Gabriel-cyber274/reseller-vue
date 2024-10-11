<script setup>
import { ref, onMounted } from 'vue'
import { environment } from '../../environment'
import axios from 'axios'
import VueApexCharts from 'vue3-apexcharts'
import { useToast } from 'vue-toastification'


const userInfo = JSON.parse(localStorage.user_info)
const toast = useToast()

// const name = ref('')
const allTime = ref(null)
const thisYear = ref(null)
const thisMonth = ref(null)
const thisWeek = ref(null)
const thisToday = ref(null)
const monthlyOnboarding = ref([])
const topReseller = ref([])
const series = ref([])
const topResellerChart = ref({
  chart: {
    type: 'bar',
    stacked: false // Stacking is optional, change to `true` if you want to stack bars
  },
  plotOptions: {
    bar: {
      horizontal: false, // Use vertical bars
      columnWidth: '50%'
    }
  },
  colors: ['#00E396', '#008FFB', '#FF4560'], // Different colors for each series
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: [] // Names of the resellers will go here
  },
  yaxis: {
    title: {
      text: 'Amount / Count'
    }
  },
  title: {
    // text: 'Top Resellers',
    align: 'center'
  },
  legend: {
    position: 'top'
  }
})
const activeTab = ref('users')

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
      name: 'User Count',
      data: [] // Initialize with an empty array
    }
  ]
})

const setActiveTab = (tab) => {
  activeTab.value = tab
}

onMounted(() => {
  console.log(userInfo)

  getAllUsersData()
})

const getAllUsersData = async () => {
  try {
    // Define headers with Bearer token
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}` // Ensure `token` is defined or passed
      }
    }

    // Fetch all-time users
    const allTimeResponse = await axios.get(`${environment.app_url}/users/all-time`, config)
    allTime.value = allTimeResponse.data.users

    // Fetch users this year
    const thisYearResponse = await axios.get(`${environment.app_url}/users/this-year`, config)
    thisYear.value = thisYearResponse.data.users

    // // Fetch users this month
    const thisMonthResponse = await axios.get(`${environment.app_url}/users/this-month`, config)
    thisMonth.value = thisMonthResponse.data.users

    // // Fetch users this week
    const thisWeekResponse = await axios.get(`${environment.app_url}/users/this-week`, config)
    thisWeek.value = thisWeekResponse.data.users

    // // Fetch users today
    const thisTodayResponse = await axios.get(`${environment.app_url}/users/today`, config)
    thisToday.value = thisTodayResponse.data.users

    // fetch topsellers
    const thisResellerResponse = await axios.get(
      `${environment.app_url}/users/top-reseller`,
      config
    )
    topReseller.value = thisResellerResponse.data.chartData
    const resellerNames = topReseller.value.map((reseller) => reseller.name)
    const totalAmounts = topReseller.value.map((reseller) => reseller.total_amount)
    const highestDeposits = topReseller.value.map((reseller) =>
      parseFloat(reseller.highest_deposit)
    )
    const depositCounts = topReseller.value.map((reseller) => reseller.deposit_count)
    topResellerChart.value.xaxis.categories = resellerNames
    series.value = [
      {
        name: 'Total Deposit Amount',
        data: totalAmounts
      },
      {
        name: 'Highest Deposit Amount',
        data: highestDeposits
      },
      {
        name: 'Deposit Count',
        data: depositCounts
      }
    ]

    console.log(thisResellerResponse.data.chartData, 'seller')

    const monthlyOnboardingResponse = await axios.get(
      `${environment.app_url}/users/monthly-onboarding`,
      config
    )
    monthlyOnboarding.value = monthlyOnboardingResponse.data.onboarding
    const userCounts = monthlyOnboardingResponse.data.onboarding.map((item) => item.user_count)

    chartOptions.value.series[0].data = userCounts
  } catch (error) {
    // console.error('Error fetching users data:', error)
    toast.error(JSON.stringify(error));
  }
}
</script>
<template>
  <div class="row">
    <div class="col-md-6 col-xl-3">
      <div class="card stat-widget">
        <div class="card-body">
          <h5 class="card-title">All Time Users</h5>
          <h2 style="float: left !important">
            {{ allTime == null ? 'Loading' : allTime?.length.toLocaleString() }}
          </h2>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card stat-widget">
        <div class="card-body">
          <h5 class="card-title">Users This Year</h5>
          <h2 style="float: left !important">
            {{ thisYear == null ? 'Loading' : thisYear?.length.toLocaleString() }}
          </h2>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card stat-widget">
        <div class="card-body">
          <h5 class="card-title">Users This Month</h5>
          <h2 style="float: left !important">
            {{ thisMonth == null ? 'Loading' : thisMonth?.length.toLocaleString() }}
          </h2>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card stat-widget">
        <div class="card-body">
          <h5 class="card-title">Users This Week</h5>
          <h2 style="float: left !important">
            {{ thisWeek == null ? 'Loading' : thisWeek?.length.toLocaleString() }}
          </h2>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3">
      <div class="card stat-widget">
        <div class="card-body">
          <h5 class="card-title">Users Today</h5>
          <h2 style="float: left !important">
            {{ thisToday == null ? 'Loading' : thisToday?.length.toLocaleString() }}
          </h2>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-12 col-xl-8">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Top Resellers</h5>
          <div class="bar_chart" style="width: 100%">
            <!-- Display the bar chart -->
            <apexchart
              v-if="series.length > 0"
              type="bar"
              height="350"
              :options="topResellerChart"
              :series="series"
            />
            <p v-else>Loading chart data...</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-12 col-xl-4">
      <div class="card stat-widget">
        <div class="card-body">
          <h5 class="card-title">Top Resellers</h5>
          <div class="transactions-list" v-for="(seller, index) in topReseller" :key="index">
            <div class="tr-item">
              <div class="tr-company-name d-block" style="width: 100%">
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <div class="tr-icon tr-card-icon tr-card-bg-primary text-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-user"
                        data-v-inspector="src/views/Admin/dashboard/Skeleton.vue:191:33"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div class="tr-text">
                      <h4>{{ seller.user_details.name }}</h4>
                      <p>{{ seller.user_details.email }}</p>
                    </div>
                  </div>
                  <div>
                    <h4 class="d-block" style="font-size: 0.875rem">
                      {{ seller.deposit_count }} orders
                    </h4>
                    <h4 style="font-size: 0.875rem">
                      NGN {{ seller.total_amount.toLocaleString() }}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-sm-12 col-xl-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Users onboarded per month</h5>
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
