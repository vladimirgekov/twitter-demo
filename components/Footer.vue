<template>
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
