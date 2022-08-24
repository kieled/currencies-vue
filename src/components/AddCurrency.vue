<template>
  <section class="form">
    <a-select
        v-model:value="value"
        show-search
        placeholder="Введите/выберите нужную валюту"
        class="form__select"
        :options="mappedCurrencies"
        :filter-option="filterOption"
        @change="addCurrency"
        @click="$emit('clear-warning')"
    ></a-select>
    <div v-if="warning" class="warning-message">Валюта уже добавлена!</div>
  </section>
</template>

<script>
export default {
  name: "AddCurrency",
  data() {
    return {
      value: ''
    }
  },
  props: {
    currencies: {
      type: Array,
      default: () => []
    },
    warning: {
      type: Boolean,
      default: false
    }
  },
  emits: ['add-currency', 'clear-warning'],
  methods: {
    filterOption(input, option) {
      return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    addCurrency(value) {
      this.$emit('add-currency', value)
      this.value = ''
    }
  },
  computed: {
    mappedCurrencies() {
      return this.currencies.map(item => {
        return {
          label: `${item['Cur_Name']} (${item['Cur_Abbreviation']})`,
          value: item['Cur_ID']
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  width: 50%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.form__select {
  width: 100%;
  margin-bottom: 5px;
}
.form__btn {
  border-radius: 20px;
  background-color: rgba(34, 60, 80, 0.6);
  border: none;
}
@media screen and (max-width: 760px) {
  .form {
    width: 95%;
  }
}
.warning-message {
  color: red;
  font-weight: bold;
}
</style>

<style lang="scss">
.ant-select-selector {
  border-radius: 20px !important;
}
</style>