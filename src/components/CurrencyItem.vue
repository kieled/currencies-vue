<template>
  <div class="card-container">
    <a-card :title="name" class="card">
      <template #extra><close-outlined @click="$emit('delete-item', item)" /></template>
      <div class="card__price">
        {{ item['Cur_OfficialRate'] }} BYN
      </div>
    </a-card>
  </div>
</template>

<script>
import {CloseOutlined} from "@ant-design/icons-vue";

export default {
  name: "CurrencyItem",
  components: {
    CloseOutlined
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['delete-item'],
  computed: {
    name() {
      return this.item['Cur_Name']
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.11);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.11);
  text-align: center;
}
.card-container {
  padding: 10px;
  float: left;
  width: 33%;
}

@media screen and (max-width: 726px) {
  .card-container {
    width: 50%;
    display: block;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 430px) {
  .card-container {
    width: 100%;
    display: block;
    margin-bottom: 10px;
  }
}

.card__price {
  font-size: 30px;
  font-weight: 600;
}
</style>