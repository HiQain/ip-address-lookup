import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MapPin,
  Shield,
  Globe,
  Server,
  Cpu,
  Info,
  RefreshCw,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Activity
} from 'lucide-react';
import Map from './Map';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SiteFooter } from './SiteFooter';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface IPDetails {
  ip: string;
  status: string;
  country: string;
  countryCode: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  asname: string;
  reverse: string;
  mobile: boolean;
  proxy: boolean;
  hosting: boolean;
  query: string;
  continentCode?: string;
  offset?: number;
  currency?: string;
  district?: string;
}

export default function IPDashboard() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<IPDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const isLocalIp = (ip: string) => {
    return /^(127\.0\.0\.1|::1|::ffff:127\.0\.0\.1|0\.0\.0\.0|::ffff:0\.0\.0\.0)$/.test(ip);
  };

  const fetchIPDetails = async (target: string = '', showError = true) => {
    setLoading(true);
    if (showError) {
      setError(null);
    }
    try {
      // If target is empty, we lookup the user's current IP first to get the IP string, then lookup details
      let lookupQuery = target;
      if (!target) {
        const myIpRes = await axios.get('/api/my-ip');
        lookupQuery = myIpRes.data.ip;

        // Local development can return a loopback/reserved address, which should not show an error toast on initial load.
        if (!lookupQuery || isLocalIp(lookupQuery)) {
          setLoading(false);
          return;
        }
      }

      const res = await axios.get(`/api/lookup/${lookupQuery}`);
      setData(res.data);

      if (lookupQuery && !recentSearches.includes(lookupQuery)) {
        setRecentSearches(prev => [lookupQuery, ...prev].slice(0, 5));
      }
    } catch (err: any) {
      if (showError) {
        setError(err.response?.data?.error || 'Target not found or invalid');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIPDetails('', false);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchIPDetails(query.trim());
    }
  };

  const DetailCard = ({ label, value, icon: Icon, subValue }: { label: string, value: string | boolean, icon: any, subValue?: string }) => (
    <div className="glass p-6 rounded-3xl flex flex-col transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
        <div className="p-1.5 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
          <Icon size={14} className="text-blue-400" />
        </div>
      </div>
      <div className="text-xl font-semibold text-white truncate">{String(value)}</div>
      {subValue && <div className="text-xs text-slate-400 mt-1 truncate">{subValue}</div>}
      <div className="w-8 h-1 bg-blue-500 rounded-full mt-4 transition-all group-hover:w-16"></div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Mesh Gradients Background */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-glow-1 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-glow-2 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-glow-3 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-8xl mx-auto w-full p-4 md:p-8 flex-1 flex flex-col gap-8">
        {/* Header Area */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Globe size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                IP.SCOPE<span className="text-blue-500 font-mono text-[10px] ml-1 uppercase tracking-tighter">Enterprise</span>
              </h1>
            </div>
          </div>
        </header>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto w-full mb-2">
          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              placeholder="Search for any IP address or domain..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full glass-xl rounded-2xl py-5 px-14 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-500 shadow-2xl"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={20} />
            <button
              type="submit"
              className="absolute right-3 top-3 bottom-3 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 active:scale-95 disabled:opacity-50"
              disabled={loading}
            >
              <Activity size={18} className={cn(loading && "animate-spin")} />
              {loading ? 'Analyzing' : 'Analyze'}
            </button>
          </form>
          {data && (
            <p className="text-center text-slate-500 text-[10px] mt-4 tracking-[0.2em] uppercase">
              Current Observation: <span className="text-blue-400 font-mono">{data.query}</span>
            </p>
          )}
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DetailCard label="IP Address" value={data?.query || '0.0.0.0'} icon={Info} subValue={data?.reverse || 'No reverse hostname'} />
          <DetailCard label="Location" value={data ? `${data.city}, ${data.countryCode}` : 'Unknown'} icon={MapPin} subValue={data ? `${data.country}, ${data.continentCode || ''}` : '---'} />
          <DetailCard label="Timezone" value={data?.timezone || 'UTC+00:00'} icon={Activity} subValue={data ? `Offset: ${data.offset}` : '---'} />
          <DetailCard label="ISP" value={data?.isp || '---'} icon={Server} subValue={data?.as || '---'} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">

          {/* Map Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="glass rounded-3xl p-2 min-h-[450px] relative shadow-2xl overflow-hidden group">
              {data ? (
                <Map center={[data.lat, data.lon]} label={data.city} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/40 rounded-2xl">
                  <Globe className="text-blue-500/20 animate-pulse mb-4" size={64} />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">Locked on Target</span>
                </div>
              )}

              {loading && (
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md z-10 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="text-blue-500 animate-spin" size={32} />
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Scanning...</span>
                  </div>
                </div>
              )}

              <div className="absolute bottom-6 left-6 flex gap-2 pointer-events-none">
                <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl text-[10px] font-mono text-slate-300">
                  LAT: {data?.lat.toFixed(4) || '0.0000'}
                </div>
                <div className="px-4 py-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl text-[10px] font-mono text-slate-300">
                  LONG: {data?.lon.toFixed(4) || '0.0000'}
                </div>
              </div>
            </div>
          </div>

          {/* Technical Info Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="glass rounded-3xl p-8 flex flex-col gap-8 shadow-xl flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <div className="p-1 bg-blue-500 rounded">
                    <Cpu size={14} className="text-white" />
                  </div>
                  Technical Analysis
                </h3>
                <div className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[9px] font-bold text-blue-400 uppercase tracking-wider">Active</div>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs text-slate-500">Network Type</span>
                  <span className="text-xs font-mono text-slate-300">
                    {data?.hosting ? 'Data Center' : data?.mobile ? 'Mobile' : 'Residential'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs text-slate-500">Currency</span>
                  <span className="text-xs font-mono text-slate-300">{data?.currency || '---'}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs text-slate-500">Proxy / VPN</span>
                  <span className={cn("text-xs font-mono", data?.proxy ? "text-orange-400" : "text-emerald-400")}>
                    {data?.proxy ? 'Detected' : 'Negative'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-xs text-slate-500">AS Name</span>
                  <span className="text-xs font-mono text-blue-400 truncate max-w-[150px]" title={data?.asname}>
                    {data?.asname || '---'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">District</span>
                  <span className="text-xs font-mono text-slate-300">{data?.district || 'N/A'}</span>
                </div>
              </div>

              <div className="mt-auto flex flex-col gap-3">
                <button
                  onClick={() => {
                    const json = JSON.stringify(data, null, 2);
                    const blob = new Blob([json], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `ip-lookup-${data?.query || 'export'}.json`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all shadow-sm"
                >
                  Export Data as JSON
                </button>
                {recentSearches.length > 0 && (
                  <div className="pt-4 border-t border-white/5">
                    <div className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">Recent Logs</div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((ip, i) => (
                        <button
                          key={i}
                          onClick={() => fetchIPDetails(ip)}
                          className="px-3 py-1.5 glass rounded-lg text-[10px] font-mono text-slate-400 hover:text-blue-400 hover:bg-white/10 transition-all"
                        >
                          {ip}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />

      {/* Global Loading Overlay */}
      <AnimatePresence>
        {loading && !data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-950 z-50 flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.5em] animate-pulse">Initializing Probe...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Toast */}
      {error && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-xs font-mono z-50 backdrop-blur-md"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}
