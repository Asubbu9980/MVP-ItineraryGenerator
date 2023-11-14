import IndexPage from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signUp";
import HomePage from "../pages/home";
import AuthCallBack from "../pages/auth-callback";

const authProtectedRoutes = [

]



const publicRoutes = [
    // Authentication Page
    { path: "/login", component: LoginPage },
    { path: "/sign-up", component: SignupPage },
    { path: "/callback", component: AuthCallBack },
    { path: "", component: HomePage },

];

export { authProtectedRoutes, publicRoutes };