import Navbar from "@/components/shared/Navbar";
import "./../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Navbar */}
      <header className="shrink-0">
        <Navbar />
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden mt-4">
        {children}
      </main>
    </div>
  );
}
