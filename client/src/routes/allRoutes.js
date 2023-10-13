import IndexPage from "../pages/home";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signUp";

const authProtectedRoutes = [

]



const publicRoutes = [
    // Authentication Page
    { path: "/login", component: LoginPage },
    { path: "/sign-up", component: SignupPage },
];

export { authProtectedRoutes, publicRoutes };