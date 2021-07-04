<template>
  <table class="table">
    <thead class="table-head">
      <tr class="table-head-row">
        <th class="table-head-row-cell" v-for="item in header" :key="item.key">
          <span
            class="table-head-row-cell-inner"
            v-if="item.key"
            @click="$emit('sort', item.key)"
            >{{ item.label }}
            <img
              class="table-head-row-cell-inner-arrow"
              :class="{
                'table-head-row-cell-inner-arrow-current':
                  currentSortKey === item.key,
                'table-head-row-cell-inner-arrow-desc':
                  currentSortKey === item.key && !isASC,
              }"
              :src="Arrow"
              alt="arrow"
            />
          </span>
        </th>
      </tr>
    </thead>
    <tbody class="table-body">
      <slot />
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { PropType } from "vue";
import { ITableHeader } from "./Types";
import Arrow from "@/assets/arrow.svg";

export default defineComponent({
  name: "la-table",
  setup() {
    return { Arrow };
  },
  props: {
    currentSortKey: {
      type: String,
      required: true,
    },
    isASC: {
      type: Boolean,
      required: true,
    },
    header: {
      type: Array as PropType<ITableHeader[]>,
      required: true,
    },
  },
  emits: ["sort"],
});
</script>

<style lang="scss">
.table {
  width: 1200px;
  background: var(--white-color);
  box-shadow: var(--shadow);
  border-radius: 5px;
  &-head {
    &-row {
      &-cell {
        cursor: pointer;
        padding: 10px 0;
        &-inner {
          display: flex;
          justify-content: center;
          align-items: center;
          &-arrow {
            margin-left: 5px;
            height: 15px;
            width: 15px;
            opacity: 0.5;
            &-current {
              opacity: 1;
            }
            &-desc {
              transform: rotate(180deg);
            }
          }
        }
      }
    }
  }
}
</style>
