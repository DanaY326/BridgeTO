import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "./contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FindEvent from "./pages/FindEvent";
import CreateEvent from "./pages/CreateEvent";
import Resources from "./pages/Resources";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Map from "./pages/Map";
import { User } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <UserProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/find" element={<FindEvent />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/map" element={<Map />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </UserProvider>
);

export default App;
