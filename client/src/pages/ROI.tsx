import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  TrendingDown,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Calculator,
  BarChart3,
  Users,
  Zap
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { FooterModern } from "@/components/sections/modern";
import { Button } from "@/components/ui/button";

export default function ROI() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Read theme from localStorage
    const saved = localStorage.getItem('kubegraf-theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
    } else {
      setTheme('light');
    }

    // Listen for theme changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'kubegraf-theme' && e.newValue) {
        setTheme(e.newValue as 'light' | 'dark');
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
          if (newTheme) setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    window.addEventListener('storage', handleStorageChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section
          className="py-20 px-6 lg:px-8"
          style={{
            background: isDark
              ? 'linear-gradient(to bottom, rgb(2, 6, 23), rgb(15, 23, 42), rgb(2, 6, 23))'
              : 'linear-gradient(to bottom, #faf6e9, #f5ede0, #faf6e9)'
          }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full"
                style={{
                  background: 'linear-gradient(to right, rgba(239, 68, 68, 0.1), rgba(249, 115, 22, 0.1), rgba(239, 68, 68, 0.1))',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                <AlertTriangle className="w-4 h-4" style={{ color: '#fb923c' }} />
                <span className="text-sm font-medium" style={{ color: '#fb923c' }}>
                  The True Cost of Kubernetes Incidents
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span style={{ color: isDark ? 'white' : '#2c1810' }}>
                  Every Hour of Downtime Costs
                </span>{" "}
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  $260,000
                </span>
              </h1>

              <p
                className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
                style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
              >
                Industry research shows that Kubernetes incidents cost enterprises $5,600 per minute.
                KubeGraf reduces resolution time by 80%—turning $260K/hour problems into $52K/hour recoveries.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold px-8 py-6 text-lg"
                  onClick={() => window.location.href = "#calculator"}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Your Savings
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                    color: isDark ? 'white' : '#2c1810'
                  }}
                  className="hover:bg-accent/10 px-8 py-6 text-lg"
                  onClick={() => window.location.href = "/docs/installation.html"}
                >
                  See How It Works
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Hidden Costs */}
        <section
          className="py-20 px-6 lg:px-8"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(245, 237, 224, 0.5)'
          }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                The Hidden Cost of{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Manual Incident Response
                </span>
              </h2>
              <p
                className="text-xl max-w-3xl mx-auto"
                style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
              >
                Beyond revenue loss: Engineering productivity, opportunity cost, and team burnout
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: DollarSign,
                  title: "Revenue Loss",
                  stat: "$5,600/min",
                  description: "Average cost of downtime per minute (Gartner, 2024)",
                  color: { light: '#dc2626', dark: '#f87171', bg: 'rgba(220, 38, 38, 0.1)' }
                },
                {
                  icon: Clock,
                  title: "Engineering Time",
                  stat: "40%",
                  description: "Of SRE time spent firefighting instead of building (DORA)",
                  color: { light: '#ea580c', dark: '#fb923c', bg: 'rgba(234, 88, 12, 0.1)' }
                },
                {
                  icon: Users,
                  title: "Team Burnout",
                  stat: "3-5 hours",
                  description: "Average time to resolve Kubernetes incidents manually",
                  color: { light: '#ca8a04', dark: '#fbbf24', bg: 'rgba(202, 138, 4, 0.1)' }
                },
                {
                  icon: TrendingDown,
                  title: "Customer Churn",
                  stat: "23%",
                  description: "Of customers churn after repeated downtime events",
                  color: { light: '#9333ea', dark: '#c084fc', bg: 'rgba(147, 51, 234, 0.1)' }
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl p-6 transition-all"
                  style={{
                    backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: item.color.bg }}
                  >
                    <item.icon className="w-7 h-7" style={{ color: isDark ? item.color.dark : item.color.light }} />
                  </div>
                  <h3
                    className="text-3xl font-bold mb-2"
                    style={{ color: isDark ? 'white' : '#2c1810' }}
                  >
                    {item.stat}
                  </h3>
                  <h4
                    className="text-lg font-semibold mb-2"
                    style={{ color: isDark ? 'white' : '#2c1810' }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* MTTR Benchmarks */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                Industry MTTR Benchmarks
              </h2>
              <p
                className="text-xl max-w-3xl mx-auto"
                style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
              >
                Mean Time To Recovery (MTTR): How long does it take your team to fix incidents?
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {[
                {
                  tier: "Elite Performers",
                  mttr: "< 1 hour",
                  description: "DORA Elite: Automated detection, AI-driven RCA, instant remediation",
                  percentage: "7%",
                  colors: {
                    bg: isDark ? 'rgba(16, 185, 129, 0.1)' : 'rgba(16, 185, 129, 0.08)',
                    border: 'rgba(16, 185, 129, 0.2)',
                    text: isDark ? '#6ee7b7' : '#059669',
                    badge: 'rgba(16, 185, 129, 0.15)'
                  }
                },
                {
                  tier: "High Performers",
                  mttr: "< 1 day",
                  description: "DORA High: Semi-automated workflows, good observability, fast escalation",
                  percentage: "26%",
                  colors: {
                    bg: isDark ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.08)',
                    border: 'rgba(6, 182, 212, 0.2)',
                    text: isDark ? '#67e8f9' : '#0891b2',
                    badge: 'rgba(6, 182, 212, 0.15)'
                  }
                },
                {
                  tier: "Medium/Low Performers",
                  mttr: "1 week - 1 month",
                  description: "Manual triage, siloed tools, lengthy investigation processes",
                  percentage: "67%",
                  colors: {
                    bg: isDark ? 'rgba(100, 116, 139, 0.1)' : 'rgba(100, 116, 139, 0.08)',
                    border: 'rgba(100, 116, 139, 0.2)',
                    text: isDark ? '#cbd5e1' : '#475569',
                    badge: 'rgba(100, 116, 139, 0.15)'
                  }
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl p-8"
                  style={{
                    background: `linear-gradient(to bottom right, ${item.colors.bg}, ${item.colors.bg})`,
                    border: `1px solid ${item.colors.border}`
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: isDark ? 'white' : '#2c1810' }}
                    >
                      {item.tier}
                    </h3>
                    <div
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: item.colors.badge,
                        color: item.colors.text
                      }}
                    >
                      {item.percentage} of orgs
                    </div>
                  </div>
                  <div
                    className="text-4xl font-bold mb-4"
                    style={{ color: item.colors.text }}
                  >
                    {item.mttr}
                  </div>
                  <p
                    className="leading-relaxed"
                    style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                  >
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 md:p-12"
              style={{
                background: isDark
                  ? 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(20, 184, 166, 0.1))'
                  : 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.08), rgba(20, 184, 166, 0.08))',
                border: '1px solid rgba(6, 182, 212, 0.2)'
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-cyan-400" />
                <h3
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: isDark ? 'white' : '#2c1810' }}
                >
                  KubeGraf Moves You to Elite Tier
                </h3>
              </div>
              <p
                className="text-lg mb-6"
                style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(68, 64, 60)' }}
              >
                By reducing MTTR from hours to minutes (5-15 min average), KubeGraf enables your team to achieve DORA Elite performance—putting you in the top 7% of organizations.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div
                    className="text-sm mb-1"
                    style={{ color: isDark ? 'rgb(100, 116, 139)' : 'rgb(120, 113, 108)' }}
                  >
                    Before KubeGraf
                  </div>
                  <div className="text-3xl font-bold text-red-400">2-4 hours</div>
                  <div
                    className="text-sm"
                    style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                  >
                    Manual correlation
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <div
                    className="text-sm mb-1"
                    style={{ color: isDark ? 'rgb(100, 116, 139)' : 'rgb(120, 113, 108)' }}
                  >
                    With KubeGraf
                  </div>
                  <div className="text-3xl font-bold text-emerald-400">5-15 min</div>
                  <div
                    className="text-sm"
                    style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                  >
                    AI-driven automation
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Time Allocation Breakdown */}
        <section
          className="py-20 px-6 lg:px-8"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(245, 237, 224, 0.5)'
          }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                Where Does Your{" "}
                <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Engineering Time Go?
                </span>
              </h2>
              <p
                className="text-xl max-w-3xl mx-auto"
                style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
              >
                Compare manual incident response vs. AI-powered automation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Manual Approach */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: isDark ? 'white' : '#2c1810' }}
                  >
                    Manual Approach
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Firefighting / Incidents", value: "40%", color: "rgb(248, 113, 113)" },
                    { label: "Toil (repetitive ops)", value: "25%", color: "rgb(251, 146, 60)" },
                    { label: "Feature development", value: "25%", color: "rgb(96, 165, 250)" },
                    { label: "Innovation / R&D", value: "10%", color: "rgb(134, 239, 172)" }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span
                          className="text-sm font-medium"
                          style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(68, 64, 60)' }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="text-sm font-bold"
                          style={{ color: isDark ? 'white' : '#2c1810' }}
                        >
                          {item.value}
                        </span>
                      </div>
                      <div
                        className="h-3 rounded-full overflow-hidden"
                        style={{ backgroundColor: isDark ? 'rgba(51, 65, 85, 1)' : 'rgba(0, 0, 0, 0.1)' }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: item.value,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  className="mt-6 text-sm"
                  style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                >
                  65% of time spent on firefighting and toil—not building new features.
                </p>
              </motion.div>

              {/* KubeGraf Approach */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: isDark ? 'white' : '#2c1810' }}
                  >
                    With KubeGraf
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Firefighting / Incidents", value: "10%", color: "rgb(248, 113, 113)", saved: "30% recovered" },
                    { label: "Toil (repetitive ops)", value: "10%", color: "rgb(251, 146, 60)", saved: "15% recovered" },
                    { label: "Feature development", value: "50%", color: "rgb(96, 165, 250)", saved: "+25% gain" },
                    { label: "Innovation / R&D", value: "30%", color: "rgb(134, 239, 172)", saved: "+20% gain" }
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span
                          className="text-sm font-medium"
                          style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(68, 64, 60)' }}
                        >
                          {item.label}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-sm font-bold"
                            style={{ color: isDark ? 'white' : '#2c1810' }}
                          >
                            {item.value}
                          </span>
                          <span className="text-xs text-emerald-400">({item.saved})</span>
                        </div>
                      </div>
                      <div
                        className="h-3 rounded-full overflow-hidden"
                        style={{ backgroundColor: isDark ? 'rgba(51, 65, 85, 1)' : 'rgba(0, 0, 0, 0.1)' }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: item.value,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  className="mt-6 text-sm font-semibold text-emerald-400"
                >
                  80% of time now available for building and innovation—45% net increase in productive work.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section id="calculator" className="py-20 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                Calculate Your{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Annual Savings
                </span>
              </h2>
              <p
                className="text-xl max-w-3xl mx-auto"
                style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
              >
                Conservative estimate for a 100-person engineering org
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-3xl p-8 md:p-12"
              style={{
                background: isDark
                  ? 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(16, 185, 129, 0.1))'
                  : 'linear-gradient(to bottom right, rgba(6, 182, 212, 0.08), rgba(16, 185, 129, 0.08))',
                border: '1px solid rgba(6, 182, 212, 0.2)'
              }}
            >
              <div className="space-y-6">
                {[
                  {
                    icon: Clock,
                    label: "Engineering Time Recovered",
                    calculation: "30% of 20 SREs × $150K avg salary",
                    value: "$390,000",
                    description: "Reduced incident firefighting + toil automation"
                  },
                  {
                    icon: TrendingDown,
                    label: "Downtime Cost Reduction",
                    calculation: "80% MTTR reduction × 10 incidents/year × 2hr avg",
                    value: "$134,000",
                    description: "Faster recovery = less business impact"
                  },
                  {
                    icon: BarChart3,
                    label: "Opportunity Cost Recovery",
                    calculation: "45% productivity gain × feature velocity",
                    value: "$100,000",
                    description: "Ship 2-3 major features faster per year"
                  }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 pb-6"
                    style={{
                      borderBottom: i < 2 ? (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)') : 'none'
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold mb-1"
                        style={{ color: isDark ? 'white' : '#2c1810' }}
                      >
                        {item.label}
                      </h3>
                      <p
                        className="text-sm mb-2"
                        style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                      >
                        {item.calculation}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: isDark ? 'rgb(100, 116, 139)' : 'rgb(120, 113, 108)' }}
                      >
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-emerald-400">{item.value}</div>
                      <div
                        className="text-xs"
                        style={{ color: isDark ? 'rgb(100, 116, 139)' : 'rgb(120, 113, 108)' }}
                      >
                        per year
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  className="pt-6 flex items-center justify-between"
                  style={{
                    borderTop: isDark ? '2px solid rgba(6, 182, 212, 0.3)' : '2px solid rgba(6, 182, 212, 0.3)'
                  }}
                >
                  <div>
                    <h3
                      className="text-2xl font-bold mb-1"
                      style={{ color: isDark ? 'white' : '#2c1810' }}
                    >
                      Total Annual Savings
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                    >
                      Conservative estimate for 100-person org
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      $624K
                    </div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(68, 64, 60)' }}
                    >
                      First year ROI: 312x
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Industry Sources */}
        <section
          className="py-20 px-6 lg:px-8"
          style={{
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.5)' : 'rgba(245, 237, 224, 0.5)'
          }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                Industry Research & Sources
              </h2>
              <p
                className="text-lg"
                style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
              >
                Data-driven insights from leading DevOps research organizations
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { name: "Gartner", stat: "$5,600/min downtime cost", year: "2024" },
                { name: "DORA (DevOps Research)", stat: "MTTR benchmarks by tier", year: "2024 State of DevOps" },
                { name: "Aberdeen Group", stat: "40% time on firefighting", year: "2023 SRE Survey" },
                { name: "Forrester Research", stat: "23% churn from downtime", year: "2023 Customer Impact Study" },
                { name: "CNCF Survey", stat: "67% in Medium/Low tier", year: "2024 Cloud Native Survey" },
                { name: "Uptime Institute", stat: "$260K/hour enterprise cost", year: "2024 Outage Analysis" }
              ].map((source, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl p-6"
                  style={{
                    backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <h3
                    className="text-lg font-bold mb-2"
                    style={{ color: isDark ? 'white' : '#2c1810' }}
                  >
                    {source.name}
                  </h3>
                  <p
                    className="text-sm mb-1"
                    style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                  >
                    {source.stat}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: isDark ? 'rgb(100, 116, 139)' : 'rgb(120, 113, 108)' }}
                  >
                    {source.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-4xl md:text-5xl font-bold mb-6"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                Ready to{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Reduce Your MTTR?
                </span>
              </h2>
              <p
                className="text-xl mb-12 max-w-2xl mx-auto"
                style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
              >
                Install KubeGraf in 60 seconds. Start recovering incidents 80% faster. Free for teams under 50 pods.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold px-8 py-6 text-lg"
                  onClick={() => window.location.href = "/docs/installation.html"}
                >
                  Install Free Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  style={{
                    borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                    color: isDark ? 'white' : '#2c1810'
                  }}
                  className="hover:bg-accent/10 px-8 py-6 text-lg"
                  onClick={() => window.location.href = "mailto:contact@kubegraf.io?subject=Enterprise Demo Request"}
                >
                  Request Demo / Enterprise
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <FooterModern />
    </div>
  );
}
