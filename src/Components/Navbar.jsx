import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/ndff-official-logo.jpeg";

const links = [
  ["About", "#about"],
  ["Programme", "#programme"],
  ["Speakers", "#speakers"],
  ["Attend", "#attend"],
  ["Exhibit", "#exhibit"],
  ["Sponsor", "#sponsor"],
  ["Innovation", "#innovation"],
  ["Career & Skills", "#career"],
  ["News", "#news"],
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Main navigation">
        <Link className="brand" to="/" aria-label="NDFF home" onClick={() => setOpen(false)}>
          <img src={logo} alt="Nigeria Digital Future Forum" />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>

        <div className={`nav-panel ${open ? "is-open" : ""}`}>
          <div className="nav-links">
            {links.map(([label, href]) => (
              <a key={href} href={`/${href}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </div>
          <Link className="button button-primary nav-register" to="/registration" onClick={() => setOpen(false)}>
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
