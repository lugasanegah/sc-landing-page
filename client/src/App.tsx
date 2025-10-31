import { Switch, Route } from "wouter";
import { queryClient } from "@/domains/shared/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/domains/shared/components/ui/toaster";
import { TooltipProvider } from "@/domains/shared/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Suspense, lazy } from "react";

// Eager load only critical components
import { LandingPage } from "@/domains/landing/LandingPage";

// Lazy load all other components
const PricingPage = lazy(() => import("@/domains/pricing/PricingPage").then(m => ({ default: m.PricingPage })));
const FeaturesSection = lazy(() => import("@/domains/features/pages/FeaturesSection").then(m => ({ default: m.FeaturesSection })));
const AboutSection = lazy(() => import("./domains/about/pages/AboutSection").then(m => ({ default: m.AboutSection })));
const GetDemoPage = lazy(() => import("@/domains/demo/pages/GetDemoPage"));
const DemoPage = lazy(() => import("./domains/demo/pages/demoPage"));
const AdminLoginPage = lazy(() => import("@/domains/admin/pages/LoginPage").then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import("@/domains/admin/pages/DashboardPage").then(m => ({ default: m.AdminDashboardPage })));
const AdminBlogListPage = lazy(() => import("@/domains/admin/pages/BlogListPage").then(m => ({ default: m.BlogListPage })));
const BlogCreatePage = lazy(() => import("@/domains/admin/pages/BlogCreatePage").then(m => ({ default: m.BlogCreatePage })));
const AdminBlogDetailPage = lazy(() => import("@/domains/admin/pages/BlogDetailPage").then(m => ({ default: m.BlogDetailPage })));
const BlogEditPage = lazy(() => import("@/domains/admin/pages/BlogEditPage").then(m => ({ default: m.BlogEditPage })));
const CategoriesPage = lazy(() => import("@/domains/admin/pages/CategoriesPage").then(m => ({ default: m.CategoriesPage })));
const DemoRequestsPage = lazy(() => import("@/domains/admin/pages/DemoRequestsPage"));
const SubscriptionPlanManagementPage = lazy(() => import("@/domains/admin/pages/SubscriptionPlanManagementPage").then(m => ({ default: m.SubscriptionPlanManagementPage })));
const BlogSection = lazy(() => import("@/domains/blog/pages/BlogSection").then(m => ({ default: m.BlogSection })));
const BlogDetailPage = lazy(() => import("@/domains/blog/pages/BlogDetailPage").then(m => ({ default: m.BlogDetailPage })));
const FaqPage = lazy(() => import("./domains/Faq/FaqPages").then(m => ({ default: m.FaqPage })));
const PrivacyPolicyPage = lazy(() => import("./domains/nonRouting/PrivacyPolicyPage").then(m => ({ default: m.PrivacyPolicyPage })));
const TosPage = lazy(() => import("./domains/nonRouting/TosPage").then(m => ({ default: m.TosPage })));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Public pages */}
        <Route path="/" component={LandingPage} />
        <Route path="/features" component={FeaturesSection} />
        <Route path="/about" component={AboutSection} />
        <Route path="/get-demo" component={DemoPage} />
        <Route path="/pricing" component={PricingPage} />
        <Route path="/blog" component={BlogSection} />
        <Route path="/blog/:slug" component={BlogDetailPage} />
        <Route path="/faq" component={FaqPage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/termofservice" component={TosPage} />

        {/* Admin pages */}
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/admin" component={AdminDashboardPage} />
        <Route path="/admin/blogs" component={AdminBlogListPage} />
        <Route path="/admin/blogs/create" component={BlogCreatePage} />
        <Route path="/admin/blogs/:id" component={AdminBlogDetailPage} />
        <Route path="/admin/blogs/:id/edit" component={BlogEditPage} />
        <Route path="/admin/categories" component={CategoriesPage} />
        <Route path="/admin/demo-requests" component={DemoRequestsPage} />
        <Route path="/admin/subscription-plans" component={SubscriptionPlanManagementPage} />

        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
