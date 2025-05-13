<template>
    <div>
        <div class="box">
            <div class="deco"><h1>為您推薦</h1></div>
        </div>

        <div  class="card-list">
            <a href="">
                <ul>
                    <li v-for="(restaurant, index) in restaurants" :key="index" class="card card-side bg-base-100 shadow-sm">
                        <figure>
                          <img :src="restaurant.image" alt="餐廳圖片" width="150" height="150">
                        </figure>
                        <div class="cardText">    
                            <p class="card-title">{{ restaurant.name }}</p>
                            <p>⭐  {{ restaurant.rating }}</p>
                            <p>{{ restaurant.address }}</p>
                        </div>
                    </li>
                </ul>
            </a>
        </div>
    </div>
    
  </template>
  
  <script>
  export default {
    data() {
      return {
       
        restaurants: [
          {
            image: "https://hips.hearstapps.com/hmg-prod/images/1-1525230190.jpg", // 假圖片
            name: "小王拉麵",
            rating: 4.5,
            address: "台北市中正區忠孝西路"
          },
          {
            image: "https://weieat.tw/wp-content/uploads/2023/06/DSC_0067.jpg", // 假圖片
            name: "老張滷肉飯",
            rating: 4.2,
            address: "台北市大安區四維路"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "台北市信義區基隆路"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "台北市信義區基隆路"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "台北市信義區基隆路"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "台北市信義區基隆路"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "台北市信義區基隆路"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "台北市信義區基隆路"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "台北市信義區基隆路"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "台北市信義區基隆路"
          }
        ]
      };
    }
  };
</script>
  
<style scoped>
.box {
    width: 300px ;
    display: flex;
    justify-content: left; 
    align-items: center; 
    margin: auto;
    margin-bottom: 30px;
}


.deco {
    border-left: 20px solid black;
    margin-top: 100px;

}

h1 {
    color: black;
    font-size: 30px;
    margin-left: 10px;   
}

img {
    width: 100px;
    height: auto;
    border-radius: 8px;
  }

.card-list ul {
  display: flex;
  flex-direction: column;
  gap: 14px; 
  padding: 0;
  list-style: none;
}

.card {
  border-radius: 12px;
  padding: 16px;
  width: 180px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s;
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.card:hover {
  transform: translateY(-4px);
}

.card img {
  border-radius: 8px;
  margin-bottom: 10px;
}

.card a {
  text-decoration: none;
  color: inherit;
}

li.card {
    width: 300px;
    margin: auto;
}

.cardText {
    display: flex;
    flex-direction: column;
}

p {
    font-size: 12px;
    display: inline;
    text-align: left;
    line-height: 28px;
}


</style>
