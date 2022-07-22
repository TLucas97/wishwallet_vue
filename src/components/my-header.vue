<template>
  <div class="header">
    <div class="d-flex justify-space-between align-center">
      <router-link :to="logoRoute">
        <div class="d-flex">
          <div>
            <img src="../assets/img/klever-logo.png" width="35" />
          </div>
          <div>
            <h2 class="pl-3 white--text">Klever challenge</h2>
          </div>
        </div>
      </router-link>
      <div>
        <router-link to="/login">
          <v-btn color="purple" class="white--text">{{ signButton }}</v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    signButton: {
      type: String,
      default: "Sign-in",
    },
    logoRoute: {
      type: String,
      default: "/",
    },
  },
};
</script>

<style scoped>
.header {
  width: 100%;
  padding: 0.7em;
  position: fixed;
  top: 0;
  background: #13152a;
  z-index: 1000;
}
</style>
