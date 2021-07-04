<template>
  <button
    class="button"
    :class="{ 'button-red': type === 'red' }"
    @click="$emit('click')"
  >
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "la-button",
  emits: ["click"],
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<"default" | "red">,
      default: "default",
    },
  },
});
</script>

<style lang="scss">
.button {
  padding: 10px 5px;
  background: var(--transparent);
  border: 2px solid var(--green-color);
  border-radius: 5px;
  text-transform: uppercase;
  font-weight: var(--bold);
  transition: background-color 0.2s, color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: var(--green-color);
    color: var(--white-color);
  }
  &-red {
    border: 2px solid var(--red-color);
    &:hover {
      background-color: var(--red-color);
      color: var(--white-color);
    }
  }
}
</style>
