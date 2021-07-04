import { IVehicle } from "../Types";

const url = process.env?.BACKEND_URL || "http://localhost:3000";

export class VehicleService {
  static async listFreeVehicles(): Promise<IVehicle[]> {
    const response = await fetch(`${url}/vehicle/list/free`);
    const vehicles = (await response.json()) as IVehicle[];
    return vehicles.map(({ purchaseDate, ...data }) => ({
      purchaseDate: new Date(purchaseDate),
      ...data,
    }));
  }

  static async listVehicles(): Promise<IVehicle[]> {
    const response = await fetch(`${url}/vehicle/list`);
    const vehicles = (await response.json()) as IVehicle[];
    return vehicles.map(({ purchaseDate, ...data }) => ({
      purchaseDate: new Date(purchaseDate),
      ...data,
    }));
  }

  private static async saveVehicle(
    vehicle: IVehicle,
    method: "PUT" | "POST"
  ): Promise<IVehicle> {
    const response = await fetch(`${url}/vehicle`, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle),
    });
    const { purchaseDate: date, ...other } = await response.json();
    return {
      purchaseDate: new Date(date),
      ...other,
    };
  }

  static async createVehicle(vehicle: IVehicle): Promise<IVehicle> {
    return await this.saveVehicle(vehicle, "POST");
  }

  static async updateVehicles(vehicle: IVehicle): Promise<IVehicle> {
    return await this.saveVehicle(vehicle, "PUT");
  }

  static async deleteVehicle(id: number): Promise<void> {
    await fetch(`${url}/vehicle/${id}`, {
      method: "DELETE",
    });
  }
}
