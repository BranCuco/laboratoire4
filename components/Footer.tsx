'use client';

export const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="social-links d-flex justify-content-center mb-3">
                            <a href="#" className="text-light me-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a6 6 0 0 0-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 0 1 2-2h3z"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-light me-3">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                                </svg>
                            </a>
                            <a href="#" className="text-light">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        </div>
                        <p className="mb-2">Centre d'Expertise et de Perfectionnement en Informatique</p>
                        <p className="mb-0">© 2026</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
