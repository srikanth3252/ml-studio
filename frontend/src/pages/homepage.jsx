import React from "react";
import "../styles/homepage.css";

const features = [
  {
    icon: "📊",
    title: "Smart Dataset Analysis",
    description:
      "Upload your dataset and instantly understand its structure, columns, data types, and missing values.",
  },
  {
    icon: "🧹",
    title: "Automated Data Cleaning",
    description:
      "Detect missing values, duplicate records, and data inconsistencies with automated preprocessing.",
  },
  {
    icon: "🤖",
    title: "Multiple ML Models",
    description:
      "Train different machine learning algorithms without writing complex code.",
  },
  {
    icon: "📈",
    title: "Performance Comparison",
    description:
      "Compare model performance using evaluation metrics and visualizations to identify the best model.",
  },
];

const steps = [
  {
    number: "01",
    title: "Upload Dataset",
    description: "Import your CSV dataset into ML Studio.",
  },
  {
    number: "02",
    title: "Explore & Clean",
    description: "Analyze your data and prepare it for machine learning.",
  },
  {
    number: "03",
    title: "Train Models",
    description: "Choose algorithms and train multiple models.",
  },
  {
    number: "04",
    title: "Compare Results",
    description: "Evaluate performance and discover the best model.",
  },
];

function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="brand">
        <span className="brand-icon">M</span>
        <span>ML<span className="brand-accent">Studio</span></span>
      </a>

      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#features">Features</a>
        <a href="#workflow">How it works</a>
      </div>

      <div className="nav-actions">
        <a href="/login" className="login-link">Login</a>
        <a href="/signup" className="nav-button">Get Started <span>→</span></a>
      </div>
    </nav>
  );
}

function DashboardPreview() {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card">
        <div className="dashboard-topbar">
          <div className="window-dots">
            <span></span><span></span><span></span>
          </div>
          <span className="dashboard-label">ML Studio Dashboard</span>
          <span className="dashboard-status">● Live Preview</span>
        </div>

        <div className="dashboard-content">
          <aside className="dashboard-sidebar">
            <div className="sidebar-logo">M</div>
            <div className="sidebar-item active">▦</div>
            <div className="sidebar-item">▤</div>
            <div className="sidebar-item">◈</div>
            <div className="sidebar-item">⌘</div>
            <div className="sidebar-item">⚙</div>
          </aside>

          <div className="dashboard-main">
            <div className="dashboard-heading">
              <div>
                <span className="small-label">WORKSPACE</span>
                <h3>Dashboard Overview</h3>
                <p>Here's what's happening with your dataset.</p>
              </div>
              <span className="date-badge">This Session ▾</span>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-icon purple">▤</span>
                <span className="stat-title">Total Rows</span>
                <strong>2,450</strong>
                <small>Dataset records</small>
              </div>
              <div className="stat-card">
                <span className="stat-icon blue">▦</span>
                <span className="stat-title">Features</span>
                <strong>12</strong>
                <small>Input variables</small>
              </div>
              <div className="stat-card">
                <span className="stat-icon green">◈</span>
                <span className="stat-title">Models Trained</span>
                <strong>04</strong>
                <small>Algorithms tested</small>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h4>Model Performance</h4>
                  <p>Accuracy comparison</p>
                </div>
                <span className="chart-legend"><i></i> Accuracy</span>
              </div>

              <div className="chart-area">
                <div className="chart-y-labels">
                  <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
                </div>
                <div className="chart-plot">
                  <div className="chart-grid-line"></div>
                  <div className="chart-grid-line"></div>
                  <div className="chart-grid-line"></div>
                  <div className="chart-grid-line"></div>
                  <div className="chart-bars">
                    <div className="bar-group">
                      <div className="bar bar-one" style={{ height: "68%" }}></div>
                      <span>Logistic</span>
                    </div>
                    <div className="bar-group">
                      <div className="bar bar-two" style={{ height: "82%" }}></div>
                      <span>Decision Tree</span>
                    </div>
                    <div className="bar-group">
                      <div className="bar bar-three" style={{ height: "91%" }}></div>
                      <span>Random Forest</span>
                    </div>
                    <div className="bar-group">
                      <div className="bar bar-four" style={{ height: "76%" }}></div>
                      <span>SVM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-bottom">
              <div className="bottom-item">
                <span className="bottom-check">✓</span>
                <div><strong>Dataset analyzed</strong><small>Data overview completed</small></div>
              </div>
              <span className="bottom-tag">Ready to train</span>
            </div>
          </div>
        </div>
      </div>

      <div className="floating-card floating-clean">
        <span className="floating-icon">✓</span>
        <div><strong>Automated Cleaning</strong><small>Dataset ready</small></div>
      </div>

      <div className="floating-card floating-model">
        <span className="floating-icon model-icon">↗</span>
        <div><strong>Model Comparison</strong><small>Performance insights</small></div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="homepage">
      <Navbar />

      <main>
        <section className="hero-section" id="home">
          <div className="hero-container">
            <div className="hero-content">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Machine Learning, Simplified
              </div>

              <h1>
                Turn your data into
                <span className="gradient-text"> meaningful insights.</span>
              </h1>

              <p className="hero-description">
                An all-in-one machine learning workspace to explore datasets,
                automate data cleaning, train models, and compare performance —
                without writing complicated code.
              </p>

              <div className="hero-buttons">
                <a href="/signup" className="primary-button">
                  Get Started Free <span>→</span>
                </a>
                <a href="#workflow" className="secondary-button">
                  Explore How It Works <span>↓</span>
                </a>
              </div>

              <div className="hero-trust">
                <span className="trust-check">✓</span>
                No complicated setup
                <span className="trust-separator">·</span>
                Beginner friendly
              </div>
            </div>

            <div className="hero-visual">
              <DashboardPreview />
            </div>
          </div>
        </section>

        <section className="intro-strip">
          <p>
            From raw data to trained models —
            <strong> everything in one workspace.</strong>
          </p>
        </section>

        <section className="features-section section-padding" id="features">
          <div className="section-heading">
            <span className="section-eyebrow">FEATURES</span>
            <h2>Everything you need to<br />build better ML models.</h2>
            <p>
              Simplify your machine learning workflow with tools designed
              to make data science more accessible.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div className="feature-card" key={index}>
                <div className={`feature-icon feature-icon-${index}`}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <span className="feature-arrow">↗</span>
              </div>
            ))}
          </div>
        </section>

        <section className="workflow-section section-padding" id="workflow">
          <div className="section-heading">
            <span className="section-eyebrow">HOW IT WORKS</span>
            <h2>Your machine learning workflow,<br />made simple.</h2>
            <p>Go from dataset to model evaluation in four simple steps.</p>
          </div>

          <div className="workflow-grid">
            {steps.map((step, index) => (
              <div className="workflow-card" key={index}>
                <span className="step-number">{step.number}</span>
                <div className="step-line"></div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <span className="section-eyebrow">START BUILDING</span>
            <h2>Your data has potential.<br />Let's unlock it.</h2>
            <p>Explore your datasets and experiment with machine learning in one place.</p>
            <a href="/signup" className="primary-button cta-button">
              Get Started with ML Studio <span>→</span>
            </a>
          </div>
          <div className="cta-decoration decoration-one"></div>
          <div className="cta-decoration decoration-two"></div>
        </section>
      </main>

      <footer className="footer">
        <a href="/" className="brand footer-brand">
          <span className="brand-icon">M</span>
          <span>ML<span className="brand-accent">Studio</span></span>
        </a>
        <p>Making machine learning accessible to everyone.</p>
        <span className="footer-copy">© 2026 ML Studio. Built with curiosity.</span>
      </footer>
    </div>
  );
}

export default Home;
