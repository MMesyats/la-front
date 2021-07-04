<template>
  <div class="form form-route">
    <la-input
      :name="'cityStart'"
      :title="'Departure City'"
      :placeholder="'Enter route departure city'"
      v-model="route.cityStart"
    />
    <la-input
      :name="'cityEnd'"
      :title="'Arrival City'"
      :placeholder="'Enter route arrival city'"
      v-model="route.cityEnd"
    />
    <la-input
      :type="'number'"
      :name="'cityDistance'"
      :title="'Distance between cities'"
      :placeholder="'Enter distance'"
      v-model="route.cityDistance"
    />
    <la-select
      :name="'Required Type'"
      v-model="route.requiredType"
      :options="vehicleTypes"
    />
    <la-input
      :type="'number'"
      :name="'price'"
      :title="'Price'"
      :placeholder="'Enter price'"
      v-model="route.price"
    />
    <la-datepicker :name="'Departure'" v-model="route.departure" />
    <la-datepicker :name="'Arrival'" v-model="route.arrival" />
    <la-select :name="'Status'" v-model="route.status" :options="routeStatus" />
    <la-select
      :name="'Vehicle'"
      :options="suitedVehicles"
      :modelValue="route.vehicle?.licensePlate"
      @update:modelValue="updateVehicle"
    />
    <div class="form-buttons">
      <la-button :text="'Submit'" @click="$emit('submit', route)" />
      <la-button :text="'Cancel'" :type="'red'" @click="$emit('cancel')" />
    </div>
  </div>
</template>

<script lang="ts">
import { IVehicle } from "@/Types";
import { defineComponent, PropType } from "vue";
import { vehicleTypes, routeStatus } from "../../constants/VehicleTableHeader";

export default defineComponent({
  emits: ["submit", "cancel"],
  props: {
    id: {
      type: Number,
    },
    cityStart: {
      type: String,
      default: "",
    },
    cityEnd: {
      type: String,
      default: "",
    },
    cityDistance: {
      type: Number,
      default: 0,
    },
    requiredType: {
      type: String,
      default: "truck",
    },
    price: {
      type: Number,
      default: 0,
    },
    departure: {
      type: Date,
      default: new Date(),
    },
    arrival: {
      type: Date,
      default: new Date(),
    },
    vehicle: {
      type: Object as PropType<IVehicle>,
    },
    status: {
      type: String,
      default: "waiting",
    },
    freeVehicles: {
      type: Array as PropType<IVehicle[]>,
      required: true,
    },
  },
  setup() {
    return {
      vehicleTypes: vehicleTypes.map((type) => ({ title: type, value: type })),
      routeStatus: routeStatus.map((type) => ({ title: type, value: type })),
    };
  },
  data() {
    const { freeVehicles, ...routeData } = this.$props;
    return {
      route: {
        ...routeData,
      },
    };
  },
  computed: {
    suitedVehicles(): { title: string; value: unknown }[] {
      return this.freeVehicles
        .filter(({ type }) => this.route.requiredType === type)
        .map((vehicle) => ({ title: vehicle.licensePlate, value: vehicle }));
    },
  },
  methods: {
    updateVehicle(data: IVehicle) {
      this.route.vehicle = data;
    },
  },
});
</script>

<style lang="scss">
.form-route {
  width: 380px;
  grid-template-columns: 1fr 1fr;
  align-content: flex-end;
  align-items: flex-end;
  column-gap: 25px;
  .form-buttons {
    column-gap: 25px;
    grid-column: span 2;
  }
}
</style>
