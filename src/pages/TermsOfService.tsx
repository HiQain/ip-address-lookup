import { SiteFooter } from "../components/SiteFooter";
import { Button } from "../components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "wouter";

export function TermsOfService() {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Mesh Gradients Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-glow-1 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-glow-2 rounded-full blur-[140px] pointer-events-none"></div>

      <header className="relative z-10 glass border-b border-white/10 mb-12">
        <div className="container mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
             <div className="p-2 bg-blue-500 rounded-lg">
                <FileText size={18} className="text-white" />
             </div>
             <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">Engagement Protocols</h1>
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
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">Terms of Service</h1>
          <p className="text-lg text-slate-400 font-medium">
            Operational mandates for utilizing GeoProbe intelligence systems.
          </p>
        </div>

        <div className="space-y-12 glass rounded-3xl p-8 md:p-12 shadow-sm border border-white/10">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
               <span className="text-blue-500">[01]</span> AUTHORIZED USE
            </h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              Operators are granted conditional access to GeoProbe intelligence for legitimate reconnaissance, security auditing, and network analysis. Automated harvesting or unauthorized system stress testing is strictly prohibited and subject to protocol termination.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
               <span className="text-blue-500">[02]</span> SYSTEM AVAILABILITY
            </h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              While we maintain 99.9% node uptime, intelligence stream availability may fluctuate based on global network conditions and scheduled core maintenance. We reserve the right to temporarily suspend nodes for security optimization without prior notice.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
               <span className="text-blue-500">[03]</span> DATA INTEGRITY
            </h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              Intelligence outputs are provided "as-is" based on multi-vector database synchronization. Users acknowledge that network topology evolves rapidly; GeoProbe provides current-snapshot data based on the most recent reconnaissance sweeps.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 font-mono">
               <span className="text-blue-500">[04]</span> PROTOCOL VIOLATIONS
            </h2>
            <p className="text-slate-400 leading-relaxed font-medium">
              Violations of these terms may result in immediate access revocation and blacklisting of operator-controlled network ranges from our intelligence nodes.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
