<template>
  <a-card :title="name" class="card">
    <template #extra>
      <close-outlined @click="$emit('delete-item', item)"/>
    </template>
    <div class="card__price">
      {{ item['Cur_OfficialRate'] }} BYN
    </div>
  </a-card>
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
  -webkit-box-shadow: 0 0 .5rem 0 rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 0 0 .5rem 0 rgba(0, 0, 0, 0.11);
  box-shadow: 0 0 .5rem 0 rgba(0, 0, 0, 0.11);
  text-align: center;
  width: 32%;
}

@media screen and (max-width: 760px) {
  .card {
    width: 49%;
    display: block;
    margin-bottom: 1rem;
  }
}

@media screen and (max-width: 530px) {
  .card {
    width: 98%;
    display: block;
    margin-bottom: 1rem;
  }
}

.card__price {
  font-size: 3rem;
  font-weight: 600;
}
</style>