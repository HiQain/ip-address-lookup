import { Link } from "wouter";
import { useListBlogs } from "../hooks/useListBlogs";
import type { BlogPost } from "../lib/blog-store";
import { Button } from "../components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { SiteFooter } from "../components/SiteFooter";

function formatBlogDate(publishedAt: string): string {
  return new Date(publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function Blog() {
  const { data: posts = [] } = useListBlogs();

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
       {/* Mesh Gradients Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-glow-1 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-glow-2 rounded-full blur-[140px] pointer-events-none"></div>

      <header className="relative z-10 glass border-b border-white/10 mb-12">
        <div className="container mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
             <div className="p-2 bg-blue-500 rounded-lg">
                <BookOpen size={18} className="text-white" />
             </div>
             <h1 className="text-lg font-bold tracking-tight text-white sm:text-xl">Intelligence Logs</h1>
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
      
      <main className="relative z-10 container mx-auto px-4 max-w-5xl flex-1 mb-20">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">Network Intelligence Blog</h1>
          <p className="text-lg text-slate-400 max-w-2xl">
            Deep dives into geolocation technology, network security, and real-time infrastructure analysis.
          </p>
        </div>

        <div className="grid gap-8">
          {(posts as BlogPost[]).map((post) => (
            <article
              key={post.id}
              className="glass rounded-3xl p-8 md:p-10 shadow-sm border border-white/5 hover:border-blue-500/20 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400">{formatBlogDate(post.publishedAt)}</p>
                <h2 className="text-2xl font-bold text-white tracking-tight">{post.title}</h2>
                <p className="text-slate-400 leading-relaxed">{post.excerpt}</p>
                <p className="text-sm leading-7 text-slate-500 mt-4 border-l-2 border-white/5 pl-6 italic">{post.content}</p>
                <div className="mt-4">
                   <Button variant="ghost" size="sm" className="text-blue-400 group p-0 hover:bg-transparent">
                      Read Intelligence Report <ArrowLeft className="ml-2 rotate-180 group-hover:translate-x-1 transition-transform" size={14} />
                   </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
