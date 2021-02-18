<template>
  <div :class="$style.wrapper">
    <slot />
  </div>
</template>

<style lang="scss" module>
body {
  margin: 0;
}
.wrapper {
  margin: 60px auto;
  padding: 0 48px;

  @media screen and (max-width:640px) {
    margin: 30px auto;
    padding: 0 24px;
    width: 100%;
  }
}
</style>