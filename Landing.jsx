import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, FileSearch, ScanLine, Sparkles, Target, WandSparkles } from 'lucide-react';

const particles = Array.from({ length: 14 }, (_, index) => index);

export default function Landing() {
  return (
    <div className="landing-page min-h-screen overflow-hidden text-slate-100">
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link to="/" className="flex items-center gap-3 text-xl font-black tracking-tight">
          <span className="brand-mark"><BrainCircuit size={22} /></span>
          Resume<span className="text-cyan-300">IQ</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <a href="#features" className="transition hover:text-cyan-300">Capabilities</a>
          <a href="#workflow" className="transition hover:text-cyan-300">How it works</a>
          <Link to="/login" className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 hover:bg-white/10">Sign in</Link>
        </div>
        <Link to="/register" className="btn btn-primary hidden md:inline-flex">Start analysis <ArrowRight className="ml-2" size={17} /></Link>
      </nav>

      <main className="relative z-10 mx-auto max-w-7xl px-6">
        <section className="grid min-h-[720px] items-center gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse-dot" /> AI RESUME INTELLIGENCE / ONLINE</div>
            <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-tight sm:text-7xl">
              Your resume.
              <span className="block text-gradient">Re-engineered.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              A futuristic AI workspace that sees what recruiters see, finds your hidden strengths, and turns every application into a stronger signal.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/register" className="btn btn-primary inline-flex items-center">Analyze my resume <ArrowRight className="ml-2" size={18} /></Link>
              <a href="#workflow" className="btn glass-button inline-flex items-center"><Sparkles className="mr-2 text-cyan-300" size={17} /> Explore the system</a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
              <span><strong className="text-white">5 min</strong> to insight</span>
              <span><strong className="text-white">100%</strong> private workflow</span>
              <span><strong className="text-white">No key</strong> fallback mode</span>
            </div>
          </div>

          <div className="hero-stage" aria-label="Animated AI resume analysis visualization">
            <div className="stage-grid" />
            {particles.map((particle) => <i key={particle} className={`particle p${particle + 1}`} />)}
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="holo-card holo-back"><span>SKILL VECTOR</span><strong>+ 94.8%</strong></div>
            <div className="resume-tilt">
              <div className="resume-sheet">
                <div className="scan-line" />
                <div className="resume-top"><span className="avatar-glow">S</span><div><b>SHUBHAM SINGH</b><small>AI / SOFTWARE ENGINEER</small></div><span className="verified">✓</span></div>
                <div className="resume-line wide" /><div className="resume-line medium" />
                <div className="resume-columns"><div><span className="section-label">PROFILE</span><div className="resume-line" /><div className="resume-line wide" /><div className="resume-line medium" /></div><div><span className="section-label">MATCH</span><div className="score-ring"><strong>87</strong><small>ATS</small></div></div></div>
                <div className="section-label">SIGNAL DETECTION</div>
                <div className="signal-row"><span>React</span><span>Node.js</span><span>AI</span><span>SQL</span></div>
                <div className="resume-footer"><span>ANALYZING PROFILE...</span><b>LIVE</b></div>
              </div>
            </div>
            <div className="holo-card holo-front"><ScanLine size={17} /><span>ATS COMPATIBILITY</span><strong>87<span>/100</span></strong><small>↑ 18% after optimization</small></div>
            <div className="ai-badge"><WandSparkles size={15} /> AI ENGINE ACTIVE</div>
          </div>
        </section>

        <section id="features" className="pb-24">
          <div className="section-heading"><span className="eyebrow">CORE CAPABILITIES</span><h2>See your resume through an intelligent lens.</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [Target, 'ATS signal mapping', 'Understand how your resume performs against the role that matters.'],
              [FileSearch, 'Skill gap vision', 'Reveal matched skills, missing keywords, and your next best moves.'],
              [Sparkles, 'Actionable upgrades', 'Get focused improvements that make your story sharper and more measurable.']
            ].map(([Icon, title, description]) => <div className="feature-card" key={title}><Icon className="text-cyan-300" size={25} /><h3>{title}</h3><p>{description}</p><span className="feature-arrow">↗</span></div>)}
          </div>
        </section>

        <section id="workflow" className="pb-28">
          <div className="workflow-panel">
            <div><span className="eyebrow">THE WORKFLOW</span><h2 className="mt-4 text-4xl font-black">From document to direction.</h2></div>
            <div className="workflow-steps">{['Upload your resume', 'Add the target role', 'Receive your AI report'].map((step, index) => <div className="workflow-step" key={step}><b>0{index + 1}</b><span>{step}</span></div>)}</div>
          </div>
        </section>
      </main>
      <footer className="landing-footer">Made by <span>Shubham Singh</span> · ResumeIQ AI</footer>
    </div>
  );
}
