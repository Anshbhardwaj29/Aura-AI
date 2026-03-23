import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Global Background Glow Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        {/* Top Left Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-aura-primary/10 blur-[120px] rounded-full" />
        {/* Bottom Right Glow */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-aura-primary/10 blur-[120px] rounded-full" />
      </div>

      <Navbar />

      <main className="flex-1 flex flex-col w-full relative z-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
