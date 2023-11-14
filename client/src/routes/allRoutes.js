import IndexPage from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signUp";
import HomePage from "../pages/home";
import HomeSearch from "../pages/homeSearch";


const authProtectedRoutes = [

]



const publicRoutes = [
    // Authentication Page
    { path: "/login", component: LoginPage },
    { path: "/sign-up", component: SignupPage },
    { path: "/homesearch", component: HomeSearch },
    { path: "", component: HomePage },


];

export { authProtectedRoutes, publicRoutes };