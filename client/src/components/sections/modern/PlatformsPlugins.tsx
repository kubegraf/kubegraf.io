import { motion } from "framer-motion";
import styles from "./PlatformsPlugins.module.css";

interface Integration {
  id: number;
  name: string;
  logo: string;
  color: string;
  badge?: string;
}

// Platform compatibility - any Kubernetes cluster (matching LogoMarquee.tsx)
const platforms: Integration[] = [
  { id: 1, name: "AWS EKS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonwebservices.svg", color: "#FF9900" },
  { id: 2, name: "Google GKE", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecloud.svg", color: "#4285F4" },
  { id: 3, name: "Azure AKS", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg", color: "#0078D4" },
  { id: 4, name: "Rancher", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/rancher.svg", color: "#0075A8" },
  { id: 5, name: "OpenShift", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/redhatopenshift.svg", color: "#EE0000" },
  { id: 6, name: "K3s", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/k3s.svg", color: "#FFC61C" },
];

// Built-in plugins - officially supported integrations (matching LogoMarquee.tsx)
const plugins: Integration[] = [
  { id: 7, name: "Helm", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/helm.svg", color: "#0F1689", badge: "plugin" },
  { id: 8, name: "ArgoCD", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/argo.svg", color: "#EF7B4D", badge: "plugin" },
  { id: 9, name: "Flux", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flux.svg", color: "#5468FF", badge: "plugin" },
  { id: 10, name: "Istio", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/istio.svg", color: "#466BB0", badge: "plugin" },
  { id: 11, name: "Cilium", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cilium.svg", color: "#F8C517", badge: "plugin" },
  { id: 12, name: "Nginx", logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nginx.svg", color: "#009639", badge: "plugin" },
];

export default function PlatformsPlugins() {
  // Combine platforms and plugins for unified grid
  const allIntegrations = [...platforms, ...plugins];
  // Duplicate items for seamless infinite scroll
  const duplicatedIntegrations = [...allIntegrations, ...allIntegrations];

  return (
    <section className={styles.section} aria-label="Supported platforms and plugins">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>Works with Your Kubernetes Stack</h2>
          <p className={styles.subtitle}>
            Any cluster • Built-in plugins
          </p>
        </motion.div>

        {/* Scrolling Container with Gradient Fade */}
        <div className={styles.scrollContainer}>
          <div className={styles.gradientLeft} />
          <div className={styles.gradientRight} />
          
          {/* Continuous Scrolling Animation */}
          <motion.div
            className={styles.scrollingGrid}
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicatedIntegrations.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={styles.platformCard}
                title={item.name}
              >
                <div className={styles.logoContainer}>
                  <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    className={styles.logoImage}
                    loading="lazy"
                    onError={(e) => {
                      // Fallback: show colored circle with first letter if image fails (matching LogoMarquee.tsx)
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector(`.${styles.fallbackLogo}`)) {
                        const fallback = document.createElement("div");
                        fallback.className = styles.fallbackLogo;
                        fallback.textContent = item.name.charAt(0);
                        fallback.style.backgroundColor = item.color;
                        fallback.style.color = "#ffffff";
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <div className={styles.content}>
                  <span className={styles.platformName}>{item.name}</span>
                  {item.badge && (
                    <span className={styles.badge}>{item.badge}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
