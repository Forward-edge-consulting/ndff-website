import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from "lucide-react";
import Navbar from "../Components/Navbar";
import { createRegistration } from "../lib/api";

const passes = [
  ["Government Delegate", "For public-sector officials and institutional representatives.", ["Forum access", "Government–industry dialogue", "Networking sessions"]],
  ["Corporate Professional", "For professionals and representatives of established organisations.", ["Three-day forum access", "Exhibition access", "Professional networking"]],
  ["Startup Founder", "For founders and entrepreneurs building innovative solutions.", ["Forum access", "Startup ecosystem sessions", "Networking opportunities"]],
  ["Student / Young Innovator", "For students and emerging talent entering the technology ecosystem.", ["Student programme access", "Career & Skills Hub", "Innovation activities"]],
  ["Exhibitor", "For organisations showcasing products, platforms and solutions.", ["Exhibition participation", "Delegate access", "Commercial visibility"]],
  ["VIP / Executive", "For senior executives, distinguished guests and invited leaders.", ["Executive access", "Priority experience", "Curated networking"]],
];

function Registration() {
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [selectionError, setSelectionError] = useState("");
  const passSelectionRef = useRef(null);
  const registrationFormRef = useRef(null);

  function scrollTo(element) {
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function selectPass(name) {
    setSelected(name);
    setSelectionError("");
    scrollTo(registrationFormRef.current);
  }

  function promptForPass() {
    if (selected) return;

    setSelectionError("Please select a pass to continue.");
    scrollTo(passSelectionRef.current);
  }

  async function submit(event) {
    event.preventDefault();

    if (!selected) {
      promptForPass();
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    setSubmissionError("");

    try {
      await createRegistration({
        pass_type: selected,
        full_name: data.get("full_name"),
        email: data.get("email"),
        phone: data.get("phone"),
        organisation: data.get("organisation"),
        website: data.get("website"),
      });
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmissionError(error.message || "Your registration could not be submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="registration-page">
      <Navbar />
      <main>
        <section className="registration-hero">
          <div className="container">
            <Link className="back-link" to="/"><ArrowLeft size={17} /> Back to the forum</Link>
            <p className="eyebrow eyebrow-light">Attend NDFF 2026</p>
            <h1>Choose the pass built for you.</h1>
            <p>Join leaders, innovators, professionals, entrepreneurs and emerging talent shaping Nigeria's digital future.</p>
          </div>
        </section>

        {submitted ? (
          <section className="container registration-success">
            <CheckCircle2 size={48} /><h2>Your interest has been recorded.</h2>
            <p>The NDFF registration team will share approved pricing and next steps when registration opens.</p>
            <Link className="button button-primary" to="/">Return home <ArrowRight size={18} /></Link>
          </section>
        ) : (
          <section className="section registration-content">
            <div className="container section-heading centered pass-selection" ref={passSelectionRef}>
              <p className="eyebrow">Access categories</p><h2>Select your NDFF experience.</h2><p>Prices will be published after commercial approval.</p>
              {selectionError && <p className="pass-selection-error" role="alert">{selectionError}</p>}
            </div>
            <div className="container pass-grid">
              {passes.map(([name, description, benefits]) => (
                <button className={`pass-card ${selected === name ? "selected" : ""}`} type="button" key={name} onClick={() => selectPass(name)} aria-pressed={selected === name}>
                  <div><span className="pass-status">{selected === name ? <CheckCircle2 size={22} /> : "Select"}</span><small>Pricing to be announced</small></div>
                  <h3>{name}</h3><p>{description}</p>
                  <ul>{benefits.map((benefit) => <li key={benefit}><Check size={16} />{benefit}</li>)}</ul>
                </button>
              ))}
            </div>
            <div className="container registration-form-wrap" ref={registrationFormRef}>
              <div><p className="eyebrow">Register your interest</p><h2>{selected || "Choose a pass above"}</h2><p>Complete your details to receive ticket and payment information when the selected category opens.</p></div>
              <form onSubmit={submit}>
                <input type="hidden" name="pass" value={selected} />
                <label>Full name<input name="full_name" required placeholder="Your full name" /></label>
                <label>Email address<input name="email" required type="email" placeholder="you@example.com" /></label>
                <label>Phone number<input name="phone" required type="tel" placeholder="+234" /></label>
                <label>Organisation / institution<input name="organisation" placeholder="Organisation name" /></label>
                <div className="form-honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex="-1" autoComplete="off" /></label></div>
                <button className="button button-primary" type="submit" disabled={submitting} onClick={promptForPass}>{submitting ? "Submitting..." : selected ? "Register interest" : "Choose a pass to continue"} <ArrowRight size={18} /></button>
                {submissionError && <p className="form-error" role="alert">{submissionError}</p>}
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Registration;
