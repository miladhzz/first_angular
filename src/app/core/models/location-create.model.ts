export interface LocationCreatePayload {
  name: string;
  city: string;
  state: string;
  available_units: number;
  wifi: boolean;
  laundry: boolean;
  photo_path: string;
}
