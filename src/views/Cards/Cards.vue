<template>
  <div>
    <h2>Cards</h2>
    <div :class="$style.logout" @click="logout">Logout</div>

    <template v-if="loaded">
      <div :class="$style.cards">
        <card v-for="card in data.data" :card="card" :key="card.id" />
      </div>

      <div :class="$style.paging">
        <template v-if="currentPage===1">
          <div :class="[$style.pagingItem,$style.pagingItemPrev,$style.pagingItemInactive]">&laquo;</div>
        </template>
        <template v-else>
          <div :class="[$style.pagingItem,$style.pagingItemPrev]" @click="fetchData(--currentPage)">&laquo;</div>
        </template>

        <div :class="{[$style.pagingItem]:true, [$style.pagingItemPage]:true, [$style.pagingItemActive]:currentPage===pageNum}" v-for="pageNum in data.total_pages" :key="pageNum" @click="fetchData(pageNum)">{{ pageNum }}</div>

        <template v-if="currentPage===data.total_pages">
          <div :class="[$style.pagingItem,$style.pagingItemNext,$style.pagingItemInactive]">&raquo;</div>
        </template>
        <template v-else>
          <div :class="[$style.pagingItem,$style.pagingItemNext]" @click="fetchData(++currentPage)">&raquo;</div>
        </template>
      </div>
    </template>

    <template v-else>
      <div :class="$style.loader">loading...</div>
    </template>

    <template v-if="error">
      <div :class="$style.error">{{ error }}</div>
    </template>
  </div>
</template>

<script>
import ApiService from "@/services/api.service";
import Card from "@/components/Cards/Card.vue"
import TokenService from "@/services/token.service";

export default {
  components: {
    Card
  },
  data() {
    return {
      currentPage: 1,
      data: null,
      loaded: false,
      error: ""
    }
  },
  created() {
    this.fetchData(this.currentPage);
  },
  methods: {
    fetchData(page) {
      this.error = "";
      this.loaded = false;
      this.data = null;

      const req = {
        delay: 1,
        page
      }

      ApiService.get("/users", req).then(({data}) => {
        this.data = data;
        this.loaded = true;
        this.currentPage = data.page;
      }).catch(() => {
        this.error = "Error loading data";
      });
    },
    logout() {
      TokenService.removeToken();
      this.$router.push({ path: "/login" }).catch();
    }
  }
}
</script>

<style lang="scss" module>
.error {
  margin-top: 24px;
  font-style: italic;
  color: red;
  text-align: center;
}
.loader {
  font-style: italic;
  text-align: center;
}
.logout {
  margin-bottom: 32px;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
  color: blue;
}
.cards {
  display: flex;
  flex-wrap: wrap;
}
.paging {
  display: flex;
  margin-top: 24px;
  justify-content: center;

  &__item {
    padding: 4px 10px;
    border: 1px solid rgba(100 100 100 / .3);
    border-radius: 6px;
    cursor: pointer;
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }

    transition: all .2s;

    &:hover {
      box-shadow: 0 4px 10px rgba(100 100 100 / .3);
    }

    &-prev {
      padding: 3px 10px;
    }
    &-next {
      padding: 3px 10px;
    }

    &-inactive {
      color: rgba(100 100 100 / .3);
      cursor: default;
      border-color: rgba(100 100 100 / .3);

      &:hover {
        box-shadow: none;
      }
    }
    &-active {
      border-color: green;
      background-color: green;
      color: white;
      cursor: default;

      &:hover {
        box-shadow: none;
      }
    }
  }
}
</style>