<template>
  <div tabindex="1" class="select" @blur="setOpen(false)">
    <span class="select-label">{{ name }}</span>
    <div readonly class="select-value" type="text" @click="setOpen(true)">
      {{ modelValue || "-" }}
    </div>
    <div class="select-variants" v-if="isOpen">
      <span
        class="select-variants-item"
        v-for="option in options"
        :key="option.value"
        @click="selectOption(option.value)"
        >{{ option.title }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "la-select",
  props: {
    name: {
      type: String,
    },
    modelValue: {
      type: String,
    },
    options: {
      type: Array as PropType<{ title: string; value: string }[]>,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    setOpen(isOpen: boolean) {
      this.isOpen = isOpen;
    },
    selectOption(option: string) {
      this.setOpen(false);
      this.$emit("update:modelValue", option);
    },
  },
});
</script>

<style lang="scss">
.select {
  position: relative;
  &-label {
    display: block;
    text-transform: uppercase;
    font-weight: var(--bold);
    color: var(--green-color);
    margin-bottom: 10px;
  }
  &-value {
    padding: 10px 5px;
    background: var(--transparent);
    border: 2px solid var(--green-color);
    border-radius: 5px;
    line-height: 1;
    text-transform: uppercase;
    font-weight: var(--bold);
    cursor: pointer;
  }
  &-variants {
    box-shadow: var(--shadow);
    z-index: 10;
    box-sizing: border-box;
    background: var(--white-color);
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    border-radius: 5px;
    top: 100%;
    &-item {
      padding: 10px 5px;
      text-transform: uppercase;
      font-weight: var(--bold);

      &:hover {
        color: var(--white-color);
        background-color: var(--green-color);
      }
    }
  }
}
</style>
