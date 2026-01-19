import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-16 bg-black border-t border-gray-800">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="text-center"
        >
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-fuchsia-400 bg-clip-text text-transparent mb-4">
            KubeGraf
          </div>
          <p className="text-gray-500">© 2025 KubeGraf. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}