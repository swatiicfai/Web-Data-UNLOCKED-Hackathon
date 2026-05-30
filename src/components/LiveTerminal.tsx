"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const logs = [
  { text: "[System] Booting up Anti-Greenwashing Swarm...", delay: 0 },
  { text: "[System] Initializing Bright Data Scraping Node...", delay: 500 },
  { text: "[Scraper Agent] Bypassing anti-bot protections...", delay: 1000 },
  { text: "[Scraper Agent] Parsing HTML and extracting sustainability claims...", delay: 1500 },
  { text: "[SERP Agent] Querying global news databases for brand controversies...", delay: 2500 },
  { text: "[SERP Agent] Cross-referencing ESG reports and local court filings...", delay: 3200 },
  { text: "[Auditor Agent] Synthesizing data and calculating Trust Score...", delay: 4000 },
];

export default function LiveTerminal({ active }: { active: boolean }) {
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!active) {
      setVisibleLogs([]);
      return;
    }

    const timers = logs.map(log => 
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, log.text]);
      }, log.delay)
    );

    return () => timers.forEach(clearTimeout);
  }, [active]);

  if (!active && visibleLogs.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="glass-panel"
      style={{
        background: 'rgba(13, 17, 23, 0.9)',
        border: '1px solid rgba(46, 160, 67, 0.3)',
        padding: '1.5rem',
        marginTop: '1.5rem',
        fontFamily: 'monospace',
        color: '#2ea043',
        textAlign: 'left'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
        <Terminal size={18} />
        <span style={{ color: '#e6edf3', fontSize: '0.9rem', fontWeight: 600 }}>Multi-Agent Terminal</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
        {visibleLogs.map((log, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span style={{ color: '#8b949e' }}>{'>'}</span> {log}
          </motion.div>
        ))}
        {active && visibleLogs.length < logs.length && (
          <motion.div
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            _
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
