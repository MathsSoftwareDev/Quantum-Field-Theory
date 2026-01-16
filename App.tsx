
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { FieldScene, VacuumFluctuationScene } from './components/QuantumScene';
import { FeynmanInteraction, LagrangianVisualizer, SymmetryBreakingDiagram } from './components/Diagrams';
import { ArrowDown, Menu, X, Zap, ChevronRight, Info, Share2, Check } from 'lucide-react';

const MathBlock = ({ children }: { children: string }) => (
  <div className="my-6 p-6 bg-stone-50 border border-stone-200 rounded-lg shadow-sm flex justify-center items-center overflow-x-auto">
    <code className="text-xl md:text-2xl font-serif text-stone-800 whitespace-nowrap italic">
      {children}
    </code>
  </div>
);

const TheoryList = ({ items }: { items: string[] }) => (
  <ul className="space-y-4 mt-8">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-3 text-stone-600 leading-relaxed">
        <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-nobel-gold" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const ScholarCard = ({ name, contribution, delay }: { name: string, contribution: string, delay: string }) => {
  return (
    <div className="flex flex-col group animate-fade-in-up items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50" style={{ animationDelay: delay }}>
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-3">{name}</h3>
      <div className="w-12 h-0.5 bg-nobel-gold mb-4 opacity-60"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{contribution}</p>
    </div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Quanta: Quantum Field Theory',
      text: 'Explore the mathematical fabric of reality in this interactive visualization.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled or failed', err);
      }
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Share Floating Button */}
      <button 
        onClick={handleShare}
        className="fixed bottom-8 right-8 z-[60] p-4 bg-stone-900 text-white rounded-full shadow-2xl hover:bg-stone-800 transition-all hover:scale-110 active:scale-95 flex items-center gap-2 group border border-white/10"
        title="Share this experience"
      >
        {copied ? <Check size={20} className="text-green-400" /> : <Share2 size={20} />}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-xs font-bold tracking-widest uppercase">
          {copied ? 'Link Copied' : 'Share Experience'}
        </span>
      </button>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">Ψ</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              QUANTA <span className="font-normal text-stone-500">FIELDS</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">The Vacuum</a>
            <a href="#lagrangian" onClick={scrollToSection('lagrangian')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">The Lagrangian</a>
            <a href="#feynman" onClick={scrollToSection('feynman')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Interactions</a>
            <button onClick={handleShare} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase flex items-center gap-1">
              <Share2 size={14} /> Share
            </button>
            <a 
              href="#" 
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              Theory Docs
            </a>
          </div>

          <button className="md:hidden text-stone-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-xl font-serif animate-fade-in">
            <a href="#introduction" onClick={scrollToSection('introduction')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">The Vacuum</a>
            <a href="#lagrangian" onClick={scrollToSection('lagrangian')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">The Lagrangian</a>
            <a href="#feynman" onClick={scrollToSection('feynman')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Interactions</a>
            <button onClick={() => { handleShare(); setMenuOpen(false); }} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Share Experience</button>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <FieldScene />
        
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.85)_0%,rgba(249,248,244,0.5)_60%,rgba(249,248,244,0.2)_100%)]" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30">
            Quantum Mechanics + Special Relativity
          </div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900">
            The Fabric <br/><span className="italic font-normal text-stone-600 text-3xl md:text-5xl block mt-4">Of Quantum Fields</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12">
            In our universe, particles are not tiny billiard balls, but localized excitations of underlying fields that permeate all of space and time.
          </p>
          
          <div className="flex justify-center">
             <a href="#introduction" onClick={scrollToSection('introduction')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span>DESCEND INTO THE VACUUM</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 transition-colors bg-white/50">
                    <ArrowDown size={16} />
                </span>
             </a>
          </div>
        </div>
      </header>

      <main>
        {/* Introduction */}
        <section id="introduction" className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">THE FOUNDATION</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">Beyond Particles</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
              
              <MathBlock>
                {"Φ(x) = ∫ d³k/(2π)³√2ωₖ [aₖe⁻ⁱᵏˣ + aₖ†eⁱᵏˣ]"}
              </MathBlock>
              <p className="text-xs text-stone-400 italic text-center uppercase tracking-tighter">The Field Operator Decomposition</p>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed">
              <p className="mb-6">
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">Q</span>uantum Field Theory (QFT) is the theoretical framework that reconciles quantum mechanics and special relativity. It provides the mathematical language for the <strong>Standard Model</strong> of particle physics.
              </p>
              
              <TheoryList items={[
                "Particle Identity: All electrons are identical because they are excitations of the same universal Electron Field.",
                "Wave-Particle Duality: Resolved by treating particles as quantized packets of energy (quanta) in a continuous field.",
                "Lorentz Covariance: QFT equations must remain invariant under the transformations of special relativity.",
                "Zero-Point Energy: Even in total vacuum, fields fluctuate due to the Heisenberg Uncertainty Principle."
              ]} />
            </div>
          </div>
        </section>

        {/* The Science: Lagrangian */}
        <section id="lagrangian" className="py-24 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <Zap size={14}/> THE DYNAMICS
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">The Action Principle</h2>
                        
                        <MathBlock>
                          {"S = ∫ d⁴x ℒ(φ, ∂_μ φ)"}
                        </MathBlock>

                        <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                           The physics of a field is encapsulated in its <strong>Lagrangian Density</strong> ({'$\\mathcal{L}$'}). It describes the energy density profile of the field across space-time.
                        </p>
                        
                        <TheoryList items={[
                          "Hamilton's Principle: Nature chooses the path that extremizes the Action (δS = 0).",
                          "Euler-Lagrange Equations: These derive the field equations of motion from the Lagrangian.",
                          "Noether's Theorem: Every continuous symmetry in the Lagrangian implies a conservation law (e.g., translation → momentum).",
                          "Local Gauge Invariance: Demanding that physics is independent of local field phase choices forces the existence of forces."
                        ]} />
                    </div>
                    <div className="sticky top-24">
                        <LagrangianVisualizer />
                        <div className="mt-4 p-4 bg-[#F9F8F4] rounded border border-stone-200 text-sm italic text-stone-500">
                          <Info size={14} className="inline mr-2 mb-1" />
                          Visualization of a Scalar Potential: The mass term ($m^2$) defines the width of the well, while the coupling ($\lambda$) dictates the interaction strength.
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* The Science: Feynman Diagrams */}
        <section id="feynman" className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="w-96 h-96 rounded-full bg-stone-600 blur-[100px] absolute top-[-100px] left-[-100px]"></div>
                <div className="w-96 h-96 rounded-full bg-nobel-gold blur-[100px] absolute bottom-[-100px] right-[-100px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                     <div className="order-2 lg:order-1 sticky top-24">
                        <FeynmanInteraction />
                        <div className="mt-8 p-6 bg-stone-800 rounded-lg border border-stone-700">
                           <h4 className="font-serif text-nobel-gold text-lg mb-2">Scattering Amplitude</h4>
                           <code className="text-stone-300 text-lg">{"ℳ = ∑ₙ (Feynman Diagrams)ₙ"}</code>
                           <p className="text-stone-500 text-sm mt-4">Each diagram represents a specific term in the perturbation expansion of the S-matrix.</p>
                        </div>
                     </div>
                     <div className="order-1 lg:order-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-700">
                            PARTICLE CALCULUS
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Interactions & Propagators</h2>
                        <p className="text-lg text-stone-400 mb-6 leading-relaxed">
                            Interactions are visualized as vertices where field lines intersect. Richard Feynman transformed formidable integrals into a rigorous diagrammatic language.
                        </p>
                        
                        <TheoryList items={[
                          "Vertices: Points where fields exchange energy. The strength is dictated by the coupling constant (g).",
                          "Virtual Particles: Intermediate states in diagrams that do not satisfy the classical mass-shell relation (E² ≠ p²c² + m²c⁴).",
                          "Loop Corrections: Diagrams with closed paths represent vacuum fluctuations and require renormalization.",
                          "Renormalization: The mathematical technique to remove infinities by redefining physical parameters (mass/charge)."
                        ]} />
                     </div>
                </div>
            </div>
        </section>

        {/* The Science: Symmetry Breaking */}
        <section className="py-24 bg-[#F9F8F4]">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Higgs Field & Symmetry Breaking</h2>
                    
                    <MathBlock>
                      {"V(φ) = -μ²|φ|² + λ|φ|⁴"}
                    </MathBlock>

                    <p className="text-lg text-stone-600 leading-relaxed mb-8">
                        Why do particles have mass? In the early universe, the Higgs field was at a zero-energy state. As it cooled, it "fell" into a non-zero vacuum expectation value, breaking the symmetry.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      <div className="p-6 bg-white border border-stone-200 rounded-xl">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-nobel-gold mb-3">VEV</h4>
                        <p className="text-sm text-stone-500">The field takes a non-zero value in empty space, creating a "background" medium.</p>
                      </div>
                      <div className="p-6 bg-white border border-stone-200 rounded-xl">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-nobel-gold mb-3">Yukawa Coupling</h4>
                        <p className="text-sm text-stone-500">Fermions acquire mass by interacting with this background Higgs field.</p>
                      </div>
                      <div className="p-6 bg-white border border-stone-200 rounded-xl">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-nobel-gold mb-3">The Boson</h4>
                        <p className="text-sm text-stone-500">Excitations of this field are seen as the Higgs Boson (discovered in 2012).</p>
                      </div>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto">
                    <SymmetryBreakingDiagram />
                </div>
            </div>
        </section>

        {/* Impact */}
        <section id="impact" className="py-24 bg-white border-t border-stone-200">
             <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-5 relative">
                    <div className="aspect-square bg-[#F5F4F0] rounded-xl overflow-hidden relative border border-stone-200 shadow-inner">
                        <VacuumFluctuationScene />
                        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-stone-400 font-serif italic">Visualization of the Virtual Particle Foam</div>
                    </div>
                </div>
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">SIGNIFICANCE</div>
                    <h2 className="font-serif text-4xl mb-6 text-stone-900">Unity of Fundamental Forces</h2>
                    
                    <MathBlock>
                      {"SU(3)_C × SU(2)_L × U(1)_Y"}
                    </MathBlock>

                    <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                        QFT allows us to treat electromagnetism, the weak nuclear force, and the strong nuclear force under a unified mathematical framework: Gauge Theory.
                    </p>
                    
                    <ul className="space-y-4 mb-8">
                       <li className="flex gap-4">
                          <div className="shrink-0 w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-500"><ChevronRight size={18}/></div>
                          <div>
                            <p className="font-bold text-stone-900">Antimatter Prediction</p>
                            <p className="text-sm text-stone-500">Dirac's field equations necessitated the existence of positrons.</p>
                          </div>
                       </li>
                       <li className="flex gap-4">
                          <div className="shrink-0 w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-500"><ChevronRight size={18}/></div>
                          <div>
                            <p className="font-bold text-stone-900">Anomalous Magnetic Moment</p>
                            <p className="text-sm text-stone-500">Predictions matching experiments to 12 decimal places.</p>
                          </div>
                       </li>
                    </ul>
                    
                    <div className="p-6 bg-[#F9F8F4] border border-stone-200 rounded-lg border-l-4 border-l-nobel-gold">
                        <p className="font-serif italic text-xl text-stone-800 mb-4">
                            "Everything is made of fields. Particles are just the way fields behave when we look at them closely enough."
                        </p>
                        <span className="text-sm font-bold text-stone-500 tracking-wider uppercase">— Theoretical Physics Maxim</span>
                    </div>
                </div>
             </div>
        </section>

        {/* Founders */}
        <section id="founders" className="py-24 bg-[#F5F4F0] border-t border-stone-300">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">ARCHITECTS</div>
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">Founding Minds</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">The pioneers who synthesized relativity and quantum mechanics.</p>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <ScholarCard 
                        name="Richard Feynman" 
                        contribution="Diagrammatic Calculus" 
                        delay="0s" 
                    />
                    <ScholarCard 
                        name="Julian Schwinger" 
                        contribution="Variational Formulations" 
                        delay="0.1s" 
                    />
                    <ScholarCard 
                        name="Sin-Itiro Tomonaga" 
                        contribution="Relativistic Renormalization" 
                        delay="0.2s" 
                    />
                    <ScholarCard 
                        name="Steven Weinberg" 
                        contribution="Electroweak Unification" 
                        delay="0.3s" 
                    />
                    <ScholarCard 
                        name="Abdus Salam" 
                        contribution="Gauge Theory Symmetry" 
                        delay="0.4s" 
                    />
                </div>
           </div>
        </section>

      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
                <div className="text-white font-serif font-bold text-2xl mb-2">QUANTA</div>
                <p className="text-sm">A visual guide to Quantum Field Theory and the Standard Model.</p>
            </div>
            <button 
              onClick={handleShare}
              className="px-6 py-2 border border-stone-700 rounded-full text-white hover:bg-stone-800 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
            >
              <Share2 size={16} /> {copied ? 'Link Copied' : 'Share Quanta'}
            </button>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600 uppercase tracking-widest">
            Non-Profit Educational Resource • 2024
        </div>
      </footer>
    </div>
  );
};

export default App;
