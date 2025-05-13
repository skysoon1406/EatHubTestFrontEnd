<template>
    <div>
        <div class="box">
            <div class="deco"><h1>為您推薦</h1></div>
        </div>

        <div  class="card-list">
            <a href="">
                <ul>
                    <li v-for="(restaurant, index) in restaurants" :key="index" class="card">
                        <figure>
                          <img :src="restaurant.image" alt="餐廳圖片">
                        </figure>
                        <div class="cardText"> 
                          <div class="layout">
                            <p class="card-title name">{{ restaurant.name }}</p>
                            <font-awesome-icon :icon="['fad', 'heart']" class="custom-icon" />

                          </div>  
                            
                            <p>⭐  {{ restaurant.rating }}</p>
                            <p class="address">{{ restaurant.address }}</p>
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
            name: "王媽媽手作古早味傳統美食小吃專賣店（精緻點心、家常便當、人氣小吃、特色小火鍋）",
            rating: 4.5,
            address: "新北市板橋區文化路一段100號之6，頂樓B室",
            favorited: false
          },
          {
            image: "https://weieat.tw/wp-content/uploads/2023/06/DSC_0067.jpg", // 假圖片
            name: "老張滷肉飯",
            rating: 4.2,
            address: "新北市板橋區文化路一段100號之6，頂樓B室"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "新北市板橋區文化路一段100號之6，頂樓B室"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "新北市板橋區文化路一段100號之6，頂樓B室"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "新北市板橋區文化路一段100號之6，頂樓B室"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "新北市板橋區文化路一段100號之6，頂樓B室"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "新北市板橋區文化路一段100號之6，頂樓B室"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "新北市板橋區文化路一段100號之6，頂樓B室"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "新北市板橋區文化路一段100號之6，頂樓B室"
          },
          {
            image: "https://tokyo-kitchen.icook.network/uploads/recipe/cover/451887/5f4baab593923ebb.jpg", // 假圖片
            name: "好吃捲餅",
            rating: 4.8,
            address: "新北市板橋區文化路一段100號之6，頂樓B室"
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

.card img {
  width: 100px;
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

.custom-icon {
  color: 	#D3D3D3;
}

p {
    font-size: 12px;
    display: inline;
    text-align: left;
    line-height: 28px;
}

.name {
  display: inline-block;  
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 13ch;  
}

.layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.address {
  display: inline-block;  
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 20ch;  
}



</style>
