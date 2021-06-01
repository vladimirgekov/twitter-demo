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

    <div class="register">
      <div class="register__title">Registration</div>
      <form class="register__form">
        <div class="register__data">
          <div class="register__text">Enter your user name</div>
          <input class="register__input" type="text" placeholder="user name" />
        </div>
        <div class="register__data">
          <div class="register__text">Enter your e-mail</div>
          <input class="register__input" type="e-mail" id="email" placeholder="e-mail" v-model="email"/>
        </div>
        <div class="register__data">
          <div class="register__text">Enter your password</div>
          <input class="register__input" type="password" id="pasword" placeholder="password" v-model="password"/>
        </div>
        <div class="register__data">
          <div class="register__text">Confirm your password</div>
          <input class="register__input" type="password" id="confirm_password" placeholder="confirm password" v-model="confirmPassword"/>
        </div>
      </form>
      <button v-on:click="register" class="register__button">Register</button>
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
      <p class="footer__description">Thank you for using</p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "register",
  data: function() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      displayname: "",
      isLoggedIn: false
    };
  },
  methods: {
    register: function(e) {
      if(this.password===this.confirmPassword){
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(({ user }) => {
          this.$router.push("/");
        });
      e.preventDefault();
      } else {
        alert("Password does not matched!");
      }
    }
  }
};
</script>

<style scoped>
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
.register {
  padding: 100px 0px;
  background-image: url("../assets/chat-wallpaper-social-media.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.register__title {
  text-align: center;
  color: white;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 50px;
}
.register__form {
  background: dodgerblue;
  width: 50%;
  margin: 0 auto;
  padding: 10px;
  border: 2px solid black;
  border-radius: 20px;
  flex-direction: column;
  margin-bottom: 50px;
}
.register__data {
  margin: 0 auto;
  max-width: 77%;
  margin-bottom: 10px;
}
.register__name {
  display: flex;
}
.register__text {
  color: white;
  font-size: 20px;
}
.register__input {
  width: 100%;
  padding: 15px 20px;
}
.register__name__text {
  color: white;
  font-size: 20px;
}
.register__name__input {
  width: 100%;
  padding: 10px 20px;
}
.register__button {
  margin: 0 auto;
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