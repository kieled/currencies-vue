<template>
  <header>
    <h1>Currency monitor</h1>
  </header>
  <div class="container add-block">
    <AddCurrency :currencies="prices" @add-currency="add" :warning="warning" @clear-warning="clearWarning"/>
  </div>
  <div class="container">
    <div class="currency-list">
      <CurrencyItem v-for="item of items" :key="item['Cur_ID']" :item="item" @delete-item="deleteItem"/>
    </div>
  </div>
  <LoaderItem :loading="loading"/>
</template>

<script>
import {fetchData} from "@/api";
import AddCurrency from "@/components/AddCurrency";
import LoaderItem from "@/components/LoaderItem";
import CurrencyItem from "@/components/CurrencyItem";

export default {
  name: 'App',
  components: {
    CurrencyItem,
    LoaderItem,
    AddCurrency
  },
  data() {
    return {
      prices: [],
      loading: true,
      items: [],
      warning: false,
      intervalID: 0
    }
  },
  async created() {
    this.prices = await fetchData()
    this.loading = false
    this.intervalID = setInterval(async () => {
      this.prices = await fetchData()
      this.items = this.items.map(i => this.prices.find(p => p['Cur_ID'] === i['Cur_ID']))
    }, 300000)
  },
  beforeUnmount() {
    clearInterval(this.intervalID)
  },
  mounted() {
    this.items = JSON.parse(localStorage.getItem('currencies')) || []
  },
  methods: {
    add(value) {
      if (this.items.find(item => item['Cur_ID'] === value)) {
        this.warning = true
        return
      }
      this.items.push(this.prices.find(item => item['Cur_ID'] === value))
      localStorage.setItem('currencies', JSON.stringify(this.items))
    },
    deleteItem(item) {
      this.items = this.items.filter(i => i !== item)
      localStorage.setItem('currencies', JSON.stringify(this.items))
    },
    clearWarning() {
      this.warning = false
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 3rem;
}

.add-block {
  display: flex;
  justify-content: center;
  -webkit-box-shadow: 0 1.2rem 3.2rem 1.6rem rgba(34, 60, 80, 0.05);
  -moz-box-shadow: 0 1.2rem 3.2rem 1.6rem rgba(34, 60, 80, 0.05);
  box-shadow: 0 1.2rem 3.2rem 1.6rem rgba(34, 60, 80, 0.05);
  background-color: rgba(34, 60, 80, 0.05);
  padding-top: 2rem;
}

header {
  padding: 0 2rem;
  background-color: rgba(34, 60, 80, 0.05);
  border-bottom: rgba(34, 60, 80, 0.05) .1rem solid;
  justify-content: center;
  display: flex;
}

.currency-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

@media screen and (max-width: 760px) {
  .container {
    padding: 3rem 1.5rem;
  }
}

@media screen and (min-width: 1366px) {
  .container {
    padding: 3rem 10%;
  }
}

</style>