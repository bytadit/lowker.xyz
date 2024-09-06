import { light, bookmark, home } from "./Icons";

const menu = [
  {
    id: 1,
    title: "All Lowker",
    auth: false,
    icon: home,
    link: "/",
  },
  {
    id: 3,
    title: "Resource",
    auth: false,
    icon: light,
    link: "/resources",
  },
  {
    id: 3,
    title: "Collection",
    auth: true,
    icon: bookmark,
    link: "/collection",
  },
];

export default menu;