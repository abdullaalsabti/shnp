import {
  faBook,
  faCircleCheck,
  faClock,
  faClockRotateLeft,
  faDashboard,
  faGear,
  faRightFromBracket,
  faStore,
  faTrash,
  faUsers,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export type menuItemType = {
  icon: IconProp;
  text: string;
  route: string;
};

export const mainMenuListItems: menuItemType[] = [
  {
    icon: faDashboard,
    text: "Dashboard",
    route: "/dashboard",
  },
  {
    icon: faUsers,
    text: "Manage Employees",
    route: "/manageEmployees",
  },
];

export const restaurantMenuListItems: menuItemType[] = [
  {
    icon: faUtensils,
    text: "Menu",
    route: "/menu",
  },
  {
    icon: faStore,
    text: "Branches",
    route: "/branches",
  },
  {
    icon: faCircleCheck,
    text: "Orders",
    route: "/orders",
  },
  {
    icon: faClockRotateLeft,
    text: "Order History",
    route: "/orderHistory",
  },
  {
    icon: faClock,
    text: "Opening Times",
    route: "/openingTimes",
  },
];

export const customerSubscriptionsMenuListItems: menuItemType[] = [
  {
    icon: faBook,
    text: "Packages",
    route: "/packages",
  },
  {
    icon: faBook,
    text: "Customer Subscriptions",
    route: "/customerSubscriptions",
  },
  {
    icon: faTrash,
    text: "Cancel Subscriptions",
    route: "/cancelSubscriptions",
  },
];

export const extraMenuListItems: menuItemType[] = [
  {
    icon: faGear,
    text: "Settings",
    route: "/settings",
  },
  {
    icon: faRightFromBracket,
    text: "Log out",
    route: "/logout",
  },
];
