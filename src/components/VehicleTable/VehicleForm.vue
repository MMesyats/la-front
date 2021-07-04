<template>
  <form class="form" @submit.prevent>
    <la-input
      :name="'licensePlate'"
      :title="'License Plate'"
      :placeholder="'Enter vehicle license plate'"
      v-model="vehicle.licensePlate"
    />
    <la-input
      :name="'model'"
      :title="'Model'"
      :placeholder="'Enter vehicle model'"
      v-model="vehicle.model"
    />
    <la-select :name="'type'" v-model="vehicle.type" :options="vehicleTypes" />
    <la-input
      :type="'number'"
      :name="'mileage'"
      :title="'Mileage'"
      :placeholder="'Enter vehicle mileage'"
      v-model.number="vehicle.mileage"
    />
    <la-datepicker :name="'Purchase Date'" v-model="vehicle.purchaseDate" />
    <la-select
      :name="'status'"
      v-model="vehicle.status"
      :options="vehicleStatus"
    />
    <div class="form-buttons">
      <la-button :text="'Submit'" @click="$emit('submit', vehicle)" />
      <la-button :text="'Cancel'" :type="'red'" @click="$emit('cancel')" />
    </div>
  </form>
</template>

<script lang="ts">
import { VehicleStatus, VehicleType } from "@/Types";
import { defineComponent, PropType } from "vue";
import {
  vehicleTypes,
  vehicleStatus,
} from "../../constants/VehicleTableHeader";

export default defineComponent({
  props: {
    id: {
      type: String,
    },
    licensePlate: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<VehicleType>,
      default: "truck",
    },
    purchaseDate: {
      type: Date,
      default: new Date(Date.now()),
    },
    mileage: {
      type: Number,
      default: 0,
    },
    status: {
      type: String as PropType<VehicleStatus>,
      default: "free",
    },
  },
  emits: ["cancel", "submit"],
  setup() {
    return {
      vehicleTypes: vehicleTypes.map((type) => ({ title: type, value: type })),
      vehicleStatus: vehicleStatus.map((type) => ({
        title: type,
        value: type,
      })),
    };
  },
  data() {
    return {
      vehicle: {
        ...this.$props,
      },
    };
  },
});
</script>

<style lang="scss">
.form {
  display: grid;
  row-gap: 10px;
  width: 250px;
  padding: 20px 25px;
  border-radius: 10px;
  background: var(--white-color);
  box-shadow: var(--shadow);
  &-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>
