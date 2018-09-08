import {User} from "./service/user.model";

export class FlytippingReport {
  user: User;
  latitude: number;
  longitude: number;
  dateTime: string;
  description: string;
  imageFilename: string;
}
