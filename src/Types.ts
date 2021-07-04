export type VehicleType = "truck" | "passenger";
export type VehicleStatus = "free" | "busy";

export interface IRoute {
  id: number;
  cityStart: string;
  cityEnd: string;
  cityDistance: number;
  requiredType: VehicleType;
  departure: Date;
  arrival: Date;
  price: number;
  vehicle: IVehicle;
  status: "waiting" | "in progress" | "done";
}

export interface IVehicle {
  [key: string]: number | string | Date;
  id: number;
  licensePlate: string;
  model: string;
  type: VehicleType;
  purchaseDate: Date;
  mileage: number;
  status: VehicleStatus;
}
