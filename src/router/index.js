import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import CarDetails from "../views/CarDetails.vue";
import Cars from "../views/Cars.vue";
import Jobs from "../views/Jobs.vue";
import JobDetails from "../views/JobDetails"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/car/:carId",
    name: "CarDetails",
    component: CarDetails
  },
  {
    path: "/cars",
    name: "Cars",
    component: Cars
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: Jobs
  },
  {
    path: "/job/:jobId",
    name: "JobDetails",
    component: JobDetails
  },
  {
    // NOTE sends user back to home on bad address
    path: "*",
    redirect: "/"
  }
];

const router = new VueRouter({
  routes
});

export default router;
