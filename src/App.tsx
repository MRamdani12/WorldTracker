import { useEffect, useState } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home/Home";
import NotFound from "./pages/404/NotFound";
import { AppLayout } from "./pages/App/AppLayout";
import Login from "./pages/login/Login";
import AppCities from "./components/App/cities/AppCities";
import { fetchJSON } from "./utility/api/fetchJSON";
import type { CityType } from "./utility/types/CitiesType";

const BASE_URL = "http://localhost:8000";

export default function App() {
    const [cities, setCities] = useState<CityType[] | []>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchCities() {
            setLoading(true);
            try {
                const data = await fetchJSON<CityType[]>(`${BASE_URL}/cities`);

                setCities(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }

        fetchCities();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="app" element={<AppLayout />}>
                    <Route index element={<Navigate replace to="cities" />} />

                    <Route
                        path="cities"
                        element={
                            <AppCities cities={cities} loading={loading} />
                        }
                    />
                    <Route path="countries" element={<h1>Countries</h1>} />
                    <Route path="form" element={<h1>Form</h1>} />
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
