import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Bot, BriefcaseBusiness, Building2, CalendarDays, Check,
  ChevronRight, Cpu, GraduationCap, Handshake, Lightbulb, MapPin,
  Network, Radio, Rocket, ShieldCheck, Sparkles, UserRound,
} from "lucide-react";
import Navbar from "../Components/Navbar";
import { createEnquiry } from "../lib/api";
import heroImage from "../assets/ndff-conference-hero.png";
import collaborationImage from "../assets/ndff-collaboration.jpg";
import innovationImage from "../assets/ndff-innovation-expo.jpg";
import governmentAudienceImage from "../assets/audience-government.jpg";
import businessAudienceImage from "../assets/audience-business.jpg";
import technologyAudienceImage from "../assets/audience-technology.jpg";
import founderAudienceImage from "../assets/audience-founder.jpg";
import studentAudienceImage from "../assets/audience-student.jpg";
import "./home.css";

const eventDate = new Date("2026-10-28T09:00:00+01:00");

const audiences = [
  { icon: Building2, image: governmentAudienceImage, title: "Government & Public Sector", text: "Engage industry leaders, technology providers and policymakers around e-Governance, cybersecurity and emerging technologies." },
  { icon: BriefcaseBusiness, image: businessAudienceImage, title: "Business & Industry", text: "Discover emerging solutions, meet decision-makers and build partnerships across Nigeria's digital economy." },
  { icon: Cpu, image: technologyAudienceImage, title: "Technology Professionals", text: "Learn from industry experts and connect with the organisations actively shaping the sector." },
  { icon: Rocket, image: founderAudienceImage, title: "Startups & Founders", text: "Showcase solutions, meet customers and partners, and participate in the innovation ecosystem." },
  { icon: GraduationCap, image: studentAudienceImage, title: "Students & Emerging Talent", text: "Discover technology careers, develop practical skills and connect with employers." },
];

const experiences = [
  { icon: Handshake, title: "Government–Industry Dialogue", text: "Structured conversations bringing policymakers, institutions and industry leaders together.", format: "Executive panels · Moderated dialogue" },
  { icon: Bot, title: "AI & Emerging Technology", text: "Practical conversations and demonstrations around AI and frontier technologies.", format: "Keynotes · Panels · Demonstrations" },
  { icon: ShieldCheck, title: "Cybersecurity Forum", text: "Digital resilience, cyber risk, national security and organisational preparedness.", format: "Expert panels · Technical sessions" },
  { icon: Rocket, title: "Innovation & Startup Exhibition", text: "Technology companies and innovators showcase products, platforms and solutions.", format: "Exhibition · Live demonstrations" },
  { icon: Lightbulb, title: "Student Innovation Challenge", text: "Selected student teams present original technology ideas before judges and delegates.", format: "Live pitches · Awards" },
  { icon: BriefcaseBusiness, title: "Career & Skills Hub", text: "A dedicated space connecting emerging talent with employers and opportunities.", format: "Career talks · Mentorship · Skills" },
  { icon: Network, title: "Purposeful Networking", text: "Structured opportunities for delegates, founders, professionals and institutions to connect.", format: "Curated meetings · Social sessions" },
];

const focusAreas = [
  { icon: Bot, image: technologyAudienceImage, imageAlt: "Technology professional exploring artificial intelligence", title: "Artificial Intelligence", text: "Explore responsible AI, practical adoption and the opportunities reshaping Nigerian industries." },
  { icon: ShieldCheck, image: businessAudienceImage, imageAlt: "Business professionals discussing digital security", title: "Cybersecurity", text: "Strengthen digital trust through conversations on resilience, privacy and emerging threats." },
  { icon: Building2, image: governmentAudienceImage, imageAlt: "Public-sector leaders advancing digital transformation", title: "Digital Transformation", text: "Discover how technology can improve public services, organisations and everyday experiences." },
  { icon: Cpu, image: innovationImage, imageAlt: "An emerging technology demonstration at the forum", title: "Emerging Technologies", text: "See the new tools and infrastructure poised to influence Nigeria's next decade." },
  { icon: GraduationCap, image: studentAudienceImage, imageAlt: "Students developing practical digital skills", title: "Digital Skills", text: "Connect education, talent and industry to build a future-ready Nigerian workforce." },
  { icon: Sparkles, image: founderAudienceImage, imageAlt: "A Nigerian founder presenting an innovative idea", title: "Innovation", text: "Meet the founders and ideas turning local challenges into scalable solutions." },
];

const programme = [
  { day: "Day 01", date: "28 Oct", title: "Arrival, Accreditation & Official Opening", items: ["Delegate arrival and accreditation", "Opening ceremony", "Keynote address", "Goodwill messages", "Welcome engagement and networking"] },
  { day: "Day 02", date: "29 Oct", title: "Government, Industry & Technology", items: ["Government–Industry Dialogue", "Executive panels", "Artificial Intelligence", "Cybersecurity Forum", "Technology exhibition and networking"] },
  { day: "Day 03", date: "30 Oct", title: "Innovation, Digital Talent & Closing", items: ["Innovation and startup showcase", "Student Innovation Challenge", "Career & Skills Hub", "Future technology discussions", "Closing ceremony"] },
];

const programmeImages = [
  { src: heroImage, alt: "Delegates gathering for the NDFF opening programme" },
  { src: collaborationImage, alt: "Nigerian leaders in a collaborative forum discussion" },
  { src: innovationImage, alt: "Innovators demonstrating technology at the NDFF exhibition" },
];

function getCountdown() {
  const difference = Math.max(0, eventDate.getTime() - Date.now());
  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function Home() {
  const [activeDay, setActiveDay] = useState(0);
  const [countdown, setCountdown] = useState(getCountdown);
  const [enquiryStatus, setEnquiryStatus] = useState("idle");
  const [enquiryError, setEnquiryError] = useState("");
  const countdownParts = useMemo(() => Object.entries(countdown), [countdown]);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6%" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  async function handleEnquiry(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setEnquiryStatus("submitting");
    setEnquiryError("");

    try {
      await createEnquiry({
        full_name: data.get("name"),
        email: data.get("email"),
        organisation: data.get("organisation"),
        enquiry_type: data.get("type"),
        message: data.get("message"),
        website: data.get("website"),
      });
      form.reset();
      setEnquiryStatus("success");
    } catch (error) {
      setEnquiryError(error.message || "Your enquiry could not be sent. Please try again.");
      setEnquiryStatus("error");
    }
  }

  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-media" src={heroImage} alt="Delegates at a future-focused technology conference" />
          <div className="hero-shade" />
          <div className="container hero-inner">
            <div className="hero-content hero-enter">
              <p className="eyebrow hero-eyebrow"><span /> Connect. Innovate. Transform.</p>
              <h1 id="hero-title">Nigeria Digital Future Forum <strong>2026</strong></h1>
              <p className="hero-lead">Driving Nigeria's digital future through innovation and collaboration.</p>
              <div className="event-meta">
                <div><CalendarDays size={20} /><span><strong>28–30 October 2026</strong>Three transformative days</span></div>
                <div><MapPin size={20} /><span><strong>LCCI Conference Centre</strong>Alausa, Ikeja, Lagos</span></div>
              </div>
              <div className="hero-actions">
                <Link className="button button-primary" to="/registration">Register to attend <ArrowRight size={18} /></Link>
                <a className="button button-ghost" href="#sponsor">Become a sponsor</a>
              </div>
              <div className="hero-secondary"><a href="#exhibit">Exhibit at NDFF</a><span /><a href="#programme">Explore the programme</a></div>
            </div>
          </div>
          <div className="container countdown-wrap" aria-label="Countdown to NDFF 2026">
            <p>Forum begins in</p>
            <div className="countdown">
              {countdownParts.map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}
            </div>
          </div>
        </section>

        <section className="about-section section" id="about">
          <div className="container about-grid reveal">
            <div><p className="eyebrow">About the forum</p><h2>Where Nigeria's digital future takes shape.</h2></div>
            <div className="about-copy">
              <p>The Nigeria Digital Future Forum brings together government, industry, academia, innovators, entrepreneurs, technology professionals and emerging talent to explore the technologies, partnerships and ideas shaping Nigeria's digital future.</p>
              <a className="text-link" href="#experience">Discover the NDFF experience <ArrowRight size={17} /></a>
            </div>
          </div>
          <figure className="container story-visual reveal">
            <div className="story-image-wrap">
              <img src={collaborationImage} alt="Nigerian technology and public-sector leaders collaborating at a conference roundtable" loading="lazy" />
            </div>
            <figcaption>
              <span className="story-kicker">Ideas become action</span>
              <strong>One room. Every perspective.</strong>
              <p>Designed for the conversations that create policy, partnerships and practical progress.</p>
              <div className="story-stats" aria-label="Forum highlights">
                <span><b>3</b> days</span><span><b>7</b> experiences</span><span><b>1</b> shared future</span>
              </div>
            </figcaption>
          </figure>
          <div className="container focus-grid">
            {focusAreas.map(({ icon: Icon, image, imageAlt, title, text }, index) => (
              <div className={`focus-item reveal reveal-delay-${(index % 3) + 1}`} key={title}>
                <div className="focus-media">
                  <img src={image} alt={imageAlt} loading="lazy" />
                  <span className="focus-number">0{index + 1}</span>
                </div>
                <div className="focus-body"><Icon size={25} /><strong>{title}</strong><p>{text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="section audience-section" id="attend">
          <div className="container section-heading split-heading">
            <div><p className="eyebrow">Built for every changemaker</p><h2>Your reason to be in the room.</h2></div>
            <p>One forum, distinct opportunities for the people driving policy, industry, technology and talent.</p>
          </div>
          <div className="container audience-grid">
            {audiences.map(({ icon: Icon, image, title, text }, index) => (
              <article className={`audience-card reveal reveal-delay-${(index % 3) + 1}`} key={title}>
                <div className="audience-card-media">
                  <img src={image} alt={`NDFF attendee representing ${title}`} loading="lazy" />
                  <span className="card-number">0{index + 1}</span>
                  <span className="audience-card-icon"><Icon size={23} /></span>
                </div>
                <div className="audience-card-body">
                  <h3>{title}</h3><p>{text}</p><Link to="/registration">Choose your pass <ChevronRight size={16} /></Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section experience-section" id="experience">
          <div className="container experience-layout">
            <div className="experience-intro">
              <p className="eyebrow eyebrow-light">More than a conference</p>
              <h2>An experience designed for action.</h2>
              <p>Go beyond speeches. Meet collaborators, see new technology in motion and take part in the conversations moving Nigeria forward.</p>
              <Link className="button button-light" to="/registration">Secure your place <ArrowRight size={18} /></Link>
              <figure className="experience-photo reveal">
                <img src={innovationImage} alt="Young Nigerian innovators demonstrating technology at an exhibition" loading="lazy" />
                <figcaption><span>See what&apos;s next</span><strong>Innovation, in motion.</strong></figcaption>
              </figure>
            </div>
            <div className="experience-list">
              {experiences.map(({ icon: Icon, title, text, format }, index) => (
                <article className={`experience-row reveal reveal-delay-${(index % 3) + 1}`} key={title}>
                  <span className="experience-index">0{index + 1}</span><Icon size={25} />
                  <div><h3>{title}</h3><p>{text}</p><small>{format}</small></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section programme-section" id="programme">
          <div className="container section-heading centered">
            <p className="eyebrow">28–30 October 2026</p><h2>Three days. One shared future.</h2>
            <p>The programme will evolve as speakers and sessions are confirmed.</p>
          </div>
          <div className="container programme-panel reveal">
            <div className="day-tabs" role="tablist" aria-label="Programme days">
              {programme.map((item, index) => (
                <button key={item.day} className={activeDay === index ? "active" : ""} type="button" role="tab" aria-selected={activeDay === index} onClick={() => setActiveDay(index)}>
                  <span>{item.day}</span><strong>{item.date}</strong>
                </button>
              ))}
            </div>
            <figure className="programme-photo" key={`photo-${activeDay}`}>
              <img src={programmeImages[activeDay].src} alt={programmeImages[activeDay].alt} loading="lazy" />
              <figcaption><span>{programme[activeDay].day}</span><strong>{programme[activeDay].date}</strong></figcaption>
            </figure>
            <div className="agenda" role="tabpanel" key={activeDay}>
              <div><span className="agenda-label">Featured track</span><h3>{programme[activeDay].title}</h3><p>Detailed session times, stages and confirmed speakers will be added progressively.</p></div>
              <ul>{programme[activeDay].items.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="opportunities section" id="sponsor">
          <div className="container section-heading split-heading">
            <div><p className="eyebrow">Take your place</p><h2>Participate beyond attendance.</h2></div>
            <p>Position your organisation at the centre of the conversations and opportunities shaping Nigeria's digital future.</p>
          </div>
          <div className="container opportunity-grid">
            <article className="opportunity-card opportunity-featured reveal"><div className="opportunity-media"><img src={businessAudienceImage} alt="Business leader attending NDFF" loading="lazy" /><span>Sponsor</span></div><Handshake size={30} /><h3>Become an NDFF sponsor</h3><p>Engage decision-makers, industry leaders, innovators and emerging talent across the ecosystem.</p><a href="#contact">Explore sponsorship <ArrowRight size={18} /></a></article>
            <article className="opportunity-card reveal reveal-delay-1" id="exhibit"><div className="opportunity-media"><img src={technologyAudienceImage} alt="Technology professional exploring a digital exhibition" loading="lazy" /><span>Exhibit</span></div><Cpu size={30} /><h3>Show what you're building</h3><p>Put your products and solutions in front of an audience ready to discover what comes next.</p><a href="#contact">Book exhibition space <ArrowRight size={18} /></a></article>
            <article className="opportunity-card reveal" id="innovation"><div className="opportunity-media"><img src={founderAudienceImage} alt="Nigerian founder presenting an innovative idea" loading="lazy" /><span>Innovate</span></div><Rocket size={30} /><h3>Apply to showcase</h3><p>For startups, innovators and student teams prepared to present ideas with real potential.</p><a href="#contact">Register your interest <ArrowRight size={18} /></a></article>
            <article className="opportunity-card reveal reveal-delay-1" id="career"><div className="opportunity-media"><img src={studentAudienceImage} alt="Emerging Nigerian talent attending a technology forum" loading="lazy" /><span>Talent</span></div><GraduationCap size={30} /><h3>Join the Career & Skills Hub</h3><p>Connect talent, practical skills, employers and meaningful opportunities in one place.</p><a href="#contact">Participate as an employer <ArrowRight size={18} /></a></article>
          </div>
        </section>

        <section className="section speakers-section" id="speakers">
          <div className="container speakers-inner reveal">
            <div><p className="eyebrow eyebrow-light">Voices shaping what's next</p><h2>Insight from the people doing the work.</h2><p>Confirmed speakers and sessions will be announced progressively.</p></div>
            <div className="speaker-showcase">
              <div className="speaker-placeholder-grid" aria-label="Speaker announcements coming soon">
                {["Keynote speaker", "Industry leader", "Policy voice", "Innovation leader"].map((role, index) => (
                  <article className={`speaker-placeholder-card reveal reveal-delay-${(index % 2) + 1}`} key={role}>
                    <div className="speaker-avatar"><UserRound size={42} strokeWidth={1.35} /></div>
                    <span>{role}</span>
                    <strong>To be announced</strong>
                    <small>NDFF 2026</small>
                  </article>
                ))}
              </div>
              <a className="speaker-updates" href="#news">Follow speaker updates <ArrowRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="section partner-section">
          <div className="container section-heading centered"><p className="eyebrow">Our ecosystem</p><h2>Partnership with purpose.</h2><p>Partner identities will appear here as formal approvals and agreements are completed.</p></div>
          <div className="container partner-wall">
            {["Convener", "Chief Host", "Official Technical Partners", "Sponsors", "Strategic Partners", "Media Partners"].map((name) => <div key={name}><span>{name}</span><strong>To be announced</strong></div>)}
          </div>
        </section>

        <section className="section news-section" id="news">
          <div className="container section-heading split-heading"><div><p className="eyebrow">Newsroom</p><h2>Follow the road to NDFF.</h2></div><a className="text-link" href="#contact">Get event updates <ArrowRight size={17} /></a></div>
          <div className="container news-grid">
            {[[collaborationImage, "Forum Update", "Programme announcements are on the way", "The evolving agenda will be published as sessions, stages and speakers are confirmed."], [innovationImage, "Innovation", "Applications opening soon", "Startups, innovators and student teams will be able to express interest in showcasing."], [heroImage, "Partnerships", "Build the future with us", "Sponsorship, technology, institutional and media partnership conversations are now welcome."]].map(([image, type, title, text], index) => <article className={`reveal reveal-delay-${index + 1}`} key={title}><div className={`news-visual news-visual-${index + 1}`}><img src={image} alt="" loading="lazy" /><Radio size={29} /><span>NDFF 2026</span></div><small>{type}</small><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="container contact-grid">
            <div><p className="eyebrow eyebrow-light">Start a conversation</p><h2>How would you like to take part?</h2><p>Tell us what you are interested in and the NDFF team can route your enquiry appropriately.</p></div>
            <form onSubmit={handleEnquiry}>
              <div className="form-row"><label>Full name<input name="name" required placeholder="Your name" /></label><label>Email address<input name="email" type="email" required placeholder="you@organisation.com" /></label></div>
              <div className="form-row"><label>Organisation<input name="organisation" placeholder="Organisation name" /></label><label>Enquiry type<select name="type" defaultValue="" required><option value="" disabled>Select an option</option><option>Registration</option><option>Sponsorship</option><option>Exhibition</option><option>Partnership</option><option>Media</option><option>Innovation / Startup</option><option>Career & Skills</option><option>General enquiry</option></select></label></div>
              <label>Message<textarea name="message" required rows="4" placeholder="Tell us how you would like to participate" /></label>
              <div className="form-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex="-1" autoComplete="off" /></label></div>
              <button className="button button-primary" type="submit" disabled={enquiryStatus === "submitting"}>{enquiryStatus === "submitting" ? "Sending enquiry..." : "Send enquiry"} <ArrowRight size={18} /></button>
              {enquiryStatus === "success" && <p className="form-success" role="status"><Check size={18} /> Thank you. Your enquiry has been sent to the NDFF team.</p>}
              {enquiryStatus === "error" && <p className="form-error" role="alert">{enquiryError}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer><div className="container footer-inner"><div><strong>Nigeria Digital Future Forum</strong><span>Connect. Innovate. Transform.</span></div><div><a href="#about">About</a><a href="#programme">Programme</a><a href="#contact">Contact</a><Link to="/registration">Register</Link></div><p>© 2026 NDFF. All rights reserved.</p></div></footer>
    </div>
  );
}

export default Home;
