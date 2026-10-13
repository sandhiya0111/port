import { useState } from 'react'
import { ArrowDown, ArrowUpRight, Menu, X, Sparkles, Code2, Heart, Send, Github, Linkedin, Instagram, CheckCircle2 } from 'lucide-react'
import { portfolio } from './data/portfolio'

const navItems = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact']
const iconFor = (label) => ({ GitHub: Github, LinkedIn: Linkedin, Instagram })[label] || ArrowUpRight

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: '', message: '' })
  const [sending, setSending] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async (e) => {
    e.preventDefault()
    setSending(true); setStatus({ type: '', message: '' })
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form)
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Could not send your message.')
      setStatus({ type: 'success', message: 'Thanks! Your message has been received.' })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus({ type: 'error', message: `${err.message} You can also email me directly at ${portfolio.email}.` })
    } finally { setSending(false) }
  }

  return <div className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="topbar">
      <a className="brand" href="#home" aria-label="Go to home"><span className="brand-mark">S.</span><span>{portfolio.name}<small>PORTFOLIO</small></span></a>
      <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
        <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={15} /></a>
      </nav>
    </header>

    <main>
      <section id="home" className="hero section-wrap">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR OPPORTUNITIES</div>
          <h1>Hi, I’m <span className="gradient-text">{portfolio.name}.</span><br />I make the web <span className="serif-italic">feel different.</span></h1>
          <p className="hero-role">{portfolio.role} <span className="role-divider">/</span> Creative problem solver</p>
          <p className="hero-description">{portfolio.tagline}</p>
          <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <ArrowUpRight size={17} /></a><a className="text-link" href="#about">A little about me <ArrowDown size={15} /></a></div>
          <div className="hero-footnote"><span className="mini-line" /> Based in {portfolio.location}</div>
        </div>
        <div className="hero-art" aria-label="Decorative abstract portfolio artwork">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" />
          <div className="art-card">
            <div className="art-card-top"><span>CREATIVE / CODE</span><Sparkles size={16} /></div>
            <div className="art-symbol"><span className="symbol-back">✳</span><span className="symbol-front">✦</span></div>
            <div className="art-card-bottom"><span>DESIGNING<br />WHAT’S NEXT</span><span className="art-index">001 — 026</span></div>
          </div>
          <div className="floating-chip chip-code"><Code2 size={16} /> <span>Build with purpose</span></div>
          <div className="floating-chip chip-heart"><Heart size={16} fill="currentColor" /> <span>Made with care</span></div>
          <div className="art-caption">A little logic. A little magic.</div>
        </div>
        <a className="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><span className="scroll-line" /></a>
      </section>

      <section id="about" className="section-wrap section-block">
        <div className="section-heading"><span className="section-kicker">01 / THE PERSON BEHIND THE PIXELS</span><h2>More than just <span className="serif-italic gradient-text">code.</span></h2></div>
        <div className="about-grid">
          <div className="about-note"><span className="quote-mark">“</span><p>Good digital experiences don’t just look nice. They make people feel understood.</p><span className="note-line" /></div>
          <div className="about-copy"><p>{portfolio.intro}</p><p>I care about thoughtful details, intuitive interactions, and writing code that’s easy to understand and maintain. My goal is to keep growing while creating work that makes a difference.</p><a className="inline-link" href={`mailto:${portfolio.email}`}>Say hello <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="stat-row"><div><strong>01<span>+</span></strong><small>Curiosity first</small></div><div><strong>100<span>%</span></strong><small>Learning mindset</small></div><div><strong>∞</strong><small>Ideas to explore</small></div></div>
      </section>

      <section id="skills" className="section-wrap section-block">
        <div className="section-heading"><span className="section-kicker">02 / MY TOOLKIT</span><h2>Skills I bring <span className="serif-italic gradient-text">to the table.</span></h2><p className="section-subtitle">A growing toolkit for turning thoughtful ideas into real, useful products.</p></div>
        <div className="skills-grid">{portfolio.skills.map((group, i) => <article className="skill-card" key={group.category}><div className="skill-card-head"><span className="skill-number">0{i + 1}</span><span className="skill-spark">✳</span></div><h3>{group.category}</h3><div className="skill-tags">{group.items.map((skill) => <span key={skill}>{skill}</span>)}</div></article>)}</div>
      </section>

      <section id="experience" className="section-wrap section-block">
        <div className="section-heading"><span className="section-kicker">03 / THE JOURNEY</span><h2>Experience & <span className="serif-italic gradient-text">growth.</span></h2></div>
        <div className="timeline">{portfolio.experience.map((item, i) => <article className="timeline-item" key={`${item.role}-${item.period}`}><div className="timeline-marker">{String(i + 1).padStart(2, '0')}</div><div className="timeline-content"><div className="timeline-meta">{item.period}</div><h3>{item.role}</h3><div className="timeline-company">{item.company}</div><p>{item.description}</p></div><ArrowUpRight className="timeline-arrow" size={20} /></article>)}</div>
      </section>

      <section id="projects" className="section-wrap section-block">
        <div className="section-heading project-heading"><div><span className="section-kicker">04 / SELECTED WORK</span><h2>Things I’ve <span className="serif-italic gradient-text">made.</span></h2></div><p className="section-subtitle">A few concepts and builds that show how I think, design, and develop.</p></div>
        <div className="projects-grid">{portfolio.projects.map((project, i) => <article className={`project-card project-${i + 1}`} key={project.number}><div className="project-visual"><span className="project-number">{project.number}</span><div className="project-art project-art-one"><span>{i === 0 ? 'task.' : i === 1 ? 'bloom' : 'insight'}</span><i /><i /><i /></div><span className="project-open"><ArrowUpRight size={20} /></span></div><div className="project-info"><div className="project-type">{project.type}</div><h3>{project.title}</h3><p>{project.description}</p><div className="project-bottom"><div className="project-tags">{project.stack.map((s) => <span key={s}>{s}</span>)}</div><a href={project.link} target="_blank" rel="noreferrer" aria-label={`Open ${project.title} link`}><ArrowUpRight size={18} /></a></div></div></article>)}</div>
      </section>

      <section id="contact" className="section-wrap section-block contact-section">
        <div className="contact-panel"><div className="contact-copy"><span className="section-kicker">05 / YOUR TURN</span><h2>Have a good idea?<br /><span className="serif-italic gradient-text">Let’s make it real.</span></h2><p>Have a project in mind, want to collaborate, or just want to say hi? My inbox is open.</p><a className="contact-email" href={`mailto:${portfolio.email}`}>{portfolio.email} <ArrowUpRight size={17} /></a><div className="social-links">{portfolio.socials.map((social) => { const Icon = iconFor(social.label); return <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}><Icon size={17} /></a> })}</div></div>
          <form className="contact-form" onSubmit={submit}><label>Your name<input name="name" value={form.name} onChange={update} placeholder="What should I call you?" required minLength="2" /></label><label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" required /></label><label>Tell me a little about it<textarea name="message" value={form.message} onChange={update} placeholder="Your idea starts here..." rows="4" required minLength="10" /></label><button className="button button-primary submit-button" type="submit" disabled={sending}>{sending ? 'Sending...' : 'Send message'} <Send size={16} /></button>{status.message && <p className={`form-status ${status.type}`}>{status.type === 'success' && <CheckCircle2 size={16} />}{status.message}</p>}</form>
        </div>
      </section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">S.</span></a><span>Designed with intention. Built with curiosity.</span><span>© {new Date().getFullYear()} {portfolio.name}</span></footer>
  </div>
}
export default App
