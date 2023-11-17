// import IndexPage from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signUp";
import HomePage from "../pages/home";
// import HomeSearch from "../pages/homeSearch";
import PreferentialSearch from "../pages/preferentialSearch";
import RecentSearches from "../pages/recentSearches/index";

const authProtectedRoutes = [

]



const publicRoutes = [
    // Authentication Page
    { path: "/login", component: LoginPage },
    { path: "/sign-up", component: SignupPage },
    { path: "/preferential-search", component: PreferentialSearch },
    { path: "/recent-searches", component: RecentSearches },

    { path: "", component: HomePage },


];

export { authProtectedRoutes, publicRoutes };