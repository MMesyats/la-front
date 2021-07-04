import { IRoute, VehicleType, IVehicle } from "../../Types";

export interface IRouteTableData {
  isUpdateModalOpen: boolean;
  isCreateModalOpen: boolean;
  selectedForEdit: IRoute | null;
  sortKey: string;
  isASC: boolean;
  avaliableVehicles: IVehicle[];
  routeTableHeader: { label: string; key: string }[];
  routes: IRoute[];
}

export interface IFormattedRoute {
  [key: string]: string | number | Date;
  id: number;
  route: string;
  cityDistance: number;
  requiredType: VehicleType;
  departure: Date;
  arrival: Date;
  price: number;
  vehicle: string;
  status: "waiting" | "in progress" | "done";
}
