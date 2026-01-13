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
  Zap,
  ExternalLink
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
      <Navbar disableScrollEffects />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="text-5xl md:text-6xl font-bold mb-6"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                KubeGraf ROI —{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(to right, rgb(110, 231, 183), rgb(94, 234, 212))'
                      : 'linear-gradient(to right, rgb(5, 150, 105), rgb(13, 148, 136))'
                  }}
                >
                  Turn Kubernetes Incidents Into Savings
                </span>
              </h1>

              <p
                className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto"
                style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
              >
                Every hour of downtime costs ~$2M. KubeGraf reduces incident resolution by 80%, turning costly outages into fast recoveries.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="font-semibold px-8 py-6 text-lg"
                  style={{
                    background: isDark
                      ? 'linear-gradient(to right, rgb(6, 182, 212), rgb(20, 184, 166))'
                      : 'linear-gradient(to right, rgb(8, 145, 178), rgb(13, 148, 136))',
                    color: 'white'
                  }}
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
                  onClick={() => window.location.href = "mailto:contact@kubegraf.io?subject=Enterprise Demo Request"}
                >
                  Request Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Cost of Doing Nothing */}
        <section
          className="py-16 px-6 lg:px-8"
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
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-8 text-center"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                The Cost of{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(to right, rgb(248, 113, 113), rgb(251, 146, 60))'
                      : 'linear-gradient(to right, rgb(220, 38, 38), rgb(234, 88, 12))'
                  }}
                >
                  Doing Nothing
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: DollarSign,
                    text: "$2M per hour — Average cost of high-impact outages (~$33,333/min)",
                    source: "New Relic 2025 Observability Forecast (1,700+ IT leaders surveyed)",
                    url: "https://newrelic.com/resources/report/observability-forecast/2025"
                  },
                  {
                    icon: Clock,
                    text: "33% of engineering time spent firefighting instead of building",
                    source: "New Relic 2025 Observability Forecast",
                    url: "https://newrelic.com/resources/report/observability-forecast/2025"
                  },
                  {
                    icon: AlertTriangle,
                    text: "28 min detection, ~40 min resolution — with full observability",
                    source: "New Relic 2025 Observability data",
                    url: "https://newrelic.com/resources/report/observability-forecast/2025"
                  },
                  {
                    icon: TrendingDown,
                    text: "29% of organizations lost customers due to IT downtime",
                    source: "IT Downtime Cost Trends, 2026",
                    url: "https://www.atlassian.com/incident-management/kpis/cost-of-downtime"
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-6 rounded-xl"
                    style={{
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p
                        className="text-base font-semibold mb-2"
                        style={{ color: isDark ? 'white' : '#2c1810' }}
                      >
                        {item.text}
                      </p>
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs flex items-center gap-1 hover:underline"
                          style={{ color: isDark ? 'rgb(103, 232, 249)' : 'rgb(8, 145, 178)' }}
                        >
                          {item.source}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <p
                          className="text-xs"
                          style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                        >
                          {item.source}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* MTTR Benchmarks Table */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 text-center"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                Industry{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(to right, rgb(110, 231, 183), rgb(94, 234, 212))'
                      : 'linear-gradient(to right, rgb(5, 150, 105), rgb(13, 148, 136))'
                  }}
                >
                  MTTR Benchmarks
                </span>
              </h2>
              <a
                href="https://dora.dev/research/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm flex items-center justify-center gap-1 mb-8 hover:underline"
                style={{ color: isDark ? 'rgb(103, 232, 249)' : 'rgb(8, 145, 178)' }}
              >
                Source: DORA 2024 State of DevOps Report (36,000+ responses)
                <ExternalLink className="w-3 h-3" />
              </a>

              <div
                className="overflow-x-auto rounded-xl"
                style={{
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                }}
              >
                <table className="w-full">
                  <thead>
                    <tr
                      style={{
                        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <th
                        className="text-left py-4 px-6 font-bold"
                        style={{ color: isDark ? 'white' : '#2c1810' }}
                      >
                        Tier
                      </th>
                      <th
                        className="text-left py-4 px-6 font-bold"
                        style={{ color: isDark ? 'white' : '#2c1810' }}
                      >
                        MTTR
                      </th>
                      <th
                        className="text-left py-4 px-6 font-bold"
                        style={{ color: isDark ? 'white' : '#2c1810' }}
                      >
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{
                        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <td className="py-4 px-6">
                        <div
                          className="font-semibold"
                          style={{ color: isDark ? 'rgb(110, 231, 183)' : 'rgb(5, 150, 105)' }}
                        >
                          Elite
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                        >
                          7% of orgs
                        </div>
                      </td>
                      <td
                        className="py-4 px-6 font-bold text-lg"
                        style={{ color: isDark ? 'white' : '#2c1810' }}
                      >
                        &lt; 1 hr
                      </td>
                      <td
                        className="py-4 px-6"
                        style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(68, 64, 60)' }}
                      >
                        Automated detection + AI root cause analysis
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)'
                      }}
                    >
                      <td className="py-4 px-6">
                        <div
                          className="font-semibold"
                          style={{ color: isDark ? 'rgb(103, 232, 249)' : 'rgb(8, 145, 178)' }}
                        >
                          High
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                        >
                          26% of orgs
                        </div>
                      </td>
                      <td
                        className="py-4 px-6 font-bold text-lg"
                        style={{ color: isDark ? 'white' : '#2c1810' }}
                      >
                        &lt; 1 day
                      </td>
                      <td
                        className="py-4 px-6"
                        style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(68, 64, 60)' }}
                      >
                        Semi-automated workflows, fast escalation
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6">
                        <div
                          className="font-semibold"
                          style={{ color: isDark ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)' }}
                        >
                          Medium/Low
                        </div>
                        <div
                          className="text-xs"
                          style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                        >
                          67% of orgs
                        </div>
                      </td>
                      <td
                        className="py-4 px-6 font-bold text-lg"
                        style={{ color: isDark ? 'white' : '#2c1810' }}
                      >
                        1 wk – 1 mo
                      </td>
                      <td
                        className="py-4 px-6"
                        style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(68, 64, 60)' }}
                      >
                        Manual triage, siloed tools
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div
                className="mt-8 p-6 rounded-xl text-center"
                style={{
                  background: isDark
                    ? 'linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))'
                    : 'linear-gradient(to bottom right, rgba(16, 185, 129, 0.08), rgba(20, 184, 166, 0.08))',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}
              >
                <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                <p
                  className="text-lg font-bold"
                  style={{ color: isDark ? 'white' : '#2c1810' }}
                >
                  KubeGraf moves teams to Elite tier: average MTTR 5–15 minutes
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Before vs After Table */}
        <section
          className="py-16 px-6 lg:px-8"
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
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 text-center"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                Engineering Productivity —{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(to right, rgb(110, 231, 183), rgb(94, 234, 212))'
                      : 'linear-gradient(to right, rgb(5, 150, 105), rgb(13, 148, 136))'
                  }}
                >
                  Before vs After
                </span>
              </h2>
              <p
                className="text-center mb-8"
                style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
              >
                How engineering teams allocate their time
              </p>

              <div
                className="overflow-x-auto rounded-xl mb-8"
                style={{
                  backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                }}
              >
                <table className="w-full">
                  <thead>
                    <tr
                      style={{
                        borderBottom: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <th
                        className="text-left py-4 px-6 font-bold"
                        style={{ color: isDark ? 'white' : '#2c1810' }}
                      >
                        Activity
                      </th>
                      <th
                        className="text-center py-4 px-6 font-bold"
                        style={{ color: isDark ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)' }}
                      >
                        Manual
                      </th>
                      <th
                        className="text-center py-4 px-6 font-bold"
                        style={{ color: isDark ? 'rgb(110, 231, 183)' : 'rgb(5, 150, 105)' }}
                      >
                        With KubeGraf
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { activity: "Firefighting", manual: "33%", kubegraf: "8%", change: "−25%" },
                      { activity: "Repetitive Ops", manual: "25%", kubegraf: "10%", change: "−15%" },
                      { activity: "Feature Development", manual: "30%", kubegraf: "52%", change: "+22%" },
                      { activity: "Innovation / R&D", manual: "12%", kubegraf: "30%", change: "+18%" }
                    ].map((row, i) => (
                      <tr
                        key={i}
                        style={{
                          borderBottom: i < 3 ? (isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)') : 'none'
                        }}
                      >
                        <td
                          className="py-4 px-6 font-semibold"
                          style={{ color: isDark ? 'white' : '#2c1810' }}
                        >
                          {row.activity}
                        </td>
                        <td
                          className="py-4 px-6 text-center font-bold text-lg"
                          style={{ color: isDark ? 'rgb(248, 113, 113)' : 'rgb(220, 38, 38)' }}
                        >
                          {row.manual}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div
                            className="font-bold text-lg"
                            style={{ color: isDark ? 'rgb(110, 231, 183)' : 'rgb(5, 150, 105)' }}
                          >
                            {row.kubegraf}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                          >
                            ({row.change})
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className="p-6 rounded-xl text-center"
                style={{
                  background: isDark
                    ? 'linear-gradient(to right, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))'
                    : 'linear-gradient(to right, rgba(16, 185, 129, 0.08), rgba(20, 184, 166, 0.08))',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}
              >
                <p
                  className="text-lg font-bold"
                  style={{ color: isDark ? 'white' : '#2c1810' }}
                >
                  Result: 40% net increase in productive engineering work
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section id="calculator" className="py-16 px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 text-center"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                Example:{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(to right, rgb(110, 231, 183), rgb(94, 234, 212))'
                      : 'linear-gradient(to right, rgb(5, 150, 105), rgb(13, 148, 136))'
                  }}
                >
                  100-Person Engineering Team
                </span>
              </h2>
              <p
                className="text-center mb-8"
                style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
              >
                Conservative annual impact estimate
              </p>

              <div
                className="rounded-2xl p-8"
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
                      label: "Engineering Time Recovered",
                      value: "$390,000",
                      detail: "30% of 20 SREs × $150K avg salary"
                    },
                    {
                      label: "Reduced Downtime Cost",
                      value: "$134,000",
                      detail: "80% MTTR reduction × 10 incidents/year"
                    },
                    {
                      label: "Opportunity Cost Recovery",
                      value: "$100,000",
                      detail: "40% productivity gain × feature velocity"
                    }
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between pb-6"
                      style={{
                        borderBottom: i < 2 ? (isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)') : 'none'
                      }}
                    >
                      <div className="flex-1">
                        <div
                          className="text-lg font-bold mb-1"
                          style={{ color: isDark ? 'white' : '#2c1810' }}
                        >
                          {item.label}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                        >
                          {item.detail}
                        </div>
                      </div>
                      <div
                        className="text-3xl font-bold"
                        style={{ color: isDark ? 'rgb(110, 231, 183)' : 'rgb(5, 150, 105)' }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}

                  <div
                    className="pt-6 flex items-center justify-between"
                    style={{
                      borderTop: isDark ? '2px solid rgba(6, 182, 212, 0.3)' : '2px solid rgba(6, 182, 212, 0.3)'
                    }}
                  >
                    <div className="flex-1">
                      <div
                        className="text-2xl font-bold mb-1"
                        style={{ color: isDark ? 'white' : '#2c1810' }}
                      >
                        Total Annual Savings
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                      >
                        First-year ROI: ~3× conservative estimate
                      </div>
                    </div>
                    <div
                      className="text-5xl font-bold"
                      style={{ color: isDark ? 'rgb(110, 231, 183)' : 'rgb(5, 150, 105)' }}
                    >
                      $624K
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Investors Should Care */}
        <section
          className="py-16 px-6 lg:px-8"
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
            >
              <h2
                className="text-3xl md:text-4xl font-bold mb-12 text-center"
                style={{ color: isDark ? 'white' : '#2c1810' }}
              >
                Why{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(to right, rgb(110, 231, 183), rgb(94, 234, 212))'
                      : 'linear-gradient(to right, rgb(5, 150, 105), rgb(13, 148, 136))'
                  }}
                >
                  Investors Should Care
                </span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: DollarSign,
                    title: "High-cost problem",
                    description: "$2M/hour downtime cost drives urgent need for AI-powered incident resolution",
                    color: { light: '#dc2626', dark: '#f87171' }
                  },
                  {
                    icon: BarChart3,
                    title: "Large market",
                    description: "7M+ developers, 96% of Fortune 100 using Kubernetes—massive TAM with strong adoption",
                    color: { light: '#059669', dark: '#6ee7b7' }
                  },
                  {
                    icon: TrendingDown,
                    title: "Strong ROI and measurable gains",
                    description: "$624K annual savings for mid-sized teams. Clear productivity metrics VCs can validate",
                    color: { light: '#059669', dark: '#10b981' }
                  },
                  {
                    icon: Zap,
                    title: "AI-driven competitive moat",
                    description: "Moves teams to elite performance (<1hr MTTR). Defensible with evidence-based diagnostics",
                    color: { light: '#0d9488', dark: '#5eead4' }
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 rounded-xl"
                    style={{
                      backgroundColor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.6)',
                      border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${item.color.light}15` }}
                    >
                      <item.icon className="w-6 h-6" style={{ color: isDark ? item.color.dark : item.color.light }} />
                    </div>
                    <h3
                      className="text-xl font-bold mb-2"
                      style={{ color: isDark ? 'white' : '#2c1810' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-base"
                      style={{ color: isDark ? 'rgb(203, 213, 225)' : 'rgb(68, 64, 60)' }}
                    >
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Market Stats */}
              <div
                className="mt-12 p-8 rounded-2xl"
                style={{
                  background: isDark
                    ? 'linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))'
                    : 'linear-gradient(to bottom right, rgba(16, 185, 129, 0.08), rgba(20, 184, 166, 0.08))',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}
              >
                <h3
                  className="text-2xl font-bold mb-6 text-center"
                  style={{ color: isDark ? 'white' : '#2c1810' }}
                >
                  The Kubernetes Ecosystem: By the Numbers
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div
                      className="text-5xl font-bold mb-2"
                      style={{ color: isDark ? 'rgb(110, 231, 183)' : 'rgb(5, 150, 105)' }}
                    >
                      96%
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                    >
                      Fortune 100 companies use Kubernetes
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-5xl font-bold mb-2"
                      style={{ color: isDark ? 'rgb(110, 231, 183)' : 'rgb(5, 150, 105)' }}
                    >
                      7M+
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                    >
                      Developers using Kubernetes globally
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="text-5xl font-bold mb-2"
                      style={{ color: isDark ? 'rgb(110, 231, 183)' : 'rgb(5, 150, 105)' }}
                    >
                      $7.3B+
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: isDark ? 'rgb(148, 163, 184)' : 'rgb(87, 83, 78)' }}
                    >
                      CNCF ecosystem contributions (2024)
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.cncf.io/reports/cncf-annual-survey-2024/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm flex items-center justify-center gap-1 mt-6 hover:underline"
                  style={{ color: isDark ? 'rgb(103, 232, 249)' : 'rgb(8, 145, 178)' }}
                >
                  Source: CNCF Annual Survey 2024
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
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
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(to right, rgb(103, 232, 249), rgb(94, 234, 212))'
                      : 'linear-gradient(to right, rgb(8, 145, 178), rgb(13, 148, 136))'
                  }}
                >
                  Reduce MTTR?
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
                  className="font-semibold px-8 py-6 text-lg"
                  style={{
                    background: isDark
                      ? 'linear-gradient(to right, rgb(6, 182, 212), rgb(20, 184, 166))'
                      : 'linear-gradient(to right, rgb(8, 145, 178), rgb(13, 148, 136))',
                    color: 'white'
                  }}
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
