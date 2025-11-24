import {
    BrowserRouter,
    Navigate,
    Outlet,
    Route,
    Routes,
    useLocation,
} from "react-router-dom";
import { lazy, Suspense } from "react";

import AppCities from "./components/App/cities/AppCities";
import AppCountries from "./components/App/countries/AppCountries";
import AppCity from "./components/App/cities/AppCity";
import AppForm from "./components/App/AppForm";
import Message from "./components/ui/Message";

import { CitiesProvider } from "./contexts/CitiesProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./pages/ProtectedRoute";
import LoadingFullPage from "./components/ui/LoadingFullPage";

// Lazy load all the page components
const Home = lazy(() => import("./pages/home/Home"));
const NotFound = lazy(() => import("./pages/404/NotFound"));
const AppLayout = lazy(() => import("./pages/App/AppLayout"));
const Login = lazy(() => import("./pages/login/Login"));

function Layout() {
    const location = useLocation();

    return (
        <Suspense
            fallback={<LoadingFullPage>Loading page...</LoadingFullPage>}
            key={location.pathname}
        >
            <Outlet />
        </Suspense>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense
                        fallback={
                            <LoadingFullPage>Loading page...</LoadingFullPage>
                        }
                    >
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route
                                    path="app"
                                    element={
                                        <ProtectedRoute>
                                            <AppLayout />
                                        </ProtectedRoute>
                                    }
                                >
                                    <Route
                                        index
                                        element={
                                            <Navigate replace to="cities" />
                                        }
                                    />
                                    <Route
                                        path="cities/:id"
                                        element={<AppCity />}
                                    />
                                    <Route
                                        path="cities"
                                        element={<AppCities />}
                                    />
                                    <Route
                                        path="countries"
                                        element={<AppCountries />}
                                    />
                                    <Route path="form" element={<AppForm />} />
                                    <Route
                                        path="*"
                                        element={
                                            <Message className="error">
                                                Url not found, click on the map
                                                or the button
                                            </Message>
                                        }
                                    />
                                </Route>
                                <Route path="login" element={<Login />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}
