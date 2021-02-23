import { Option } from "../config";

export interface FilterState {
  option: Option,
  text: string,
  isActive?: boolean | null
}
