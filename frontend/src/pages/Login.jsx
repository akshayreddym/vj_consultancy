import React from 'react';
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {

        try {

            await login(credentialResponse);

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

        }

    };

    const handleNavClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="login-page-container">
            {/* Top Navbar */}
            <nav className="login-navbar">
                <div className="navbar-logo">
                    <span className="navbar-logo-purple">VJ</span> Consultancy Platform
                </div>
                <ul className="navbar-menu">
                    <li><a href="#hero" className="navbar-menu-link" onClick={(e) => handleNavClick(e, 'hero')}>Home</a></li>
                    <li><a href="#features" className="navbar-menu-link" onClick={(e) => handleNavClick(e, 'features')}>Features</a></li>
                    <li><a href="#about" className="navbar-menu-link" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
                    <li><a href="#contact" className="navbar-menu-link" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
                </ul>
            </nav>

            {/* Split Main Body (Hero Section) */}
            <main className="login-main-body" id="hero">
                {/* Left Side: Marketing Section */}
                <section className="login-left-section">
                    <span className="marketing-badge">Empowering Student Consultancy</span>
                    <h2 className="marketing-heading">
                        Connect.<br />
                        Collaborate.<br />
                        Build <span>Careers.</span>
                    </h2>
                    <p className="marketing-description">
                        VJ Consultancy Platform helps students, coordinators and project sourcers collaborate efficiently while managing real-world consultancy projects.
                    </p>

                    <div className="marketing-features">
                        {/* Card 1 */}
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <div className="feature-info">
                                <h4 className="feature-title">Team Collaboration</h4>
                                <p className="feature-desc">Connect students and coordinators to collaborate on project deliverables.</p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="20" x2="18" y2="10" />
                                    <line x1="12" y1="20" x2="12" y2="4" />
                                    <line x1="6" y1="20" x2="6" y2="14" />
                                </svg>
                            </div>
                            <div className="feature-info">
                                <h4 className="feature-title">Project Tracking</h4>
                                <p className="feature-desc">Monitor milestones, phases, submissions and grading in real-time.</p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="feature-card">
                            <div className="feature-icon-wrapper">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                                </svg>
                            </div>
                            <div className="feature-info">
                                <h4 className="feature-title">Secure Authentication</h4>
                                <p className="feature-desc">Safe login with institutional single-sign-on credentials.</p>
                            </div>
                        </div>
                    </div>

                    {/* Analytics Card */}
                    <div className="analytics-card">
                        <div className="analytics-stats-row">
                            <div className="analytics-stat-item">
                                <span className="analytics-stat-val">250+</span>
                                <span className="analytics-stat-lbl">Completed Projects</span>
                            </div>
                            <div className="analytics-stat-item">
                                <span className="analytics-stat-val">500+</span>
                                <span className="analytics-stat-lbl">Active Students</span>
                            </div>
                        </div>
                        <div className="analytics-chart-container">
                            <svg viewBox="0 0 300 60" width="100%" height="60" style={{ overflow: 'visible' }}>
                                <defs>
                                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.15}/>
                                        <stop offset="100%" stopColor="#7C3AED" stopOpacity={0.0}/>
                                    </linearGradient>
                                </defs>
                                <path d="M 0 50 L 50 42 L 100 45 L 150 25 L 200 35 L 250 15 L 300 5 L 300 60 L 0 60 Z" fill="url(#chartGrad)" />
                                <path d="M 0 50 L 50 42 L 100 45 L 150 25 L 200 35 L 250 15 L 300 5" fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <circle cx="300" cy="5" r="4" fill="#7C3AED" />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Right Side: Login Card */}
                <section className="login-right-section">
                    <div className="login-auth-card">
                        <div className="card-top-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        </div>
                        <h3 className="card-title-text">Welcome Back</h3>
                        <p className="card-subtitle-text">Continue with your college Google account.</p>

                        <div className="oauth-btn-wrapper">
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={() => console.log("Login Failed")}
                            />
                        </div>

                        <div className="login-divider-row">
                            <div className="divider-line"></div>
                            <span className="divider-text">or</span>
                            <div className="divider-line"></div>
                        </div>

                        <div className="security-badge-row">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="security-icon">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                            <span className="security-text">Secure authentication powered by Google OAuth</span>
                        </div>
                    </div>
                </section>
            </main>

            {/* Features Section */}
            <section className="login-features-section" id="features">
                <div className="section-container">
                    <h3 className="section-title">Why Choose VJ Consultancy?</h3>
                    <div className="features-grid">
                        <div className="feature-item-card">
                            <div className="feature-item-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                    <circle cx="9" cy="7" r="4" />
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                </svg>
                            </div>
                            <h4 className="feature-item-title">Student Collaboration</h4>
                            <p className="feature-item-desc">Work closely with peers and advisors on real-world consultancy deliverables.</p>
                        </div>
                        <div className="feature-item-card">
                            <div className="feature-item-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                                </svg>
                            </div>
                            <h4 className="feature-item-title">Project Tracking</h4>
                            <p className="feature-item-desc">Track tasks, deadlines, milestones, and progress all in one dashboard.</p>
                        </div>
                        <div className="feature-item-card">
                            <div className="feature-item-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    <path d="m9 12 2 2 4-4" />
                                </svg>
                            </div>
                            <h4 className="feature-item-title">Secure Google Authentication</h4>
                            <p className="feature-item-desc">Log in securely using your institutional Gmail identity via single sign-on.</p>
                        </div>
                        <div className="feature-item-card">
                            <div className="feature-item-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="9" />
                                    <rect x="14" y="3" width="7" height="5" />
                                    <rect x="14" y="12" width="7" height="9" />
                                    <rect x="3" y="16" width="7" height="5" />
                                </svg>
                            </div>
                            <h4 className="feature-item-title">Role-Based Dashboard</h4>
                            <p className="feature-item-desc">Dedicated dashboard workflows personalized for students, coordinators, and sourcers.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="login-about-section" id="about">
                <div className="section-container">
                    <h3 className="section-title">About VJ Consultancy Platform</h3>
                    <p className="about-description">
                        The platform connects Students, Coordinators, and Project Sourcers to collaborate on consultancy projects.
                    </p>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Students</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number">150+</span>
                            <span className="stat-label">Projects</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-number">95%</span>
                            <span className="stat-label">Success Rate</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="login-contact-section" id="contact">
                <div className="section-container">
                    <h3 className="section-title">Get in Touch</h3>
                    <div className="contact-info-grid">
                        <div className="contact-card">
                            <div className="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                            </div>
                            <h5 className="contact-label">Email</h5>
                            <p className="contact-value">support@vjconsultancy.edu</p>
                        </div>
                        <div className="contact-card">
                            <div className="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <h5 className="contact-label">Phone</h5>
                            <p className="contact-value">+91 (022) 2419 8200</p>
                        </div>
                        <div className="contact-card">
                            <div className="contact-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <h5 className="contact-label">College Address</h5>
                            <p className="contact-value">VJTI Campus, Matunga, Mumbai, Maharashtra 400019</p>
                        </div>
                    </div>
                </div>
                <footer className="login-footer">
                    <p>© 2026 VJ Consultancy Platform. All rights reserved.</p>
                </footer>
            </section>
        </div>
    );

}

export default Login;