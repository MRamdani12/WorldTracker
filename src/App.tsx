import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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

export default function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            index
                            path="/"
                            element={
                                <Suspense
                                    fallback={
                                        <LoadingFullPage>
                                            Loading page...
                                        </LoadingFullPage>
                                    }
                                >
                                    <Home />
                                </Suspense>
                            }
                        />

                        <Route
                            path="app"
                            element={
                                <ProtectedRoute>
                                    <Suspense
                                        fallback={
                                            <LoadingFullPage>
                                                Loading page...
                                            </LoadingFullPage>
                                        }
                                    >
                                        <AppLayout />
                                    </Suspense>
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                index
                                element={<Navigate replace to="cities" />}
                            />
                            <Route path="cities/:id" element={<AppCity />} />
                            <Route path="cities" element={<AppCities />} />
                            <Route
                                path="countries"
                                element={<AppCountries />}
                            />
                            <Route path="form" element={<AppForm />} />
                            <Route
                                path="*"
                                element={
                                    <Message className="error">
                                        Url not found, click on the map or the
                                        button
                                    </Message>
                                }
                            />
                        </Route>

                        <Route
                            path="login"
                            element={
                                // Wrapping a div outside the suspense can fix the fallback not showing bug,
                                // It's most likely that the Suspense doesn't get re-rendered and still using the old resolved Suspense (Homepage) everytime the url changes
                                // And thus it keeps showing the old view before snapping to the next view immediately (Login component in this case) signing that the Suspense doesn't work at all
                                // So giving the suspense a random key (Like crypto.randomUUID() or location.pathname in this case) make it force re-mount everytime a new Suspense shows up.

                                // CMIIW

                                <Suspense
                                    key={location.pathname}
                                    fallback={
                                        <LoadingFullPage>
                                            Loading page...
                                        </LoadingFullPage>
                                    }
                                >
                                    <Login />
                                </Suspense>
                            }
                        />

                        <Route
                            path="*"
                            element={
                                <Suspense
                                    key={location.pathname}
                                    fallback={
                                        <LoadingFullPage>
                                            Loading page...
                                        </LoadingFullPage>
                                    }
                                >
                                    <NotFound />
                                </Suspense>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}
