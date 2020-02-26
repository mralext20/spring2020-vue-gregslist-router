<template>
  <div class="car-details">
    <h1>job DETAILS .VUE</h1>
    <div v-if="details._id">{{ details }}</div>
    <button @click="deleteCar">delete</button>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "CarDetails",
  mounted() {
    // NOTE if we have no cars in state
    if (!this.$store.state.jobs.length) {
      // NOTE Go get the car by its id
      this.$store.dispatch("getJobById", this.$route.params.jobId);
    } else {
      let job = this.$store.state.jobs.find(
        job => job._id == this.$route.params.jobId
      );
      // NOTE otherwise, set the car as the active car, based on its ID
      if (!job) {
        router.push({ name: "Home" });
      }
      this.$store.dispatch("setActiveJob", job);
    }
  },
  computed: {
    details() {
      return this.$store.state.activeJob;
    }
  },
  methods: {
    deleteCar() {
      this.$store.dispatch("deleteCar", this.details._id);
    }
  }
};
</script>

<style></style>
