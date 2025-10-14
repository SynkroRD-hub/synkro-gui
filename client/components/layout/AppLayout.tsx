import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-background dark:to-background">
      <Navbar />
      <main className="container py-6">
        <Outlet />
      </main>
    </div>
  );
}
