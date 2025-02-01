import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "../pages/chat/page/Chat";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import { useAppSelector } from '../redux/store';

// Define a type for the route configuration
interface RouteConfig {
    path: string;
    component: React.ComponentType;
    private: boolean;
}

const Router = () => {
    const { isAuth } = useAppSelector((state) => state.auth);
    // Define your routes
    const routes: RouteConfig[] = [
        { path: "/", component: Login, private: false },
        { path: "/chat", component: Chat, private: true },
        { path: "/login", component: Login, private: false },
        { path: "/signup", component: Signup, private: false },
    ];

    return (
        <Routes>
            {routes.map((route, index) => {
                const Component = route.component; // Extract the component
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            route.private && !isAuth ? (
                                <Navigate to="/login" /> // Redirect to login if route is private and user is not authenticated
                            ) : (
                                <Component /> // Render the component if the route is public or the user is authenticated
                            )
                        }
                    />
                );
            })}
        </Routes>
    );
};

export default Router;