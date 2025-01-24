import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { lazy} from "react";
import DefaultLayout from "@/layouts/DefaultLayout";
import '@/scss/app.scss';
import { Provider, useSelector } from 'react-redux'
import store from './helpers/store';

// Bootstrap
import { Offcanvas } from "bootstrap";

const initialTheme = store.getState().settings.background;

document.documentElement.setAttribute('data-bs-theme', initialTheme);

store.subscribe(() => {
    const theme = store.getState().settings.background;
    document.documentElement.setAttribute('data-bs-theme', theme);
});

const Home = lazy(() => import("@/pages/Home"))
const History = lazy(() => import("@/pages/History"))
const Settings = lazy(() => import("@/pages/Settings"))

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/history" element={<History />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
)