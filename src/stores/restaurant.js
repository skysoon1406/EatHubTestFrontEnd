import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRestaurantStore = defineStore(
  'restaurant',
  () => {
    const restaurants = ref([]);
    const userSelections = ref({
      flavors: [],
      mains: [],
      staples: [],
      userLocation: {
        latitude: null,
        longitude: null,
      },
    });

    const setResults = (data) => {
      restaurants.value = data;
    };

    const setSelections = (selections) => {
      userSelections.value = selections;
    };

    return {
      restaurants,
      userSelections,
      setResults,
      setSelections,
    };
  },
  {
    persist: true,
  }
);
