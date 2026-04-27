'use client';

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="/Logo.png" alt="CEPI Logo" className="logo-img" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Menu1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Menu2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Menu3</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Menu4</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link user-icon" href="#">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="8" r="4"></circle>
                                    <path d="M6 20c0-3.314 2.686-6 6-6s6 2.686 6 6"></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
