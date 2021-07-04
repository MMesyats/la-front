<template>
  <tr class="table-body-row">
    <td class="table-body-row">{{ id }}</td>
    <td class="table-body-row">{{ licensePlate }}</td>
    <td class="table-body-row">
      {{ model }}
    </td>
    <td class="table-body-row vehicle-type">{{ type }}</td>
    <td class="table-body-row">
      {{ purchaseDateFormated }}
    </td>
    <td class="table-body-row">
      {{ mileage }}
    </td>
    <td
      class="table-body-row vehicle-status"
      :class="{ 'vehicle-status-busy': status == 'busy' }"
    >
      {{ status }}
    </td>
    <td class="table-body-row">
      <img
        class="vehicle-icon"
        :src="TrashIcon"
        alt="remove"
        @click="$emit('remove', id)"
      />
      <img
        class="vehicle-icon"
        :src="EditIcon"
        alt="edit"
        @click="$emit('edit', id)"
      />
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TrashIcon from "@/assets/trash.svg";
import EditIcon from "@/assets/edit.svg";

const dateFormat = Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export default defineComponent({
  name: "VehicleRow",
  props: {
    id: { type: Number, required: true },
    licensePlate: { type: String, required: true },
    model: { type: String, required: true },
    purchaseDate: { type: Date, required: true },
    mileage: { type: Number, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
  },
  emits: ["remove", "edit"],
  computed: {
    purchaseDateFormated(): string {
      return dateFormat.format(this.purchaseDate);
    },
  },
  setup() {
    return {
      TrashIcon,
      EditIcon,
    };
  },
});
</script>

<style lang="scss">
.vehicle {
  &-icon {
    cursor: pointer;
    height: 20px;
    width: 20px;
    &:not(:last-of-type) {
      margin-right: 5px;
    }
  }
  &-type {
    text-transform: uppercase;
    font-weight: var(--bold);
  }
  &-status {
    text-transform: uppercase;
    color: var(--green-color);
    font-weight: var(--bold);
    &-busy {
      color: var(--red-color);
    }
  }
}
</style>
