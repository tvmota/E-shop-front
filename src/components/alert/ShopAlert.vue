<script>
  export default {
    name: 'Shop-Alert',
    props: {
      msg: { type: String, required: false },
      msgClass: { type: String, required: true },
      visibility: { type: Boolean, required: true }
    },
    methods: {
      close () {
        this.$emit('update:visibility', false)
      }
    }
  }
</script>
<template>
  <div :class="msgClass" v-show="visibility">
    <p>{{msg}}</p>
    <button type="button" class="close" @click="close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
