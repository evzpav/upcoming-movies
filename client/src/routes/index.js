import Main from "../views/Main";
import UpcomingMovies from "../components/UpcomingMovies";

export default [
  {
    path: "/",
    component: Main,
    redirect: "/upcoming-movies",
    children: [
      {
        path: "/upcoming-movies",
        component: UpcomingMovies,
      },
    ],
  },
];
