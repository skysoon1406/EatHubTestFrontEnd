<template>

    <div class="w-full  max-w-full">
      <iframe
        :src="mapUrl"
        :width="mapWidth"
        :height="mapHeight"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

</template>

<script setup>
const props = defineProps({
  shopName: {
    type: String,
    default: '我的店家',
  },
  mapUrl: {
    type: String,
    required: true,
  },
  mapWidth: {
    type: String,
    default: '100%',
  },
  mapHeight: {
    type: String,
    default: '400',
  },
});
</script>
