<template>
  <div class="Jobs row">
    <div class="col-12 text-right">
      <button v-if="!jobForm" @click="jobForm = true" class="btn btn-success">Add-Job</button>
      <button v-else @click="jobForm = false" class="btn btn-danger">cancel</button>
    </div>
    <div class="col-12">
      <create-job v-if="jobForm" />
    </div>
    <!-- NOTE Props are data passed from parent to child component -->
    <job v-for="job in jobs" :key="job._id" :jobData="job" />
  </div>
</template>

<script>
import Job from "../components/Job";
import createJob from "../components/CreateJob";
export default {
  name: "Jobs",
  mounted() {
    //NOTE mounted is fired when the component is 'mounted' to the page
    //NOTE '$' is a reference to the Root instance (main.js)
    this.$store.dispatch("getJobs");
  },
  data() {
    return {
      page: 0,
      jobForm: false
    };
  },
  //NOTE Computed's are watching the store for changes (observers) and are reactive to change
  //NOTE Computeds can be treated like getters (variable properties) and should always be used when getting data from the state
  computed: {
    //NOTE Computeds must always return a value
    jobs() {
      let data = this.$store.state.jobs;

      //   return this.$store.state.cars.slice(this.page, this.page + 3);
      return data;
    }
  },
  components: {
    Job,
    createJob
  }
};
</script>

<style></style>
