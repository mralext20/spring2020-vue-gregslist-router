<template>
  <div class="car col-3">
    <router-link :to="{ name: 'JobDetails', params: { jobId: this.jobData._id } }">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">{{ jobData.company }} - {{ jobData.jobTitle }}</h5>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Job",
  //NOTE child components 'catch' information in props
  props: ["jobData"],
  methods: {
    setActive() {
      this.$store.dispatch("setActiveJob", this.jobData);
    }
  }
};
</script>

<style scoped>
.car {
  cursor: pointer;
}
</style>
