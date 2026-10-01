import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, Award, BookOpen, BriefcaseBusiness, CalendarDays, Check,
  ChevronDown, Compass, GraduationCap, HandHeart, Languages, Linkedin,
  Mail, Menu, MessageSquareText, Mic2, Network, Quote, Target, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatAssistant } from "@/components/ChatAssistant";
import { SITE_LINKS } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Edith Moricz | Executive Strategic Advisory" },
    { name: "description", content: "Executive coaching and strategic advisory for accomplished leaders at pivotal career moments." },
    { property: "og:title", content: "Edith Moricz | Executive Strategic Advisory" },
    { property: "og:description", content: "Executive coaching and strategic advisory for accomplished leaders at pivotal career moments." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const services = [
  { icon: BriefcaseBusiness, title: "Executive Coaching and Strategic Advisory", copy: "Personal branding, career positioning, interview preparation and professional clarity." },
  { icon: Network, title: "Leadership Development and Strategic Communications", copy: "Clearer leadership, trusted relationships and communication with purpose." },
  { icon: Compass, title: "Career Assessment", copy: "Insight through the Strong Interest Inventory." },
  { icon: Mic2, title: "Ace Your Interview", copy: "Interview training and conversations from the podcast." },
  { icon: Target, title: "FastTrack2YrDreamJob", copy: "Focused career coaching to clarify and pursue your next chapter." },
  { icon: GraduationCap, title: "College Student Mentorship", copy: "Thoughtful guidance for students shaping their professional direction." },
  { icon: HandHeart, title: "Fundraising Training for Nonprofits", copy: "Relationship centered training for nonprofit leaders and teams." },
];

const clients = [
  { name: "Tessa Milofsky McLure", title: "Transformational Leader in Global Supply Chain and Life Sciences", copy: "Refined her brand messaging and secured a new position." },
  { name: "Brian Sinkiewicz", title: "Senior Vice President", copy: "Received interview preparation support after 17 years in the same role." },
  { name: "Scott Tierno, DA, M.Ed., PMP", title: "Executive Leader", copy: "Discovered his strengths through compassionate conversation." },
  { name: "Renny Li, PhD", title: "Head of Performance Management", copy: "Valued her attentive listening centered on his background and priorities." },
  { name: "Arundhati Biswas", title: "Senior Director", copy: "Highlighted her experience, insight and empathy." },
];

const faqs = [
  ["Who does Edith work with?", "Edith works with accomplished professionals, senior leaders, executives, college students and nonprofit teams navigating meaningful moments of growth or change."],
  ["What does coaching involve?", "Coaching begins with attentive listening. Together, you recognize the value of your experience, clarify what matters and identify the way forward."],
  ["Is coaching online or in person?", "Edith advises clients in Greater Boston and around the world. Contact Edith to discuss the format most appropriate for you."],
  ["How much does it cost?", `Pricing is shared directly by Edith. Email ${SITE_LINKS.email}.`],
  ["How do I get started?", "Send a brief message below or book a call. Edith will personally review your message and contact you about the most appropriate next step."],
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("revealed");
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <header className="site-nav">
        <a href="#home" className="brand" aria-label="Edith Moricz home">
          <span>Edith Moricz</span><small>Executive Strategic Advisory</small>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#home">Home</a><a href="#experiences">Client Experiences</a><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a>
        </nav>
        <Button asChild className="hidden lg:inline-flex"><a href={SITE_LINKS.calendly} target="_blank" rel="noreferrer">Book a Call <ArrowRight className="size-4" /></a></Button>
        <Button variant="icon" size="icon" className="lg:hidden" aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        {menuOpen && <nav className="mobile-nav"><a href="#home">Home</a><a href="#experiences">Client Experiences</a><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a><a href={SITE_LINKS.calendly}>Book a Call</a></nav>}
      </header>

      <section id="home" className="hero-section">
        <div className="hero-rule" />
        <div className="hero-copy reveal">
          <p className="eyebrow">Executive Career Strategist • Greater Boston</p>
          <h1>What becomes possible when your experience is seen differently?</h1>
          <p className="hero-intro">Executive coaching and strategic advisory for accomplished leaders at pivotal career moments.</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild><a href="#contact">Start the Conversation <ArrowRight className="size-4" /></a></Button>
            <Button variant="ivory" onClick={() => document.querySelector<HTMLButtonElement>("[aria-label=\"Open Edith's Assistant\"]")?.click()}>Ask My Assistant <MessageSquareText className="size-4" /></Button>
          </div>
        </div>
        <div className="portrait-wrap reveal">
          <div className="portrait-frame">
            <img src="/edith.jpg" alt="Portrait of Edith Moricz" className="absolute inset-0 h-full w-full object-cover object-top" />
          </div>
          <div className="portrait-arc" />
        </div>
        <div className="recognition-row reveal">
          <span><Award />Top 10 LinkedIn Coach to Follow 2021</span>
          <span><Award />Top 10 Female Coaches Making an Impact 2024</span>
          <span><Linkedin />LinkedIn Top Coaching and Mentoring Voice</span>
        </div>
      </section>

      <section className="philosophy-section">
        <div className="section-shell reveal">
          <p className="section-label">A different perspective</p>
          <blockquote>You may not need more advice. You may need a different interpretation of what you already bring.</blockquote>
          <div className="pillars">
            {[["01", "Listen"], ["02", "Recognize the Value"], ["03", "Clarify the Way Forward"]].map(([number, title]) => <div key={title}><span>{number}</span><h3>{title}</h3></div>)}
          </div>
          <div className="counters">
            <div><strong>25+</strong><span>Years of Experience</span></div>
            <div><strong>Hundreds</strong><span>Professionals Coached Worldwide</span></div>
            <div><strong>2</strong><span>Top 10 Honors</span></div>
          </div>
        </div>
      </section>

      <section id="about" className="about-section section-shell">
        <div className="about-title reveal"><p className="section-label">About Edith</p><h2>Experience understood.<br />Potential recognized.</h2></div>
        <div className="about-copy reveal">
          <p className="lead">For more than 25 years, Edith has worked across executive development, higher education, nonprofit fundraising and financial services.</p>
          <p>She believes organizations succeed when leaders build trust. Her approach is calm, relationship centered and grounded in attentive listening.</p>
          <div className="about-notes"><span><Check />Founder and CEO of the FastTrack2YrDreamJob Program</span><span><Languages />English and Hungarian</span></div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="section-shell">
          <div className="section-heading reveal"><div><p className="section-label">Ways to work together</p><h2>Strategic support for what comes next.</h2></div><p>Each engagement begins with your experience, your priorities and the questions that matter now.</p></div>
          <div className="service-grid">
            {services.map(({ icon: Icon, title, copy }, index) => <article className="service-card reveal" key={title}><span className="service-number">0{index + 1}</span><Icon className="service-icon" /><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section id="experiences" className="experiences-section section-shell">
        <div className="section-heading reveal"><div><p className="section-label">Client Experiences</p><h2>Trusted at pivotal moments.</h2></div></div>
        <div className="experience-grid">
          {clients.map((client) => <article className="experience-card reveal" key={client.name}><Quote /><p>{client.copy}</p><div><strong>{client.name}</strong><span>{client.title}</span></div>{/* Replace summary with exact approved client quote when supplied. */}</article>)}
        </div>
      </section>

      <section className="recognition-section">
        <div className="marquee"><div>Number One Career Coach <span>◆</span> Top 10 LinkedIn Coach to Follow 2021 <span>◆</span> Top 10 Female Coaches Making an Impact 2024 <span>◆</span> Tory Burch Foundation Grant Recipient <span>◆</span> Featured on Close Up Radio</div></div>
        <div className="podcast section-shell reveal"><div><Mic2 /><p className="section-label">The Podcast</p><h2>Ace Your Interview</h2><p>Conversations and practical guidance to help you prepare with clarity.</p></div><Button asChild><a href={SITE_LINKS.podcast} target="_blank" rel="noreferrer">Listen to the Podcast <ArrowRight className="size-4" /></a></Button></div>
      </section>

      <section className="faq-section section-shell">
        <div className="faq-title reveal"><p className="section-label">Common Questions</p><h2>A thoughtful place to begin.</h2></div>
        <div className="faq-list reveal">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown /></summary><p>{answer}</p></details>)}</div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-inner section-shell">
          <div className="contact-copy reveal"><p className="section-label">Begin a conversation</p><h2>Ready to begin?</h2><p>Tell me briefly what you are navigating. I will personally review your message and contact you about the most appropriate next step.</p><Button variant="ivory" asChild><a href={SITE_LINKS.calendly} target="_blank" rel="noreferrer"><CalendarDays className="size-4" />Book a Call</a></Button></div>
          <div className="contact-form-wrap reveal">
            {submitted ? <div className="thank-you"><Check /><h3>Thank you for reaching out.</h3><p>Your message has been received. Edith will be in touch about the next step.</p></div> : <form onSubmit={submitForm} className="contact-form"><label>Name<input name="name" required /></label><label>Email<input name="email" type="email" required /></label><label>Message<textarea name="message" rows={5} required /></label><Button type="submit">Start the Conversation <ArrowRight className="size-4" /></Button></form>}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-main section-shell"><div className="brand footer-brand"><span>Edith Moricz</span><small>Executive Strategic Advisory</small></div><div className="footer-links"><a href={SITE_LINKS.linkedin} target="_blank" rel="noreferrer"><Linkedin />LinkedIn</a><a href={SITE_LINKS.gmailCompose} target="_blank" rel="noreferrer" title={SITE_LINKS.email}><Mail />{SITE_LINKS.email}</a><a href={SITE_LINKS.calendly} target="_blank" rel="noreferrer"><CalendarDays />Book a meeting</a></div></div>
        <div className="footer-bottom section-shell"><span>© {new Date().getFullYear()} Edith Moricz</span><span>Greater Boston</span></div>
      </footer>
      <ChatAssistant />
    </main>
  );
}
