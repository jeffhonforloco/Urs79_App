
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./components/urs79/SiteLayout";
import HomePage from "./pages/HomePage";
import { CartProvider } from "./contexts/CartContext";
import { CartDrawer } from "./components/shop/CartDrawer";

// Lazy-load all non-critical pages
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const MusicPage = lazy(() => import("./pages/MusicPage"));
const DistributionPage = lazy(() => import("./pages/DistributionPage"));
const ArtistsPage = lazy(() => import("./pages/ArtistsPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const SubmitMusicPage = lazy(() => import("./pages/SubmitMusicPage"));
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects"));
const AdminArtists = lazy(() => import("./pages/admin/AdminArtists"));
const AdminReleases = lazy(() => import("./pages/admin/AdminReleases"));
const AdminNews = lazy(() => import("./pages/admin/AdminNews"));
const AdminSubmissions = lazy(() => import("./pages/admin/AdminSubmissions"));
const AdminProductsPage = lazy(() => import("./pages/admin/AdminProducts"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminRoles = lazy(() => import("./pages/admin/AdminRoles"));
const WorkerTestPage = lazy(() => import("./pages/WorkerTestPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
        <CartDrawer />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/artists" element={<ArtistsPage />} />
              <Route path="/music" element={<ArtistsPage />} />
              <Route path="/distribution" element={<ServicesPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:slug" element={<ProductPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            <Route path="/submit" element={<SubmitMusicPage />} />
            <Route path="/worker-test" element={<WorkerTestPage />} />
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="projects" element={<AdminProjects />} />
              <Route path="artists" element={<AdminArtists />} />
              <Route path="releases" element={<AdminReleases />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="submissions" element={<AdminSubmissions />} />
              <Route path="products" element={<AdminProductsPage />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="roles" element={<AdminRoles />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
