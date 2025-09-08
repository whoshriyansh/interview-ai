import Navbar from "@/components/shared/Navbar";
import "./../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex overflow-hidden w-screen h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="overflow-auto flex-1">{children}</main>
      </div>
    </div>
  );
}
