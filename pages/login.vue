<template>
  <div class="container">
    <div class="header">
      <div class="header__left">
        <p class="header__title">Chat application</p>
        <img class="header__image" src="../assets/chat.svg" />
      </div>
      <nuxt-link to="/"> <p class="header__text">Home</p></nuxt-link>
      <div class="header__right">
        <nuxt-link to="/login" v:else><p class="header__options" v-if="!isLoggedIn">Login</p></nuxt-link>
        <nuxt-link to="/register"><p class="header__options" v-if="!isLoggedIn">Register</p></nuxt-link>
        <nuxt-link to="/"><p class="header__options" v-on:click="logout" v-if="isLoggedIn">Logout</p></nuxt-link>
      </div>
    </div>
    <div class="login-container">
      <div class="login__title">Login</div>
      <form @submit.prevent="pressed">
        <div class="login">
          <input type="text" id="email" placeholder="e-mail" v-model="email" />
        </div>
        <div class="password">
          <input type="password" id="password" placeholder="password" v-model="password"/>
        </div>
        <button v-on:click="login" class="login__button">Login</button>
      </form>
    </div>

    <div class="footer">
      <div class="footer__left">
        <p class="footer__title">Chat application</p>
        <img class="footer__image" src="../assets/chat.svg" />
      </div>
      <img class="footer__icon" src="../assets/facebook.svg" />
      <img class="footer__icon" src="../assets/instagram.svg" />
      <img class="footer__icon" src="../assets/twitter.svg" />
      <img class="footer__icon" src="../assets/viber.svg" />
      <img class="footer__icon" src="../assets/whatsapp.svg" />
      <p class="footer__description">Thank you for using!</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "login",
  data: function() {
    return {
      email: "",
      password: "",
      isLoggedIn: false
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(({ user }) => {
          this.$router.push("/");
        });
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
.login-container {
  background-image: url("../assets/chat-wallpaper-social-media.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.login {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.login__title {
  text-align: center;
  color: white;
  font-size: 30px;
  padding-top: 90px;
  font-weight: 700;
}

.header {
  display: flex;
  justify-content: space-between;
  background-color: dodgerblue;
}

.header__left {
  display: flex;
  align-items: center;
}

.header__title {
  padding-left: 20px;
  padding-right: 10px;
  color: white;
  font-size: 22px;
  font-weight: 700;
  min-width: 180px;
}

.header__image {
  width: 100px;
}

.header__text {
  color: white;
  font-size: 30px;
  font-weight: 700;
}

.header__right {
  display: flex;
  align-items: center;
}

.header__options {
  padding-right: 20px;
  color: white;
  font-size: 20px;
  font-weight: 500;
}

form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 96px;
}

input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}

.login__button {
  margin: 20px;
  display: flex;
  justify-content: center;
  width: 10%;
  padding: 10px;
  background-color: dodgerblue;
  color: white;
  font-size: 20px;
  font-weight: 700;
  border: 3px solid black;
  border-radius: 20px;
}

.footer {
  display: flex;
  background-color: dodgerblue;
  justify-content: space-between;
}

.footer__left {
  display: flex;
  align-items: center;
}

.footer__title {
  padding-left: 20px;
  padding-right: 10px;
  color: white;
  font-size: 22px;
  font-weight: 700;
  min-width: 180px;
}

.footer__image {
  width: 100px;
}

.footer__icon {
  width: 50px;
}

.footer__description {
  align-items: center;
  display: flex;
  padding-right: 20px;
  color: white;
  font-size: 20px;
  font-weight: 500;
}

</style>