<template>
  <div class="container">
    <div class="header">
      <div class="header__left">
        <p class="header__title">Chat application</p>
        <img class="header__image" src="../assets/chat.svg" />
      </div>
      <p class="header__text" v-if="currentUser">Welcome,{{ currentUser.email }}</p>
      <div class="header__right">
        <nuxt-link to="/login" v:else><p class="header__options" v-if="!isLoggedIn">Login</p></nuxt-link>
        <nuxt-link to="/register"><p class="header__options" v-if="!isLoggedIn">Register</p></nuxt-link>
        <nuxt-link to="/"><p class="header__options" v-on:click="logout" v-if="isLoggedIn">Logout</p></nuxt-link>
      </div>
    </div>

    <div class="main">
      <form class="main__form" v-on:submit="handleSubmit">
        <div class="main__form__username">
          <div class="main__form__username__info">
            <img class="main__form__user__photo" src="../assets/user-big.png" />
            <label class="main__form__username__text"></label>
          </div>
          <input class="main__form__username__input" v-model="newName" placeholder="Enter your name"/>
        </div>
        <div class="main__form__tweet">
          <label class="main__form__tweet__text">Tweet</label>
          <textarea class="main__form__tweet__input" v-model="newContent" placeholder="What's happening?" rows="5" cols="10"/>
        </div>
        <button class="main__form__tweet__button">Submit tweet</button>
      </form>

      <div class="tweets-container">
        <h1 class="tweets__title">Tweets</h1>
        <div class="tweets" v-for="tweet in tweets" :key="tweet.id">
          <div class="tweets__info">
            <img class="main__form__user__photo" src="../assets/user-big.png" />
            <h2 class="tweets__name">{{ tweet.username }} post:</h2>
          </div>
          <p class="tweets__content">{{ tweet.tweetContent }}</p>
          <div class="button-container">
            <img :src="`${tweet.isLiked ? require('../assets/star.png'): require('../assets/emptystar.png')}`"
              v-on:click="() => like(tweet.id)" :key="tweet.id"/>
          </div>
        </div>
      </div>
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
import firebase from 'firebase';
import { auth, StoreDB } from "~/plugins/firebase.js";
export default {
  data() {
    return {
      newName: "",
      newContent: "",
      tweets: [],
      isLoggedIn: false,
      currentUser: false
    };
  },
  async created() {
    if(firebase.auth().currentUser){
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser;
    }
    const tweetsSnapshots = await StoreDB.collection("tweets");
    tweetsSnapshots.onSnapshot(querySnapshot => {
      querySnapshot.docs.forEach(doc => {
        const databaseTweet = doc.data();
        const foundLocalTweet = this.tweets.find(el => el.id === doc.id);
        if (!foundLocalTweet) {
          this.tweets.push({ id: doc.id, ...databaseTweet });
        } else if (foundLocalTweet.isLiked !== databaseTweet.isLiked) {
          foundLocalTweet.isLiked = databaseTweet.isLiked
        }
      });
    });
  },
  methods: {
    async writeToFirestore(username, tweetContent) {
      const ref = StoreDB.collection("tweets");
      const tweets = {
        username,
        tweetContent,
        isLiked: false
      };
      try {
        await ref.add(tweets);
      } catch (e) {
        console.error(e);
      }
    },
    logout: function() {
      auth.signOut().then(() => {
        this.$router.push("/login");
      });
    },
    addTweet(e) {
      e.preventDefault();
      this.writeToFirestore(this.newName, this.newContent);
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
      StoreDB.collection("tweets").doc(id).update({
        isLiked: !findedTweet.isLiked,
      })
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

.main {
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  background-image: url("../assets/chat-wallpaper-social-media.webp");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.main__form {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 50px;
  background-color: dodgerblue;
  border-radius: 20px;
  border: 3px solid black;
}

.main__form__username__info {
  display: flex;
  align-items: center;
}

.main__form__user__photo {
  width: 50px;
}

.main__form__username {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 50px;
}

.main__form__username__text {
  padding-left: 15px;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
}

.main__form__username__input {
  font-size: 20px;
  width: 45%;
  padding: 15px;
  border-radius: 10px;
  border: 2px solid black;
}

.main__form__tweet {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
}

.main__form__tweet__text {
  padding-bottom: 10px;
  text-align: center;
  color: white;
  font-size: 24px;
  font-weight: 600;
}

.main__form__tweet__input {
  padding: 10px 20px;
  border-radius: 10px;
  width: 75%;
  margin: 0 auto;
  border: 2px solid black;
  font-size: 24px;
}

.main__form__tweet__button {
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  width: 30%;
  padding: 10px;
  background-color: dodgerblue;
  color: white;
  font-size: 20px;
  font-weight: 700;
  border: 3px solid black;
  border-radius: 20px;
}

.tweets-container {
  width: 50%;
  margin: 0 auto;
  margin-bottom: 200px;
  background-color: dodgerblue;
  border: 3px solid black;
  border-radius: 20px;
}

.tweets__title {
  text-align: center;
  color: white;
  margin-bottom: 20px;
  font-weight: 700;
}

.tweets {
  text-align: center;
  background: white;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid black;
  border-radius: 15px;
}

.tweets__info {
  display: flex;
}

.tweets__name {
  margin-bottom: 10px;
  padding-left: 15px;
}

.tweets__content {
  margin-bottom: 20px;
  padding-left: 65px;
  text-align: left;
  font-size: 18px;
}

.tweets__button {
  align-items: center;
  display: flex;
  margin: 0 auto;
  min-width: 100px;
  border-radius: 10px;
  border: 2px solid dodgerblue;
}

.button__text {
  margin: 0 auto;
  color: dodgerblue;
  font-size: 15px;
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