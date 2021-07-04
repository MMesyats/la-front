<template>
  <tr class="table-body-row">
    <td class="table-body-row">{{ id }}</td>
    <td class="table-body-row">{{ route }}</td>
    <td class="table-body-row">
      {{ formattedDistance }}
    </td>
    <td class="table-body-row route-type">{{ requiredType }}</td>
    <td class="table-body-row">
      {{ price }}
    </td>
    <td class="table-body-row">
      {{ formattedDeparture }}
    </td>
    <td class="table-body-row">
      {{ formattedArrival }}
    </td>
    <td class="table-body-row">{{ vehicle }}</td>
    <td
      class="table-body-row route-status"
      :class="{
        'route-status-in-progress': status === 'in progress',
        'route-status-waiting': status === 'waiting',
      }"
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

<script>
import { defineComponent } from "@vue/runtime-core";
import TrashIcon from "@/assets/trash.svg";
import EditIcon from "@/assets/edit.svg";

const dateFormat = Intl.DateTimeFormat("en", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const kmFormat = Intl.NumberFormat("en", { maximumFractionDigits: 2 });

export default defineComponent({
  emits: ["remove", "edit"],
  props: {
    id: {
      type: Number,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    requiredType: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    departure: {
      type: Date,
      required: true,
    },
    arrival: {
      type: Date,
      required: true,
    },
    vehicle: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      TrashIcon,
      EditIcon,
    };
  },
  computed: {
    formattedDeparture() {
      return dateFormat.format(this.$props.departure);
    },
    formattedArrival() {
      return dateFormat.format(this.$props.arrival);
    },
    formattedDistance() {
      return `${kmFormat.format(this.$props.distance)} km`;
    },
  },
});
</script>

<style lang="scss">
.route {
  &-type {
    text-transform: uppercase;
    font-weight: var(--bold);
  }
  &-status {
    text-transform: uppercase;
    color: var(--green-color);
    font-weight: var(--bold);
    &-in-progress {
      color: var(--yellow-color);
    }
    &-waiting {
      color: var(--red-color);
    }
  }
}
</style>
