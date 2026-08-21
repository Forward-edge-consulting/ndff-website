function Registration() {
  return (
    <main className="registration-page">
      <section className="registration-hero">
        <h1>Register for NDFF 2026</h1>
        <p>
          Join leaders, innovators, professionals, entrepreneurs and emerging
          talent shaping Nigeria's digital future.
        </p>
      </section>

      <section className="pass-section">
        <h2>Choose Your Pass</h2>

        <div className="pass-cards">
          <div className="pass-card">
            <h3>Government Delegate</h3>
            <p>
              For government officials and public-sector representatives.
            </p>
            <button>Select Pass</button>
          </div>

          <div className="pass-card">
            <h3>Corporate Professional</h3>
            <p>
              For professionals and representatives from established
              organizations.
            </p>
            <button>Select Pass</button>
          </div>

          <div className="pass-card">
            <h3>Startup Founder</h3>
            <p>
              For founders and entrepreneurs building innovative solutions.
            </p>
            <button>Select Pass</button>
          </div>

          <div className="pass-card">
            <h3>Student / Young Innovator</h3>
            <p>
              For students and emerging innovators interested in technology
              and digital transformation.
            </p>
            <button>Select Pass</button>
          </div>

          <div className="pass-card">
            <h3>Exhibitor</h3>
            <p>
              For organizations and businesses showcasing products and
              solutions.
            </p>
            <button>Select Pass</button>
          </div>

          <div className="pass-card">
            <h3>VIP / Executive</h3>
            <p>
              For senior executives, special guests and distinguished
              participants.
            </p>
            <button>Select Pass</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Registration;