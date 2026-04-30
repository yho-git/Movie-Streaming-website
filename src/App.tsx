/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Search, 
  Play, 
  Plus, 
  Star, 
  Cpu, 
  Zap, 
  Clock, 
  List, 
  Check, 
  ChevronRight, 
  Tv, 
  Activity, 
  Shield, 
  Gem,
  MessageSquare,
  ArrowUpRight,
  TrendingUp,
  Brain
} from 'lucide-react';
import { getMovieRecommendations, RecommendationResponse } from './services/geminiService';

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-3rem)] max-w-5xl`}>
      <div className={`px-8 py-3 rounded-full border border-white/10 glass-panel flex items-center justify-between shadow-2xl transition-all duration-500 ${scrolled ? 'bg-black/60 shadow-purple-500/10' : 'bg-white/5'}`}>
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-6 h-6 bg-gradient-to-tr from-brand-purple to-brand-blue rounded-sm rotate-45 transform transition-transform group-hover:rotate-90" />
          <span className="font-bold tracking-tighter text-lg uppercase">CINEMIND</span>
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          {['Discover', 'AI Picks', 'Pricing', 'API'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">
              {item}
            </a>
          ))}
        </div>

        <button className="bg-white text-black text-xs font-bold px-5 py-2 rounded-full hover:bg-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all active:scale-95 uppercase">
          Get Started
        </button>
      </div>
    </nav>
  );
};

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 group hover:bg-white/10 transition-all duration-500 relative overflow-hidden ${className}`}>
    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
        <ArrowUpRight className="w-4 h-4 text-white" />
      </div>
    </div>
    {children}
  </div>
);

const FeatureSection = () => {
  const features = [
    {
      icon: <Search className="w-5 h-5 text-brand-purple" />,
      title: "AI Recommendations",
      description: "Neural mapping of your cinematic DNA."
    },
    {
      icon: <Zap className="w-5 h-5 text-brand-blue" />,
      title: "Real-time Insights",
      description: "Deep metadata and scene analysis as you watch."
    },
    {
      icon: <Plus className="w-5 h-5 text-brand-cyan" />,
      title: "Smart Watchlists",
      description: "Dynamic lists that evolve with your moods."
    }
  ];

  return (
    <section className="py-20 px-6 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl group hover:bg-white/10 transition-all cursor-default">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center mb-4 border border-white/5 group-hover:border-white/10 transition-colors">
                {f.icon}
              </div>
              <h3 className="font-bold text-base mb-1">{f.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const AIInteractiveDemo = () => {
  const [prompt, setPrompt] = useState("");
  const [results, setResults] = useState<RecommendationResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const recommendations = await getMovieRecommendations(prompt);
      setResults(recommendations);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 px-6 relative overflow-hidden" id="ai-picks">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="px-4 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-brand-purple text-[10px] font-bold tracking-widest uppercase mb-6 inline-block"
        >
          Neural Core Active
        </motion.span>
        <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">Experience <span className="font-serif italic font-light text-brand-purple">Intuition</span></h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          CineMind doesn't just list movies. It understands the architecture of your taste.
        </p>
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="p-2 rounded-2xl border border-white/10 glass-panel flex items-center gap-4 focus-within:ring-2 focus-within:ring-brand-purple/50 transition-all">
          <Search className="w-6 h-6 text-white/30 ml-4" />
          <input 
            type="text" 
            placeholder="Tell CineMind what you're in the mood for..."
            className="flex-1 bg-transparent border-none outline-none py-4 text-lg font-light text-white placeholder:text-white/20"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 font-bold shadow-[0_0_15px_rgba(147,51,234,0.3)] hover:scale-[1.02] transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Zap className="w-5 h-5 animate-spin" /> : "Analyze"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-100 text-sm flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-2 text-red-400 font-bold">
                <Shield className="w-5 h-5" />
                <span>Configuration Required</span>
              </div>
              <p className="text-center opacity-80">{error}</p>
              <div className="flex gap-4">
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Get Key
                </a>
              </div>
            </motion.div>
          )}

          {results.length > 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {results.map((movie, i) => (
                <div key={i}>
                  <GlassCard className="!p-6 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-tighter">{movie.genre}</span>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-brand-purple" />
                        <span className="text-xs font-bold text-brand-purple">{movie.matchScore}%</span>
                      </div>
                    </div>
                    <h4 className="text-xl font-display font-bold text-white mb-1">{movie.title}</h4>
                    <p className="text-white/40 text-xs mb-4">{movie.year}</p>
                    <p className="text-sm text-white/70 leading-relaxed italic">"{movie.reasoning}"</p>
                  </GlassCard>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

const MovieGrid = () => {
  const movies = [
    { id: 1, title: "Nexus 7", score: 9.8, img: "https://picsum.photos/seed/movie1/400/600" },
    { id: 2, title: "Silicon Dreams", score: 9.4, img: "https://picsum.photos/seed/movie2/400/600" },
    { id: 3, title: "Ghost in Chrome", score: 9.2, img: "https://picsum.photos/seed/movie3/400/600" },
    { id: 4, title: "Void Walker", score: 9.9, img: "https://picsum.photos/seed/movie4/400/600" },
    { id: 5, title: "Parallel City", score: 8.9, img: "https://picsum.photos/seed/movie5/400/600" },
    { id: 6, title: "Aetherial", score: 9.5, img: "https://picsum.photos/seed/movie6/400/600" },
  ];

  return (
    <section className="py-32 px-6" id="discover">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-display font-bold tracking-tight">Trending in <span className="font-serif italic font-light text-brand-purple capitalize">CineMind</span></h2>
          </div>
          <button className="text-brand-purple text-sm font-bold tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {movies.map((movie) => (
            <motion.div 
              key={movie.id}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[2/3] rounded-2xl overflow-hidden relative mb-4 border border-white/10">
                <img 
                  src={movie.img} 
                  alt={movie.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-brand-purple text-white"><Play className="w-4 h-4" /></button>
                    <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="absolute top-3 right-3 px-2 py-1 glass-panel rounded-lg text-[10px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {movie.score}
                </div>
              </div>
              <h4 className="font-semibold text-white/90 truncate">{movie.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      features: ["Standard Recommendations", "HD Streaming", "Social Watchlists"],
      button: "Start Free",
      popular: false
    },
    {
      name: "CineMind OS",
      price: "19",
      features: ["Neural Match Engine", "8K Ultra Bitrate", "Early Access to Originals", "Family Sync"],
      button: "Get Full OS",
      popular: true
    },
    {
      name: "Creative",
      price: "49",
      features: ["Developer API Access", "Custom Model Training", "Pro Distribution Tools", "Priority Compute"],
      button: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section className="py-32 px-6 bg-cinematic" id="pricing">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-5xl font-display font-bold mb-6">Simple <span className="italic font-light">Ecosystem</span></h2>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`relative p-1 rounded-3xl overflow-hidden ${p.popular ? 'bg-gradient-to-b from-brand-purple to-brand-blue' : 'bg-white/10'}`}
          >
            <div className="bg-black/90 rounded-[22px] p-8 h-full flex flex-col">
              {p.popular && <span className="absolute top-4 right-8 text-[10px] font-bold tracking-widest text-brand-purple uppercase">Most Advanced</span>}
              <h3 className="text-xl font-display mb-2">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold font-display">${p.price}</span>
                <span className="text-white/40 text-sm">/mo</span>
              </div>
              
              <div className="space-y-4 mb-12 flex-1">
                {p.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 text-brand-purple" />
                    {f}
                  </div>
                ))}
              </div>
              
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${p.popular ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-[0_0_15px_rgba(147,51,234,0.2)]' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                {p.button}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 px-6 border-t border-white/5 min-h-[400px]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-blue flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-display font-bold">CineMind</span>
        </div>
        <p className="text-white/40 max-w-xs text-sm leading-relaxed mb-8">
          The future of cinematic exploration. Powered by generative vision and the neural web.
        </p>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10">
            <Activity className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24">
        <div>
          <h5 className="font-bold text-sm mb-6 text-white uppercase tracking-widest">Platform</h5>
          <ul className="space-y-4 text-sm text-white/40">
            <li><a href="#" className="hover:text-white transition-colors">Library</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Origins</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Studio</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold text-sm mb-6 text-white uppercase tracking-widest">Product</h5>
          <ul className="space-y-4 text-sm text-white/40">
            <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Models</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Sync</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between text-xs text-white/20 gap-4">
      <p>&copy; 2026 CineMind AI. All systems operational.</p>
      <div className="flex gap-6">
        <a href="#">Security</a>
        <a href="#">Ethics</a>
        <a href="#">Privacy</a>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);

  return (
    <div className="min-h-screen font-sans bg-[#020205] text-white relative overflow-x-hidden">
      <div className="noise-overlay" />
      
      {/* Ambient Lighting Glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <Navbar />

      <main>
        {/* --- Hero Section --- */}
        <section className="relative min-h-screen pt-32 pb-20 flex items-center px-6 overflow-hidden">
          <div className="absolute inset-0 bg-cinematic pointer-events-none opacity-50" />
          
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="z-10"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/30 text-brand-purple text-[10px] font-bold tracking-widest uppercase mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple" />
                </span>
                Introducing CineMind AI OS v2.0
              </div>
              
              <h1 className="text-[72px] md:text-[90px] leading-[0.85] font-bold tracking-tight mb-8">
                Cinema is <br />
                <span className="font-serif italic font-light text-brand-purple">Autonomous</span>
              </h1>
              
              <p className="text-gray-400 text-lg max-w-md leading-relaxed mb-12">
                Experience the world's first neural movie engine. Real-time streaming insights, predictive curation, and infinite discovery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold shadow-[0_0_25px_rgba(147,51,234,0.4)] hover:scale-105 transition-transform active:scale-95 group">
                  Start Watching
                </button>
                <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95">
                  View Interface
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              style={{ y: yHero }}
              className="relative hidden lg:block"
            >
              {/* Replacement for image content since generation failed */}
              <div className="relative z-10 w-64 h-64 mx-auto bg-gradient-to-b from-white/10 to-transparent rounded-full border border-white/20 p-8 shadow-[0_0_100px_rgba(59,130,246,0.2)] animate-float">
                <div className="w-full h-full bg-[#050510] rounded-full flex items-center justify-center relative overflow-hidden">
                  {/* Neural Lines SVG */}
                  <svg className="absolute inset-0 opacity-20" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="cyan" fill="none" strokeDasharray="4 2" />
                    <circle cx="50" cy="50" r="30" stroke="purple" fill="none" strokeDasharray="2 4" />
                  </svg>
                  <div className="w-12 h-12 bg-blue-500 rounded-full blur-xl" />
                  <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_white]" />
                </div>

                {/* Holographic UI Cards */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-8 glass-panel !bg-brand-purple/10 p-5 rounded-2xl border-brand-purple/30 backdrop-blur-xl z-20 shadow-[0_0_50px_rgba(139,92,246,0.2)]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-brand-purple animate-pulse" />
                    <span className="text-[10px] font-mono tracking-widest uppercase">Core Online</span>
                  </div>
                  <div className="text-2xl font-display font-bold">12<span className="text-xs text-white/50 ml-1">ms</span></div>
                  <div className="text-[10px] font-mono text-white/30 uppercase mt-1">Global Latency</div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-12 -left-12 glass-panel p-5 rounded-2xl z-20"
                >
                  <AnimatePresence mode="wait">
                    <motion.div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/20 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-brand-blue" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-brand-blue uppercase mb-0.5">AI Active</div>
                        <div className="text-sm font-bold">Live Syncing</div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
                
                {/* Floating Glow Cubes */}
                <div className="absolute top-1/4 -left-20 w-8 h-8 bg-brand-cyan blur-2xl opacity-40 animate-pulse-slow" />
                <div className="absolute bottom-1/4 -right-20 w-12 h-12 bg-brand-purple blur-3xl opacity-40 animate-pulse" />
              </div>
            </motion.div>
          </div>
        </section>

        <FeatureSection />
        
        <AIInteractiveDemo />

        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden relative border border-white/10 group cursor-crosshair">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img 
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop" 
              alt="Platform Interface" 
              className="w-full aspect-video object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-black" />
              </button>
            </div>
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div>
                <p className="text-brand-purple font-mono text-xs uppercase tracking-widest mb-2">Platform Preview</p>
                <h3 className="text-3xl font-display font-bold uppercase truncate">Synthetic Dreams (2026)</h3>
              </div>
              <div className="px-5 py-3 glass-panel rounded-2xl flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-white/30">Resolution</span>
                  <span className="text-xs font-bold text-brand-cyan">8K RAW</span>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-white/30">Dynamics</span>
                  <span className="text-xs font-bold text-brand-purple">DOLBY OS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MovieGrid />

        <Pricing />

        {/* --- Final CTA --- */}
        <section className="py-40 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-brand-purple/5 animate-pulse-slow" />
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-6xl md:text-8xl font-display font-bold mb-12 tracking-tighter">
              Ready to <br /> <span className="italic font-light">Evolve?</span>
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto mb-16 font-light leading-relaxed">
              Join 2.5 million explorers already navigating the future of cinema. Personalized, predictive, and purely cinematic.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="p-1 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-blue group">
                <button className="px-12 py-6 rounded-[14px] bg-black text-white font-bold text-lg hover:bg-transparent transition-colors">
                  Join the Network
                </button>
              </div>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-12 py-6 rounded-2xl border border-white/10 hover:bg-white/5 font-bold text-lg transition-all flex items-center gap-2"
              >
                Get API Key
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
