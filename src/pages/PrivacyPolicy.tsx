import { SiteFooter } from "../components/SiteFooter";
import { Button } from "../components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "wouter";

export function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Mesh Gradients Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-glow-1 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-glow-2 rounded-full blur-[140px] pointer-events-none"></div>

      <header className="relative z-10 glass border-b border-white/10 mb-12">
        <div className="container mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
             <div className="p-2 bg-blue-500 rounded-lg">
                <Shield size={18} className="text-white" />
             </div>
             <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">Security Protocols</h1>
          </div>
          <div>
            <Link href="/">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Return to Core
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="relative z-10 container mx-auto px-4 max-w-4xl flex-1 mb-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-400 font-medium">
            Defining the operational boundaries of data handling and system security.
          </p>
        </div>

        <div className="space-y-12 glass rounded-3xl p-8 md:p-12 shadow-sm border border-white/10">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
               <span className="text-blue-500 font-mono text-sm">01.</span> Intelligence Collection
            </h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              We process network metadata to provide geolocation intelligence. This includes IP addresses, routing headers, and autonomous system numbers. Detailed search telemetry is used strictly for internal system optimization and performance auditing.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
               <span className="text-blue-500 font-mono text-sm">02.</span> Operational Usage
            </h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              Collected metrics are utilized for real-time infrastructure mapping, security threat neutralization, and the continuous refinement of our geolocation algorithms. We do not sell or distribute identified user reconnaissance data.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
               <span className="text-blue-500 font-mono text-sm">03.</span> Encryption & Storage
            </h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              All communications between the operator and GeoProbe nodes are secured via high-grade TLS encryption. Search histories are cached using non-persistent memory protocols to prevent long-term data exposure.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
               <span className="text-blue-500 font-mono text-sm">04.</span> Protocol Inquiries
            </h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              For detailed technical specifications regarding our data security architecture, please contact our Information Security Liaison through the support terminal.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
