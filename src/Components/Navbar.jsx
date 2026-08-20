import logo from "../assets/Nigeria_digital_future_forem.jpg";
function Navbar(){
    return(
        <nav>
            <div className="logo">
              <img src={logo} alt="Nigeria_digital_future_forem.jpg" />
            </div>
            <div className="nav-links">
                <a href="/">Home</a>
                  <a href="/about">About</a>
                    <a href="/Programme">Programme</a>
                      <a href="/Speakers">Speakers</a>
                        <a href="/Sponsors">Sponsors</a>
                          <a href="Exhibition">Exhibition</a>
                          <a href="/regristration" className="register-btn">Registration Now</a>

            </div>
        </nav>

    );
}
export default Navbar;