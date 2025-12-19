/**
 * Web Vitals monitoring for performance tracking
 * Tracks Core Web Vitals: CLS, FID, LCP, FCP, TTFB
 */

type Metric = {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
};

export function reportWebVitals(onPerfEntry?: (metric: Metric) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Use native Web Vitals API if available
    if ('PerformanceObserver' in window) {
      // Cumulative Layout Shift (CLS)
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
          if (clsValue > 0) {
            const rating = clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor';
            onPerfEntry({
              name: 'CLS',
              value: clsValue,
              rating,
              delta: clsValue,
              id: `v1-${Date.now()}-${Math.random()}`
            });
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        console.warn('CLS measurement not supported');
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const fidValue = (entry as any).processingStart - entry.startTime;
            const rating = fidValue < 100 ? 'good' : fidValue < 300 ? 'needs-improvement' : 'poor';
            onPerfEntry({
              name: 'FID',
              value: fidValue,
              rating,
              delta: fidValue,
              id: `v1-${Date.now()}-${Math.random()}`
            });
          }
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        console.warn('FID measurement not supported');
      }

      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcpValue = lastEntry.startTime;
          const rating = lcpValue < 2500 ? 'good' : lcpValue < 4000 ? 'needs-improvement' : 'poor';
          onPerfEntry({
            name: 'LCP',
            value: lcpValue,
            rating,
            delta: lcpValue,
            id: `v1-${Date.now()}-${Math.random()}`
          });
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch (e) {
        console.warn('LCP measurement not supported');
      }
    }

    // Navigation Timing API fallback
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        const timing = window.performance.timing;
        const ttfb = timing.responseStart - timing.requestStart;
        const rating = ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor';

        onPerfEntry({
          name: 'TTFB',
          value: ttfb,
          rating,
          delta: ttfb,
          id: `v1-${Date.now()}-${Math.random()}`
        });
      });
    }
  }
}

// Log Web Vitals to console in development
export function logWebVitals() {
  if (import.meta.env.DEV) {
    reportWebVitals((metric) => {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: `${metric.value.toFixed(2)}ms`,
        rating: metric.rating,
        id: metric.id
      });
    });
  }
}
