import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0 legal-pattern" aria-hidden="true" />
        <div className="absolute inset-0 opacity-40 legal-grid" aria-hidden="true" />

        <div className="relative flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <div className="min-h-[calc(100vh-10rem)]">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};
