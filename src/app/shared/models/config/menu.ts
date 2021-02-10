import { Icon } from ".";

export interface Menu {
  id: string;
  name: string;
  title: string;
  slug: any;
  type: number;
  icon: Icon;
  sort: number;
  hasPermission: boolean;
  path: string;
  uri: string;
  action: string;
  childrens: Menu[]
}
