<template>
  <div class="map-container">
    
    
    <!-- 這個 iframe 就是顯示地圖的地方 -->
    <div class="map-frame-wrapper">
      <iframe
        :src="mapUrl"
        :width="mapWidth"
        :height="mapHeight"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoogleMapEmbed',
  props: {
    // 這些是可以從外部傳入的參數
    shopName: {
      type: String,
      default: '我的店家'
    },
    mapUrl: {
      type: String,
      required: true  // 這個是必須的！
    },
    mapWidth: {
      type: String,
      default: '100%'
    },
    mapHeight: {
      type: String,
      default: '400'
    }
  }
}
</script>

<style scoped>


.map-frame-wrapper iframe {
  width: 100%;
  height: 200px;
  max-width: 100%;
}
</style>