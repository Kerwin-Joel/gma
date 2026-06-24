import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { MobileBar } from "./components/layout/MobileBar";

const Home            = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const ServicePage     = lazy(() => import("./pages/ServicePage").then(m => ({ default: m.ServicePage })));
const BlogPage        = lazy(() => import("./pages/BlogPage").then(m => ({ default: m.BlogPage })));
const BlogPostPage    = lazy(() => import("./pages/BlogPostPage").then(m => ({ default: m.BlogPostPage })));
const TestimonialsPage = lazy(() => import("./pages/TestimonialsPage").then(m => ({ default: m.TestimonialsPage })));
const PrivacyPage     = lazy(() => import("./pages/PrivacyPage").then(m => ({ default: m.PrivacyPage })));
const AboutPage       = lazy(() => import("./pages/AboutPage").then(m => ({ default: m.AboutPage })));

function PageShell() {
  return <div style={{ minHeight: "100vh" }} />;
}

export default function App() {
  return (
    <>
      <Suspense fallback={<PageShell />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicio/:id" element={<ServicePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/testimonios" element={<TestimonialsPage />} />
          <Route path="/privacidad" element={<PrivacyPage />} />
          <Route path="/nosotros" element={<AboutPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <MobileBar />
    </>
  );
}
