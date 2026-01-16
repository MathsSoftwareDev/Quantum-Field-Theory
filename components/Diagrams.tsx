
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Activity, Zap, Layers, Share2 } from 'lucide-react';

// --- LAGRANGIAN VISUALIZER ---
export const LagrangianVisualizer: React.FC = () => {
  const [mass, setMass] = useState(2);
  const [coupling, setCoupling] = useState(1);

  return (
    <div className="flex flex-col items-center p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-2 text-stone-800">Scalar Field Dynamics</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md">
        Adjust field parameters to see how mass and coupling affect the vacuum state.
      </p>
      
      <div className="relative w-full h-48 bg-[#F5F4F0] rounded-lg border border-stone-200 p-4 overflow-hidden flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 400 200">
           {/* Potential Well */}
           <path 
             d={`M 50,150 Q 200,${150 - mass * 15} 350,150`} 
             fill="none" 
             stroke="#C5A059" 
             strokeWidth="2" 
             className="transition-all duration-500"
           />
           <motion.circle
             cx="200"
             animate={{ 
               cy: 150 - mass * 15, 
               r: 5 + coupling * 2 
             }}
             fill="#C5A059"
             opacity="0.8"
           />
           {/* Oscillation rings */}
           <motion.circle
              cx="200"
              cy={150 - mass * 15}
              animate={{ r: [10, 50], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 2 / coupling, ease: "easeOut" }}
              fill="none"
              stroke="#C5A059"
              strokeWidth="1"
           />
        </svg>
        <div className="absolute top-4 left-4 font-serif text-xs italic text-stone-400">
          {/* Fix: Wrapped LaTeX formula in JSX expression and escaped backslashes to resolve "Cannot find name 'L'" error */}
          {'$\\mathcal{L} = \\frac{1}{2}(\\partial \\phi)^2 - \\frac{1}{2}m^2\\phi^2 - \\frac{\\lambda}{4!}\\phi^4$'}
        </div>
      </div>

      <div className="mt-8 w-full space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400 w-24">Mass ($m$)</span>
          <input 
            type="range" min="0" max="5" step="0.1" value={mass} 
            onChange={(e) => setMass(parseFloat(e.target.value))}
            className="flex-1 accent-nobel-gold"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400 w-24">Coupling ($\lambda$)</span>
          <input 
            type="range" min="0" max="3" step="0.1" value={coupling} 
            onChange={(e) => setCoupling(parseFloat(e.target.value))}
            className="flex-1 accent-nobel-gold"
          />
        </div>
      </div>
    </div>
  );
};

// --- FEYNMAN INTERACTION ---
export const FeynmanInteraction: React.FC = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-900">Electron-Photon Scattering</h3>
      <p className="text-sm text-stone-600 mb-6 text-center max-w-md">
        A fundamental interaction in Quantum Electrodynamics (QED).
      </p>

      <div className="relative w-full max-w-lg h-64 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center">
        <svg width="300" height="200" viewBox="0 0 300 200">
           {/* Ingoing Electron */}
           <motion.line 
             x1="50" y1="50" x2="150" y2="100" 
             stroke="#1a1a1a" strokeWidth="3" 
             initial={{ pathLength: 0 }}
             animate={{ pathLength: active ? 1 : 0.2 }}
             transition={{ duration: 1 }}
           />
           {/* Ingoing Photon (Wavy) */}
           <motion.path 
             d="M 50,150 Q 75,125 100,150 Q 125,175 150,100" 
             fill="none" stroke="#C5A059" strokeWidth="2" strokeDasharray="5,5"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: active ? 1 : 0.2 }}
             transition={{ duration: 1 }}
           />
           {/* Vertex */}
           <motion.circle 
             cx="150" cy="100" r="6" fill="#C5A059" 
             animate={{ scale: active ? [1, 1.5, 1] : 1 }}
             transition={{ repeat: Infinity, duration: 2 }}
           />
           {/* Outgoing Electron */}
           <motion.line 
             x1="150" y1="100" x2="250" y2="50" 
             stroke="#1a1a1a" strokeWidth="3"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: active ? 1 : 0 }}
             transition={{ duration: 1, delay: 1 }}
           />
           {/* Outgoing Photon */}
           <motion.path 
             d="M 150,100 Q 175,125 200,100 Q 225,75 250,150" 
             fill="none" stroke="#C5A059" strokeWidth="2" strokeDasharray="5,5"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: active ? 1 : 0 }}
             transition={{ duration: 1, delay: 1 }}
           />
        </svg>

        <button 
           onClick={() => setActive(!active)}
           className="absolute bottom-4 right-4 p-3 bg-stone-900 text-white rounded-full shadow-lg hover:bg-stone-800 transition-colors"
        >
          {active ? <RotateCcw size={20} /> : <Play size={20} />}
        </button>
      </div>

      <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-stone-500">
          <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-stone-900"></div> Propagator</div>
          <div className="flex items-center gap-2"><div className="w-4 h-0.5 border-t-2 border-dashed border-nobel-gold"></div> Field Flux</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-nobel-gold"></div> Coupling Vertex</div>
      </div>
    </div>
  );
};

// --- SYMMETRY BREAKING ---
export const SymmetryBreakingDiagram: React.FC = () => {
    const [broken, setBroken] = useState(false);

    return (
        <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-800 shadow-lg">
            <div className="flex-1 min-w-[240px]">
                <h3 className="font-serif text-xl mb-2 text-nobel-gold">The Higgs Mechanism</h3>
                <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    When the "Mexican Hat" potential symmetry breaks, the field settles in a non-zero state, permeating space with mass-giving energy.
                </p>
                <button 
                  onClick={() => setBroken(!broken)}
                  className={`mt-4 px-6 py-2 rounded-full font-bold text-xs tracking-widest uppercase transition-all ${broken ? 'bg-stone-700 text-stone-300' : 'bg-nobel-gold text-stone-900'}`}
                >
                    {broken ? "Restore Symmetry" : "Break Symmetry"}
                </button>
            </div>
            
            <div className="relative w-64 h-64 bg-stone-800/50 rounded-xl border border-stone-700/50 p-6 flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 200 200" width="100%" height="100%">
                   {/* Mexican Hat cross-section */}
                   <motion.path 
                     d={broken ? "M 20,50 Q 60,180 100,100 Q 140,180 180,50" : "M 20,50 Q 100,50 180,50"}
                     fill="none" stroke="#C5A059" strokeWidth="3"
                     animate={{ d: broken ? "M 20,50 Q 60,180 100,100 Q 140,180 180,50" : "M 20,150 Q 100,20 180,150" }}
                   />
                   {/* The "Ball" (Vacuum State) */}
                   <motion.circle 
                     r="8" fill="#fff"
                     animate={{ 
                        cx: broken ? 60 : 100, 
                        cy: broken ? 135 : 45 
                     }}
                     transition={{ type: "spring", stiffness: 50 }}
                   />
                </svg>
                <div className="absolute bottom-4 text-[10px] font-mono text-stone-500 uppercase">
                    {broken ? "Spontaneous Symmetry Breaking" : "Unbroken Symmetry (Massless)"}
                </div>
            </div>
        </div>
    )
}
