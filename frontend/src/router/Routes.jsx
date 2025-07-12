import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import ContactPage from "../pages/Contact/contact";
import Profile from "../pages/Profile/Profile";
const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "contact",
    component: ContactPage,
  },
  {
    path: "Profile",
    component: Profile,
  },
];

export default routes;
