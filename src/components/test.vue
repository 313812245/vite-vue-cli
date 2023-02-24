<template>
  <div>
    <p>test-component</p>
    <p>{{ value }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'Test',
  components: {},
})
export default class Test extends Vue {
  @Prop({ type: String, default: '' }) value!: string;
  get a() {
    return this.value;
  }
}
</script>
