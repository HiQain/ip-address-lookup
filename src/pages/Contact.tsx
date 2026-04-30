import { useState, type FormEvent } from "react";
import { Link } from "wouter";
import { ArrowLeft, MessageSquare, PhoneCall } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { SiteFooter } from "../components/SiteFooter";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_FORM);
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Mesh Gradients Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-glow-1 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-glow-2 rounded-full blur-[140px] pointer-events-none"></div>

      <header className="relative z-10 glass border-b border-white/10">
        <div className="container mx-auto px-4 h-20 flex items-center gap-3 max-w-6xl">
          <div className="bg-blue-500/10 p-2.5 rounded-xl border border-blue-500/20">
            <PhoneCall className="h-5 w-5 text-blue-400" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">Liaison Center</h1>
          <div className="ml-auto">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Return to Core
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto flex-1 max-w-3xl px-4 py-16">
        <div className="grid gap-8">
          <Card className="glass-xl border border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MessageSquare className="h-5 w-5 text-blue-400" />
                <CardTitle className="text-white">Secure Transmission</CardTitle>
              </div>
              <CardDescription className="text-slate-400 font-medium">
                Establish a direct link with our intelligence coordination team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-sm text-emerald-400 font-medium backdrop-blur-md">
                  Transmission received. Your query has been logged and our team will respond through secure channels shortly.
                </div>
              ) : null}

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(event) => updateField("name", event.target.value)}
                      placeholder="Operator Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Return Channel (Email)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(event) => updateField("email", event.target.value)}
                      placeholder="name@domain.tld"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Intelligence Subject</Label>
                  <Input
                    id="subject"
                    value={form.subject}
                    onChange={(event) => updateField("subject", event.target.value)}
                    placeholder="Classification Topic"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Detailed Payload</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    placeholder="Provide detailed description of your request..."
                    className="min-h-36"
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Initiate Secure Handshake
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
}
