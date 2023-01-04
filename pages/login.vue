<template>
  <v-main>
    <div>
      <div class="login-form">
        <div>
          <img id="logo" src="@/assets/images/logo.png" />
          <div id="logo-text">Weather Forecast</div>
        </div>

        <div id="welcome-container">
          <small
            >Welcome to the weather forecase web application. Please login with
            your Github user to use the application and view the weather in your
            city.</small
          >
        </div>
        <v-btn color="black" flat @click="login()" to="/"
          ><img
            class="mr-2"
            width="20"
            src="@/assets/images/github-icon-white.png"
            alt="icon"
          />Login with github
        </v-btn>
      </div>
    </div>
  </v-main>
</template>

<script lang="ts">
export default defineComponent({
  name: "login-page",
});
</script>

<script setup lang="ts">
definePageMeta({
  layout: "empty",
});

const login = () => {
  window.location.href = `http://localhost:8000/api/login/github`
};
</script>

<style scoped>
main {
  height: 100vh;
  max-height: 100vh;
  display: grid;
  place-content: center;
}

.login-form {
  width: clamp(17rem, 70vw, 30rem);
  text-align: center;
}

#logo {
  width: clamp(4rem, 20vw, 7rem);
}

#logo-text {
  margin-top: clamp(-0.9rem, 12vw, -1.3rem);
  font-size: clamp(1.3rem, 5vw, 1.8rem);
  font-weight: bold;
}

#welcome-container {
  margin: 0.5rem 0 clamp(3rem, 7vw, 5rem);
}
</style>
