<template>
<div class="header">
      <div class="header__left">
        <p class="header__title">Chat application</p>
        <img class="header__image" src="../assets/chat.svg" />
      </div>
      <p class="header__text" v-if="isLoggedIn">Welcome, {{currentUser.email}}</p>
      <div class="header__right">
        <nuxt-link to="/login" v:else><p class="header__options" v-if="!isLoggedIn">Login</p></nuxt-link>
        <nuxt-link to="/register"><p class="header__options" v-if="!isLoggedIn">Register</p></nuxt-link>
        <nuxt-link to="/"><p class="header__options" v-on:click="logout" v-if="isLoggedIn">Logout</p></nuxt-link>
      </div>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
  data() {
    return {
      newName: "",
      newContent: "",
      tweets: [],
      isLoggedIn: false,
      currentUser: false,
    };
  },
  created(){
    if(firebase.auth().currentUser){
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser;
    }
  },
  methods: {
    logout: function (){
      firebase.auth().signOut().then(() => {
        this.$router.push('/login');
      });
    },
    addTweet(e) {
      e.preventDefault();
      const newTweet = {
        username: this.newName,
        content: this.newContent,
        like: false,
        replies: [],
        id: Math.random()
      };
      this.tweets.push(newTweet);
    },
    clearForm() {
      this.newName = "";
      this.newContent = "";
    },
    handleSubmit(e) {
      this.addTweet(e);
      this.clearForm();
    },
    like(id) {
      let findedTweet = this.tweets.find(e => e.id === id);
      findedTweet.like = !findedTweet.like;
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
</style>