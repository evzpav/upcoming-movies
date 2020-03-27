import Main from "../views/Main";
import Posts from "../components/Posts";

export default [
  {
    path: "/",
    component: Main,
    redirect: "/posts",
    children: [
      {
        path: "/posts",
        component: Posts,
      },
    ],
  },
];
