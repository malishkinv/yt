<template>
  <div :class="$style.card">
    <div :class="$style.cardAvatar">
      <img :src="card.avatar" />
    </div>
    <div :class="$style.cardInfo">
      <div :class="$style.cardName">{{ card.first_name + " " + card.last_name }}</div>
      <div :class="$style.cardEmail">{{ card.email }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["card"]
}
</script>

<style lang="scss" module>
.card {
  padding: 12px;
  min-height: 100px;
  width: calc(100% / 2 - 6px);
  margin-right: 12px;
  margin-bottom: 12px;
  border-radius: 18px;
  border: 1px solid rgba(100 100 100 / .3);

  display: flex;
  align-items: center;

  &:nth-child(2n) {
    margin-right: 0;
  }

  &__avatar {
    width: 64px;
    min-width: 64px;
    height: 64px;
    min-height: 64px;
    border-radius: 32px;
    margin-right: 18px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 50%;
    }
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &__name {
    font-weight: 600;
    word-break: break-word;
  }
  &__email {
    font-style: italic;
    word-break: break-word;
  }

  @media screen and (max-width:640px) {
    width: 100%;
    margin-right: 0;
  }
}
</style>