function Navbar(){
    return(
        <nav>
            <div className="logo">

            </div>
            <div className="nav-links">
                <a href="/">Home</a>
                  <a href="/about">About</a>
                    <a href="/Programme">Programme</a>
                      <a href="/Speakers">Speakers</a>
                        <a href="/Sponsors">Sponsors</a>
                          <a href="Exhibition">Exhibition</a>
                          <a href="/regristration" className="register-btn">Regristration Now</a>

            </div>
        </nav>

    );
}
export default Navbar;