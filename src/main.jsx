import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";

import HomePage from "./pages/home/home.page.jsx";
import DashboardPage from "./pages/dashboard/dashboard.page.jsx";
import AdminPage from "./pages/admin/admin.page.jsx";
import SignInPage from "./pages/auth/sign-in-page.jsx";
import SignUpPage from "./pages/auth/sign-up-page.jsx";
import SolarUnitsPage from "./pages/admin/solar-units.page";
import SettingsPage from "./pages/admin/settings.page.jsx";
import SolarUnitDetailPage from "./pages/admin/solar-unit-detail.page";
import SolarUnitCreatePage from "./pages/admin/solar-unit-create.page.jsx";
import SolarUnitEditPage from "./pages/admin/solar-unit-edit.page.jsx";
import AnomaliesPage from "./pages/anomalies/anomalies.page.jsx";
import InvoicesPage from "./pages/invoices/invoices.page.jsx";
import PaymentCompletePage from "./pages/invoices/complete.page.jsx";
import PaymentPage from "./pages/invoices/payment.page";
import AdminInvoicesPage from "./pages/admin/admin-invoice.page";
import AdminAnomaliesPage from "./pages/admin/admin.anomalies.page.jsx";
import AdminPaymentInfoPage from "./pages/admin/components/AdminPaymentInfo.page"

import RootLayout from "./layouts/root.layout.jsx";
import MainLayout from "./layouts/main.layout";
import DashboardLayout from "./layouts/dashboard.layout";
import AdminLayout from "./layouts/admin.layout.jsx";
import ProtectedLayout from "./layouts/protected.layout.jsx";
import AuthorizedLayout from "./layouts/authorized.layout";

import { store } from "@/lib/redux/store.js";
import { Provider } from "react-redux";
import { ClerkProvider } from '@clerk/react-router'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
              </Route>
              <Route element={<ProtectedLayout />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/dashboard/invoices" element={<InvoicesPage />} />
                 <Route path="/dashboard/invoices/:invoiceId/payment" element={<PaymentPage />} />
                  <Route path="/dashboard/invoices/complete" element={<PaymentCompletePage />} />
                 <Route path="/dashboard/anomalies" element={<AnomaliesPage />} />
                </Route>
              <Route element={<AuthorizedLayout />}>
                  <Route element={<AdminLayout />}>
                     <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/solar-units" element={<SolarUnitsPage />} />
                    <Route path="/admin/solar-units/:id" element={<SolarUnitDetailPage />} />
                    <Route path="/admin/solar-units/:id/edit" element={<SolarUnitEditPage />} /> 
                    <Route path="/admin/solar-units/create" element={<SolarUnitCreatePage />} />
                    <Route path="/admin/anomalies" element={<AdminAnomaliesPage />} />
                    <Route path="/admin/invoices" element={<AdminInvoicesPage />} />
                    <Route path="/admin/invoices/:invoiceId/payment" element={<AdminPaymentInfoPage />} />
                    <Route path="/admin/settings" element={<SettingsPage />} />
                  </Route>
              </Route>
               
              </Route>
            </Route>
          </Routes>
        </ClerkProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);