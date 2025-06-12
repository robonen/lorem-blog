import type { RouteLocationRaw } from 'vue-router';

export interface NavigationMenuItem {
  name: string;
  path: RouteLocationRaw;
}
