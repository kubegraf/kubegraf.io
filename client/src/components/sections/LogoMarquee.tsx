import { motion } from "framer-motion";

// Platform compatibility - any Kubernetes cluster
const platforms = [
  { name: "AWS EKS", logo: "https://cdn.simpleicons.org/amazonwebservices/FF9900", color: "#FF9900" },
  { name: "Google GKE", logo: "https://cdn.simpleicons.org/googlecloud/4285F4", color: "#4285F4" },
  { name: "Azure AKS", logo: "https://cdn.simpleicons.org/microsoftazure/0078D4", color: "#0078D4" },
  { name: "Rancher", logo: "https://cdn.simpleicons.org/rancher/0075A8", color: "#0075A8" },
  { name: "OpenShift", logo: "https://cdn.simpleicons.org/redhatopenshift/EE0000", color: "#EE0000" },
  { name: "K3s", logo: "https://cdn.simpleicons.org/k3s/FFC61C", color: "#FFC61C" },
];

// Built-in plugins - officially supported integrations
const plugins = [
  { name: "Helm", logo: "https://cdn.simpleicons.org/helm/0F1689", color: "#0F1689" },
  { name: "ArgoCD", logo: "https://cdn.simpleicons.org/argo/EF7B4D", color: "#EF7B4D" },
  { name: "Flux", logo: "https://cdn.simpleicons.org/flux/5468FF", color: "#5468FF" },
  { name: "Istio", logo: "https://cdn.simpleicons.org/istio/466BB0", color: "#466BB0" },
  { name: "Cilium", logo: "https://cdn.simpleicons.org/cilium/F8C517", color: "#F8C517" },
  { name: "Nginx", logo: "https://cdn.simpleicons.org/nginx/009639", color: "#009639" },
];

function LogoItem({ name, logo, color, badge }: { name: string; logo: string; color: string; badge?: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 mx-4 rounded-lg bg-card/30 border border-border/30 hover:border-border/50 transition-colors group relative">
      <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 bg-white/10 p-1.5">
        <img
          src={logo}
          alt={`${name} logo`}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
        {name}
      </span>
      {badge && (
        <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
          {badge}
        </span>
      )}
    </div>
  );
}

function MarqueeRow({ items, badge, duration = 30 }: { items: typeof platforms; badge?: string; duration?: number }) {
  const duplicatedItems = [...items, ...items];

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, index) => (
          <LogoItem key={`${item.name}-${index}`} name={item.name} logo={item.logo} color={item.color} badge={badge} />
        ))}
      </motion.div>
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden border-t border-border/30">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-sm sm:text-base text-muted-foreground uppercase tracking-widest">
          Works with your Kubernetes stack
        </p>
        <p className="text-center text-xs sm:text-sm text-muted-foreground/60 mt-2">
          Any cluster • Built-in plugins
        </p>
      </div>

      <div className="space-y-4">
        {/* Row 1: Platform compatibility */}
        <MarqueeRow items={platforms} duration={25} />

        {/* Row 2: Built-in plugins */}
        <MarqueeRow items={plugins} badge="plugin" duration={28} />
      </div>
    </section>
  );
}
