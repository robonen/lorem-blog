import type { RouteLocationRaw } from 'vue-router';

export interface NavigationMenuItem {
  name: string;
  path: RouteLocationRaw;
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[];
}
