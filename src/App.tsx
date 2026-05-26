import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Globe, 
  Bot, 
  Settings, 
  Share2, 
  Headphones, 
  Send, 
  Camera as Instagram, 
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail
} from 'lucide-react';
import { translations, Language } from './lib/translations';

export default function App() {
  const [lang, setLang] = useState<Language>('uz');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const navLinks = [
    { name: t.hero.btn1, href: '#services' },
    { name: t.hero.btn2, href: '#about' },
  ];

  const handleTelegramClick = () => {
    window.open('https://t.me/VepAi_bot', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/sirojiddin_o782', '_blank');
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <div className="min-h-screen font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="font-display text-2xl tracking-tighter hover:opacity-80 transition-opacity">
              VepAi
            </a>
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={handleSmoothScroll}
                  className="text-sm font-medium hover:opacity-60 transition-opacity cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-foreground/5 rounded-full p-1">
              {(['uz', 'ru', 'en'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 text-xs font-bold rounded-full uppercase transition-all ${
                    lang === l ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:opacity-60'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            
            <button 
              onClick={handleTelegramClick}
              className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              {t.nav.contact}
            </button>

            <button 
              className="md:hidden p-2 hover:bg-foreground/5 rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={handleSmoothScroll}
                  className="text-3xl font-display tracking-tight cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <button 
                onClick={handleTelegramClick}
                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full text-xl font-bold"
              >
                {t.nav.contact}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col md:flex-row pt-24 md:pt-0 overflow-hidden">
          {/* Left side: Sand background */}
          <div className="flex-1 bg-background flex items-center px-6 md:px-12 py-12">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl"
            >
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-8">
                {t.hero.title}
              </h1>
              <p className="text-lg md:text-xl font-light opacity-80 mb-10 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#services"
                  onClick={handleSmoothScroll}
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
                >
                  {t.hero.btn1}
                </a>
                <a 
                  href="#about"
                  onClick={handleSmoothScroll}
                  className="border-2 border-primary text-primary px-8 py-4 rounded-full font-bold hover:bg-primary/5 transition-all cursor-pointer"
                >
                  {t.hero.btn2}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right side: Cyprus background with floating cards */}
          <div className="flex-1 bg-foreground relative min-h-[400px] md:min-h-screen flex items-center justify-center px-6">
            <div className="grid gap-6 w-full max-w-md relative z-10">
              {[
                { icon: <Bot size={24} />, title: t.services.tgBot.title, color: "bg-[#F0EDE5]" },
                { icon: <Globe size={24} />, title: t.services.web.title, color: "bg-[#F0EDE5]" },
                { icon: <MessageSquare size={24} />, title: t.services.aiChat.title, color: "bg-[#F0EDE5]" }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5, x: -5 }}
                  className={`${card.color} text-foreground p-6 rounded-2xl shadow-2xl flex items-center gap-6 group cursor-default`}
                >
                  <div className="w-14 h-14 bg-foreground/10 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                    {card.icon}
                  </div>
                  <h3 className="font-display text-xl">{card.title}</h3>
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={20} />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 md:py-32 bg-background">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-20">
              <h2 className="font-display text-4xl md:text-6xl mb-6">{t.services.title}</h2>
              <div className="w-24 h-1 bg-primary mx-auto" />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Send size={32} />, ...t.services.tgBot },
                { icon: <Globe size={32} />, ...t.services.web },
                { icon: <Bot size={32} />, ...t.services.aiChat },
                { icon: <Settings size={32} />, ...t.services.crm },
                { icon: <Share2 size={32} />, ...t.services.api },
                { icon: <Headphones size={32} />, ...t.services.support },
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-foreground/5 p-8 rounded-3xl border border-transparent hover:border-primary/20 transition-all group"
                >
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 group-hover:rotate-3">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-2xl mb-4">{service.title}</h3>
                  <p className="opacity-70 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* About & Stats Section */}
        <section id="about" className="py-24 md:py-32 bg-foreground text-primary-foreground overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-20">
              <motion.div {...fadeUp} className="flex-1">
                <span className="text-primary font-bold uppercase tracking-widest text-sm mb-6 block">
                  {t.about.contact}
                </span>
                <h2 className="font-display text-5xl md:text-7xl mb-10 leading-tight">
                  {t.about.name}
                </h2>
                <p className="text-xl md:text-2xl font-light opacity-80 mb-12 leading-relaxed max-w-xl">
                  {t.about.bio}
                </p>
                <div className="flex gap-6 flex-wrap">
                  <button 
                    onClick={handleTelegramClick}
                    className="p-4 bg-primary text-primary-foreground rounded-2xl hover:scale-110 transition-transform shadow-xl"
                    title="Telegram"
                    aria-label="Contact on Telegram"
                  >
                    <Send size={24} />
                  </button>
                  <button 
                    onClick={handleInstagramClick}
                    className="p-4 bg-primary text-primary-foreground rounded-2xl hover:scale-110 transition-transform shadow-xl"
                    title="Instagram"
                    aria-label="Follow on Instagram"
                  >
                    <Instagram size={24} />
                  </button>
                </div>
              </motion.div>

              <div className="flex-1 grid grid-cols-2 gap-6">
                {[
                  { value: t.about.stats.projects, label: "Success" },
                  { value: t.about.stats.support, label: "Available" },
                  { value: t.about.stats.lang, label: "Languages" },
                  { value: t.about.stats.ai, label: "Core" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-primary-foreground/5 p-8 rounded-3xl border border-primary-foreground/10 flex flex-col justify-between aspect-square"
                  >
                    <div className="w-12 h-1 bg-primary" />
                    <div>
                      <h4 className="font-display text-xl md:text-2xl mb-2">{stat.value}</h4>
                      <p className="text-xs uppercase tracking-widest opacity-40 font-bold">{stat.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-foreground relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div 
              {...fadeUp}
              className="bg-primary p-12 md:p-24 rounded-[4rem] text-center text-primary-foreground shadow-2xl"
            >
              <h2 className="font-display text-4xl md:text-7xl mb-12 tracking-tight">
                {t.cta.title}
              </h2>
              <button 
                onClick={handleTelegramClick}
                className="inline-flex items-center gap-3 bg-primary-foreground text-primary px-10 py-5 rounded-full text-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                <Send size={24} />
                {t.cta.button}
              </button>
            </motion.div>
          </div>
          <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground" />
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-background" />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <a href="/" className="font-display text-2xl tracking-tighter">
            VepAi
          </a>
          <p className="text-sm opacity-60">
            © {new Date().getFullYear()} {t.about.name}. {t.footer.copyright}
          </p>
          <div className="flex gap-6">
            <button 
              onClick={handleTelegramClick}
              className="hover:text-primary transition-colors"
              aria-label="Telegram"
            >
              <Send size={20} />
            </button>
            <button 
              onClick={handleInstagramClick}
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}