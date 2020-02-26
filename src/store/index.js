import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

let _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/cars",
  timeout: 3000
});
let _jobsApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/jobs",
  timeout: 3000
})

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cars: [],
    jobs: [],
    activeCar: {},
    activeJob: {},

  },
  mutations: {
    //NOTE first argument of a mutationn is always the state
    // the second is always the payload
    setCars(state, cars) {
      state.cars = cars;
    },
    addCar(state, car) {
      state.cars.push(car);
    },
    removeCar(state, id) {
      state.cars = state.cars.filter(c => c._id != id);
    },
    setActiveCar(state, car) {
      state.activeCar = car;
    },
    setActiveJob(state, job) {
      state.activeJob = job
    },
    setJobs(state, payload) {
      state.jobs = payload
    }
  },
  actions: {
    //NOTE the first argument of an action is always an object, destructuring allows us to only grab what we need
    async getCars({ commit, dispatch }) {
      try {
        let res = await _api.get("");
        //NOTE Commits trigger mutations by name (first arguement), and provide a payload (second argument)
        // you may only pass two arguments the name of the mutation and the payload
        commit("setCars", res.data.data); //NOTE the res.data.data is the sandbox api way of providing data
      } catch (error) {
        console.error(error);
      }
    },
    async getJobs({ commit }) {
      try {
        let res = await _jobsApi.get("")
        commit("setJobs", res.data.data)
      } catch (error) {
        console.error(error)
      }
    },

    async getCarById({ commit, dispatch }, id) {
      try {
        let res = await _api.get(id);
        commit("setActiveCar", res.data.data); //NOTE the res.data.data is the sandbox api way of providing data
      } catch (error) {
        console.error(error);
        // NOTE Push changes the route to the provided route by name
        router.push({ name: "Home" });
      }
    },
    async getJobById({ commit, dispatch }, id) {
      try {
        let res = await _jobsApi.get(id);
        commit("setActiveJob", res.data.data); //NOTE the res.data.data is the sandbox api way of providing data
      } catch (error) {
        console.error(error);
        // NOTE Push changes the route to the provided route by name
        router.push({ name: "Home" });
      }
    },
    async createCar({ commit, dispatch }, newCar) {
      try {
        let res = await _api.post("", newCar);
        // dispatch("getCars");
        commit("addCar", res.data.data);
        // NOTE after the car is created, send them to the car details page for that car
        router.push({
          name: "CarDetails",
          params: { carId: res.data.data._id }
        });
      } catch (error) {
        console.error(error);
      }
    },
    async deleteCar({ commit, dispatch }, carId) {
      try {
        let res = await _api.delete(carId);
        // dispatch("getCars");
        commit("removeCar", carId);
        commit("setActiveCar", {});
      } catch (error) {
        console.error(error);
      }
    },
    setActiveCar({ commit }, car) {
      commit("setActiveCar", car);
    },
    setActiveJob({ commit }, Job) {
      commit("setActiveJob", Job);
    },
  }
});
