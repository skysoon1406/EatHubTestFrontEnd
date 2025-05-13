<template>
  <div>
    <h1>Home</h1>
    <nav>
      <ul>
        <li>
          <a class="btn" href="/signup">
            <font-awesome-icon :icon="['fas', 'user-plus']" />
            註冊
          </a>
        </li>
        <li>
          <a class="btn" href="/login">
            <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
            登入
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>
