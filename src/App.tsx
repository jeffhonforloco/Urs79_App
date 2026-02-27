
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./components/urs79/SiteLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import MusicPage from "./pages/MusicPage";
import DistributionPage from "./pages/DistributionPage";
import ArtistsPage from "./pages/ArtistsPage";
import NewsPage from "./pages/NewsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminArtists from "./pages/admin/AdminArtists";
import AdminReleases from "./pages/admin/AdminReleases";
import AdminNews from "./pages/admin/AdminNews";
import AdminSubmissions from "./pages/admin/AdminSubmissions";
import AdminProductsPage from "./pages/admin/AdminProducts";
import ShopPage from "./pages/ShopPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/music" element={<MusicPage />} />
            <Route path="/distribution" element={<DistributionPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="projects" element={<AdminProjects />} />
            <Route path="artists" element={<AdminArtists />} />
            <Route path="releases" element={<AdminReleases />} />
            <Route path="news" element={<AdminNews />} />
            <Route path="submissions" element={<AdminSubmissions />} />
            <Route path="products" element={<AdminProductsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
