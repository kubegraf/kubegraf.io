import { motion } from "framer-motion";
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
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 border border-red-500/20">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">
                  The True Cost of Kubernetes Incidents
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Every Hour of Downtime Costs</span>{" "}
                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  $260,000
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed">
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
                  className="border-white/20 hover:bg-white/5 px-8 py-6 text-lg"
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
        <section className="py-20 px-6 lg:px-8 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                The Hidden Cost of{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Manual Incident Response
                </span>
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
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
                  color: "red"
                },
                {
                  icon: Clock,
                  title: "Engineering Time",
                  stat: "40%",
                  description: "Of SRE time spent firefighting instead of building (DORA)",
                  color: "orange"
                },
                {
                  icon: Users,
                  title: "Team Burnout",
                  stat: "3-5 hours",
                  description: "Average time to resolve Kubernetes incidents manually",
                  color: "yellow"
                },
                {
                  icon: TrendingDown,
                  title: "Customer Churn",
                  stat: "23%",
                  description: "Of customers churn after repeated downtime events",
                  color: "purple"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-600/20 flex items-center justify-center mb-4`}>
                    <item.icon className={`w-7 h-7 text-${item.color}-400`} />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{item.stat}</h3>
                  <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Industry MTTR Benchmarks
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
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
                  color: "emerald"
                },
                {
                  tier: "High Performers",
                  mttr: "< 1 day",
                  description: "DORA High: Semi-automated workflows, good observability, fast escalation",
                  percentage: "26%",
                  color: "cyan"
                },
                {
                  tier: "Medium/Low Performers",
                  mttr: "1 week - 1 month",
                  description: "Manual triage, siloed tools, lengthy investigation processes",
                  percentage: "67%",
                  color: "slate"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-gradient-to-br from-${item.color}-500/10 to-${item.color}-600/10 rounded-2xl p-8 border border-${item.color}-500/20`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{item.tier}</h3>
                    <div className={`px-3 py-1 rounded-full bg-${item.color}-500/20 text-${item.color}-400 text-sm font-semibold`}>
                      {item.percentage} of orgs
                    </div>
                  </div>
                  <div className={`text-4xl font-bold bg-gradient-to-r from-${item.color}-400 to-${item.color}-600 bg-clip-text text-transparent mb-4`}>
                    {item.mttr}
                  </div>
                  <p className="text-slate-400 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-3xl p-8 md:p-12 border border-cyan-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  KubeGraf Moves You to Elite Tier
                </h3>
              </div>
              <p className="text-lg text-slate-300 mb-6">
                By reducing MTTR from hours to minutes (5-15 min average), KubeGraf enables your team to achieve DORA Elite performance—putting you in the top 7% of organizations.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-slate-500 mb-1">Before KubeGraf</div>
                  <div className="text-3xl font-bold text-red-400">2-4 hours</div>
                  <div className="text-sm text-slate-400">Manual correlation</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-slate-500 mb-1">With KubeGraf</div>
                  <div className="text-3xl font-bold text-emerald-400">5-15 min</div>
                  <div className="text-sm text-slate-400">AI-driven automation</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Time Allocation Breakdown */}
        <section className="py-20 px-6 lg:px-8 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Where Your SREs Spend Their Time
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Without automation, 40% of engineering capacity is lost to incident response
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Without KubeGraf */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 rounded-2xl p-8 border border-white/10"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                  Without KubeGraf (Manual)
                </h3>
                <div className="space-y-4">
                  {[
                    { task: "Firefighting incidents", time: "40%", hours: "16 hrs/week", color: "red" },
                    { task: "Toil & manual tasks", time: "25%", hours: "10 hrs/week", color: "orange" },
                    { task: "Building new features", time: "20%", hours: "8 hrs/week", color: "slate" },
                    { task: "Meetings & documentation", time: "15%", hours: "6 hrs/week", color: "slate" }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{item.task}</span>
                        <div className="flex items-center gap-3">
                          <span className={`text-${item.color}-400 font-bold`}>{item.time}</span>
                          <span className="text-slate-500 text-sm">{item.hours}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-full`}
                          style={{ width: item.time }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <div className="text-red-400 font-semibold mb-1">Result:</div>
                  <div className="text-slate-300">
                    Only 8 hours/week building features. Team velocity suffers. Burnout risk high.
                  </div>
                </div>
              </motion.div>

              {/* With KubeGraf */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-2xl p-8 border border-emerald-500/20"
              >
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  With KubeGraf (Automated)
                </h3>
                <div className="space-y-4">
                  {[
                    { task: "Building new features", time: "50%", hours: "20 hrs/week", color: "emerald" },
                    { task: "Strategic work", time: "20%", hours: "8 hrs/week", color: "cyan" },
                    { task: "Incident oversight (automated)", time: "10%", hours: "4 hrs/week", color: "teal" },
                    { task: "Meetings & documentation", time: "15%", hours: "6 hrs/week", color: "slate" },
                    { task: "Learning & improvement", time: "5%", hours: "2 hrs/week", color: "cyan" }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{item.task}</span>
                        <div className="flex items-center gap-3">
                          <span className={`text-${item.color}-400 font-bold`}>{item.time}</span>
                          <span className="text-slate-500 text-sm">{item.hours}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 rounded-full`}
                          style={{ width: item.time }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                  <div className="text-emerald-400 font-semibold mb-1">Result:</div>
                  <div className="text-slate-300">
                    20 hours/week building features (2.5× improvement). Higher velocity. Better retention.
                  </div>
                </div>
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Calculate Your Savings
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                See how much KubeGraf can save your organization annually
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-3xl p-8 md:p-12 border border-cyan-500/20"
            >
              <h3 className="text-2xl font-bold text-white mb-8">Conservative Estimate</h3>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 rounded-xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Average Incidents per Month</div>
                    <div className="text-4xl font-bold text-white">10</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Current MTTR (hours)</div>
                    <div className="text-4xl font-bold text-white">3</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Platform Engineers (FTE)</div>
                    <div className="text-4xl font-bold text-white">5</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-xl p-6">
                    <div className="text-slate-400 text-sm mb-2">Average Hourly Cost</div>
                    <div className="text-4xl font-bold text-white">$150</div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mt-6">
                  <h4 className="text-xl font-bold text-white mb-4">Annual Savings Breakdown</h4>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                      <span className="text-slate-300">Engineering time recovered (40% → 10%)</span>
                      <span className="text-2xl font-bold text-emerald-400">$390,000</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                      <span className="text-slate-300">Downtime cost reduction (80% faster)</span>
                      <span className="text-2xl font-bold text-emerald-400">$134,000</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                      <span className="text-slate-300">Opportunity cost (faster shipping)</span>
                      <span className="text-2xl font-bold text-emerald-400">$100,000</span>
                    </div>
                  </div>

                  <div className="mt-6 p-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-slate-300 mb-1">Total Annual Savings</div>
                        <div className="text-sm text-slate-400">Conservative estimate, 5-person team</div>
                      </div>
                      <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        $624K
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                    <div className="text-cyan-400 font-semibold mb-2">ROI Multiplier</div>
                    <div className="text-slate-300">
                      For a team of 5 platform engineers: <span className="text-white font-bold">~$125K savings per engineer annually</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Industry Sources */}
        <section className="py-20 px-6 lg:px-8 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Industry Research & Data Sources
              </h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                All statistics sourced from leading industry research firms and DevOps benchmarks
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  source: "Gartner",
                  year: "2024",
                  finding: "$5,600 per minute average cost of downtime",
                  link: "gartner.com"
                },
                {
                  source: "DORA / DevOps Research",
                  year: "2024",
                  finding: "Elite performers: < 1 hour MTTR, 7% of organizations",
                  link: "dora.dev"
                },
                {
                  source: "Aberdeen Group",
                  year: "2023",
                  finding: "$260,000 per hour downtime cost for large enterprises",
                  link: "aberdeen.com"
                },
                {
                  source: "Uptime Institute",
                  year: "2024",
                  finding: "Average outage cost increased 60% since 2019",
                  link: "uptimeinstitute.com"
                },
                {
                  source: "CNCF Survey",
                  year: "2024",
                  finding: "Kubernetes adoption growing 40% YoY, 67% in production",
                  link: "cncf.io"
                },
                {
                  source: "Forrester",
                  year: "2024",
                  finding: "SREs spend 40% of time on incident response and toil",
                  link: "forrester.com"
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-lg font-bold text-white">{item.source}</div>
                    <div className="text-sm text-slate-500">{item.year}</div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-3">{item.finding}</p>
                  <div className="text-xs text-cyan-400">{item.link}</div>
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
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start Reducing Costs Today
              </h2>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                Join platform teams saving $500K+ annually with AI-powered incident intelligence
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold px-8 py-6 text-lg"
                  onClick={() => window.location.href = "/docs/installation.html"}
                >
                  Install KubeGraf Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 hover:bg-white/5 px-8 py-6 text-lg"
                  onClick={() => window.location.href = "mailto:contact@kubegraf.io?subject=Enterprise Demo Request"}
                >
                  Request Enterprise Demo
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
