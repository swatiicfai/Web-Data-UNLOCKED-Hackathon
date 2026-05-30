"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './components.css';
import LiveTerminal from './LiveTerminal';
import ScoreRadarChart from './ScoreRadarChart';

export default function ScorecardClient() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | any>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setResult(null);
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze the URL');
      }
      
      setResult(data);
      setLoading(false);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'An error occurred during analysis');
      setLoading(false);
    }
  };

  return (
    <div className="scorecard-container">
      <motion.header 
        className="header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1>Anti-Greenwashing <span className="highlight">Scorecard</span></h1>
        <p>Paste a product link to expose fake eco-friendly claims instantly.</p>
      </motion.header>

      <motion.div 
        className="glass-panel search-panel"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <form onSubmit={handleAnalyze} className="search-form">
          <input 
            type="url" 
            placeholder="https://example-shop.com/product/..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="url-input"
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </form>
        
        <AnimatePresence>
          {loading && <LiveTerminal active={true} />}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {result && !loading && (
          <motion.div 
            className="result-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <motion.div 
                className="glass-panel score-panel"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h2>Trust Score</h2>
                <div className={`score-circle ${result.score > 70 ? 'high' : result.score > 40 ? 'medium' : 'low'}`}>
                  <span>{result.score}</span>
                </div>
                <p className="score-desc">
                  {result.score > 70 ? 'Likely Genuine' : result.score > 40 ? 'Mixed Evidence' : 'High Risk of Greenwashing'}
                </p>
              </motion.div>
              
              {result.categories && (
                <motion.div 
                  className="glass-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Category Breakdown</h3>
                  <ScoreRadarChart data={result.categories} />
                </motion.div>
              )}
            </div>

            <div className="glass-panel details-panel">
              <motion.div 
                className="section"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3>🛍️ Brand Claims</h3>
                <p>{result.claims_summary}</p>
              </motion.div>
              <motion.div 
                className="section"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h3>🔍 Reality Check</h3>
                <p>{result.reality_summary}</p>
              </motion.div>
              <motion.div 
                className="section sources"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h3>📰 Sources</h3>
                <ul>
                  {result.sources?.map((src: any, i: number) => (
                    <li key={i}><a href={src.url} target="_blank" rel="noreferrer">{src.title}</a></li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
