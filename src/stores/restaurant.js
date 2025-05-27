import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRestaurantStore = defineStore(
  'restaurant',
  () => {
    const restaurants = ref([]);
    const recentViewedRestaurants = ref([]);
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

    const setRecentViewedRestaurant = (restaurant) => {
      recentViewedRestaurants.value = recentViewedRestaurants.value.filter(
        (r) => r.placeId !== restaurant.placeId,
      );

      recentViewedRestaurants.value.unshift(restaurant);

      if (recentViewedRestaurants.value.length > 12) {
        recentViewedRestaurants.value = recentViewedRestaurants.value.slice(
          0,
          12,
        );
      }
    };

    return {
      restaurants,
      dishResult,
      userSelections,
      recentViewedRestaurants,
      setResults,
      setSelections,
      setRecentViewedRestaurant,
    };
  },
  {
    persist: true,
  },
);
