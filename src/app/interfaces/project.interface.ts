import { ECircleCount } from "../enums/circle-count.enum";
import {ICircle} from "./circle.interface";

export interface IProject {
  id: string;
  name: string;
  email: string;
  circles: ICircle[];
  size: ECircleCount;
}
