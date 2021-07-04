<template>
  <teleport to="body">
    <div class="modal" @click="$emit('close')">
      <div class="modal-content" @click.stop>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "la-modal",
  emits: ["close"],
  mounted() {
    if (typeof document !== "undefined") document.body.classList.add("fixed");
  },
  unmounted() {
    if (typeof document !== "undefined")
      document.body.classList.remove("fixed");
  },
});
</script>

<style lang="scss">
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--black-trans-color);
}
</style>
