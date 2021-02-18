<template>
  <div>
    <h2>Login</h2>
    <form :class="$style.form" @submit.prevent="loginUser">
    <div :class="$style.formRow">
      <label :class="$style.formLabel">
        <div>Login:</div>
        <input type="text" :class="$style.formInput" v-model="login" />
      </label>
    </div>
    <div :class="$style.formRow">
      <label :class="$style.formLabel">
        <div>Password:</div>
        <input type="password" :class="$style.formInput" v-model="password" />
      </label>
    </div>
    <div :class="$style.formRow" v-if="error">
      <div :class="$style.formError">{{ error }}</div>
    </div>
    <div :class="$style.formRow">
      <div :class="$style.formButtons">
        <button :class="$style.formButton" :disabled="!validated" @click="loginUser">Login</button>
        <button :class="[$style.formButton, $style.formButtonRest]" @click.stop="clearForm">Reset</button>
      </div>
    </div>
  </form>
  </div>
</template>

<script>
import TokenService from "@/services/token.service";
import accountsData from "@/assets/accounts.json";

export default {
  data() {
    return {
      login: "",
      password: "",
      error: null
    }
  },
  computed: {
    validated() {
      return this.login && this.password;
    },
    accounts() {
      return accountsData.data;
    }
  },
  methods: {
    loginUser() {
      if (!this.validated) {
        return;
      }
      this.error = "";

      if (this.accounts.find(item => item.login === this.login && item.password === this.password)) {
        TokenService.saveToken("12345");
        this.$router.push({ path: "/" }).catch();
      } else {
        this.error = "Login/password wrong";
      }
    },
    clearForm() {
      this.login = "";
      this.password = "";
      this.error = "";
    }
  },
  watch: {
    login() {
      this.error = "";
    },
    password() {
      this.error = "";
    }
  }
}
</script>

<style lang="scss" module>
.form {
  max-width: 360px;
  margin: 0 auto;

  &__row {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    };
  }
  &__label {
    div {
      margin-bottom: 6px;
    }
  }
  &__input {
    outline: none;
    padding: 8px 12px;
    border-radius: 6px;
    width: 100%;
  }
  &__buttons {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
  &__button {
    padding: 8px 12px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:disabled {
      color: gray;
      cursor: default;
    }
    &-reset {}
  }
  &__error {
    color: red;
  }

  @media screen and (max-width:640px) {
    max-width: 100%;
  }
}
</style>