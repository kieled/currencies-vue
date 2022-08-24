<template>
  <div class="loader" v-if="loading">
    <loading-outlined class="loader__icon" spin/>
  </div>
</template>

<script>
import {LoadingOutlined} from '@ant-design/icons-vue';

export default {
  name: "LoaderItem",
  components: {
    LoadingOutlined
  },
  props: {
    loading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
}

.loader__icon {
  font-size: 100px;
  height: max-content;
}
</style>