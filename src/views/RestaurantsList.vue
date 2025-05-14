<template>
    <div>
        <div class="w-[300px] flex justify-start items-center mx-auto mb-8">
            <div class="deco"><h1 class="text-2xl text-black ml-2">為您推薦</h1></div>
        </div>

        <div  class="card-list">
            
                <ul class="flex flex-col gap-[14px] p-0 list-none">
                    <li v-for="(restaurant, index) in restaurants" :key="index" class="card  mx-auto">
                      <router-link class="flex flex-row gap-4 w-full items-start">
                        <figure>
                          <img :src="restaurant.image" class="w-[100px] h-[100px] rounded-lg  object-cover" alt="餐廳圖片">
                        </figure>
                        <div class="flex flex-col"> 
                          <div class="flex flex-row justify-between items-center">
                            <p class="name font-bold">{{ restaurant.name }}</p>
                            <font-awesome-icon :icon="['fad', 'heart']"  class="text-gray-300"/>

                          </div>  
                            
                            <p>⭐  {{ restaurant.rating }}</p>
                            <p class="address">{{ restaurant.address }}</p>
                        </div>
                      </router-link>
                    </li>
                  
                </ul>
             
        </div>
    </div>
    
  </template>
  
  <script>
import { ref } from 'vue';

export default {
  setup() {
    const restaurants = ref([
      {
        image: "https://hips.hearstapps.com/hmg-prod/images/1-1525230190.jpg",
        name: "王媽媽手作古早味",
        rating: 4.5,
        address: "新北市板橋區文化路一段100號之6，頂樓B室"
      },
      {
        image: "https://www.xianlaoman.com.tw/upload/products/20231101194532y2hnf.jpg",
        name: "老王牛肉麵",
        rating: 4.7,
        address: "台北市大安區信義路三段100號"
      },
      {
          image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
          name: "阿強排骨飯",
          rating: 4.6,
          address: "台北市中山區南京東路三段88號"
      },
      {
          image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
          name: "小林臭豆腐",
          rating: 4.3,
          address: "新北市板橋區中山路二段222號"
      },
      {
          image: "https://images.unsplash.com/photo-1570197781559-4e8e54b1c9cd",
          name: "大戶屋日式定食",
          rating: 4.8,
          address: "台中市西區美村路一段123號"
      }

    ]);

    return {
      restaurants
    };
  }
};
</script>
  
<style scoped>
.deco {
    border-left: 20px solid black;
    margin-top: 100px;
}

.card {
  border-radius: 12px;
  padding: 16px;
  width: 300px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.card a {
  text-decoration: none;
  color: inherit;
}

p {
    font-size: 12px;
    display: inline;
    text-align: left;
    line-height: 36px;
}

.name {
  display: inline-block;  
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 7em;  
}

.address {
  display: inline-block;  
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 12em;  
}



</style>
