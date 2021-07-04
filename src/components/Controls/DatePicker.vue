<template>
  <div class="datepicker">
    <span class="datepicker-label">{{ name }}</span>
    <datepicker
      class="datepicker-input"
      :modelValue="modelValue"
      @update:modelValue="updateValue"
    >
    </datepicker>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import datepicker from "vue3-datepicker";

export default defineComponent({
  name: "la-datepicker",
  components: {
    datepicker,
  },
  emits: ["update:modelValue"],
  props: { name: { type: String }, modelValue: { type: Date } },
  methods: {
    updateValue(value: Date) {
      this.$emit("update:modelValue", value);
    },
  },
});
</script>

<style lang="scss">
.datepicker {
  display: flex;
  flex-direction: column;
  &-label {
    text-transform: uppercase;
    font-weight: var(--bold);
    color: var(--green-color);
    margin-bottom: 10px;
  }
  .v3dp__popout {
    bottom: 100%;
  }
  &-input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px 5px;
    background: var(--transparent);
    border: 2px solid var(--green-color);
    border-radius: 5px;
    outline: none;
  }
}
</style>
