<template>
  <Navbar></Navbar>
  {{ cc }}
  <Footer></Footer>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '@/axios';
import CouponCard from '@/components/CouponCard.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useRoute, useRouter } from 'vue-router';


const route = useRoute();
const uuid = route.params.uuid;


console.log(uuid);


const cc = ref(null);


onMounted(async () => {
  try {
    const res = await axios.get(`/promotions/${uuid}/`);

    cc.value = res.data;
  } catch (err) {}
});
</script>
