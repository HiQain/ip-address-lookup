import { Link } from "wouter";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { SiteFooter } from "../components/SiteFooter";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const SECTIONS = [
  {
    title: "General Information",
    body:
      "The information and tools provided on GeoProbe (hiqain.com) are for general informational and utility purposes only. We make no warranty of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the services provided.",
  },
  {
    title: "Intelligence Accuracy",
    body:
      "While we strive to provide the most precise IP geolocation data available, physical location accuracy depends on carrier routing, proxy usage, and database synchronization. Intelligence data should be verified through independent secondary systems for critical operations.",
  },
  {
    title: "Privacy & Data Security",
    body:
      "Data queried through our system is processed in real-time. We prioritize the security of all network reconnaissance activities. User-provided search queries are handled according to our secure processing protocols.",
  },
  {
    title: "Limitation of Liability",
    body:
      "GeoProbe shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of our intelligence suite. Use of these reconnaissance tools is at the operator's own risk.",
  },
];

export default function DisclaimerPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Mesh Gradients Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-glow-1 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-glow-2 rounded-full blur-[140px] pointer-events-none"></div>

      <header className="relative z-10 glass border-b border-white/10">
        <div className="container mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
             <div className="p-2 bg-blue-500 rounded-lg">
                <AlertTriangle size={18} className="text-white" />
             </div>
             <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">Terms of Engagement</h1>
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

      <main className="relative z-10 container mx-auto flex-1 max-w-4xl space-y-6 px-4 pt-12 pb-20">
        <Card className="glass-xl border border-white/10">
          <CardHeader className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-white">Legal Disclaimer</CardTitle>
            </div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Revision: FEB.2026.04</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {SECTIONS.map((section) => (
              <section key={section.title} className="space-y-3 border-l-2 border-white/5 pl-6">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300">{section.title}</h2>
                <p className="text-sm leading-relaxed text-slate-500">{section.body}</p>
              </section>
            ))}

            <section className="space-y-3 pt-6 border-t border-white/5">
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300">Contact Support</h2>
              <p className="text-sm leading-relaxed text-slate-500">
                For legal inquiries or protocol clarification, please visit our{" "}
                <Link href="/contact" className="text-blue-400 font-bold hover:underline underline-offset-4">
                  Liaison Center
                </Link>.
              </p>
            </section>
          </CardContent>
        </Card>
      </main>
      
      <SiteFooter />
    </div>
  );
}
