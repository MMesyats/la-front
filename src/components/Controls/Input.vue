<template>
  <div class="input-wrapper">
    <label :for="name" class="input-label">{{ title }}</label>
    <input
      v-if="type === 'text'"
      class="input"
      type="text"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <input
      v-if="type === 'number'"
      class="input"
      type="number"
      :name="name"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', +$event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "la-input",
  emits: ["update:modelValue"],
  props: {
    type: {
      type: String,
      default: "text",
    },
    title: {
      type: String,
    },
    name: {
      value: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [Number, String],
      required: true,
    },
  },
});
</script>

<style lang="scss">
.input {
  padding: 10px 5px;
  background: var(--transparent);
  border: 2px solid var(--green-color);
  border-radius: 5px;
  outline: none;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &-label {
    text-transform: uppercase;
    font-weight: var(--bold);
    color: var(--green-color);
    margin-bottom: 10px;
  }
  &-wrapper {
    display: flex;
    flex-direction: column;
  }
}
</style>
