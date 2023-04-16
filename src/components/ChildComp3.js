export default {
  emits: ['response'],
  created() {
    this.$emit('response', 'hello from child')
  },
  template: `
  <h2>子コンポーネントからイベントを発行</h2>
  `
}
