import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRestaurantStore = defineStore(
  'restaurant',
  () => {
    const restaurants = ref([]);
    const dishResult = ref('');
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
      restaurants.value = data.restaurants;
      dishResult.value = data.dish;
    };

    const setSelections = (selections) => {
      userSelections.value = selections;
    };

    return {
      restaurants,
      dishResult,
      userSelections,
      setResults,
      setSelections,
    };
  },
  {
    persist: true,
  }
);
