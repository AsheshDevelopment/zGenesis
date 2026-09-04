import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

const principles = [
  ['01', 'Classic gameplay', 'Preserve the familiar movement, combat, progression, atmosphere and social experience.'],
  ['02', 'Modern functions', 'Add modern quality-of-life features and a more dependable experience without losing its identity.'],
  ['03', 'New online foundation', 'Introduce new network handling and server improvements for stability, responsiveness and growth.'],
  ['04', 'A broader world', 'Build new maps and target Windows, Linux, macOS, iPhone and Android from one shared vision.'],
];

export default function About(): ReactNode {
  const genesisImage = useBaseUrl('/img/genesis-sanketa-background.jpg');

  return (
    <Layout
      title="About"
      description="About GENESIS and its first chapter, Sanketa I : Kali Agamana.">
      <main className="game-site game-inner-page">
        <section className="game-page-hero">
          <div
            className="game-page-hero__emblem"
            style={{backgroundImage: `linear-gradient(90deg, #0b0807, transparent 35%), url(${genesisImage})`}}
            aria-hidden="true"
          />
          <div className="game-shell game-page-hero__content">
            <p className="game-kicker">SANKETA I : KALI AGAMANA</p>
            <h1>Bringing you a new legend.</h1>
            <p>
              From the developer who played a key part in making
              Kathana&apos;s new engine possible comes GENESIS—a completely new
              journey written from the ground up on zEngine.
            </p>
          </div>
        </section>

        <section className="game-section">
          <div className="game-shell game-about-grid">
            <div className="game-about-copy">
              <p className="game-kicker">THE VISION</p>
              <h2>Preserve the soul. Strengthen the foundation.</h2>
              <p>
                Every system and line of code behind GENESIS is new. Only
                classic game assets—such as models and textures—are reused,
                preserving a recognisable visual identity while the gameplay
                foundation is rebuilt for a modern future.
              </p>
              <p>
                The new foundation introduces modern functions, new network
                handling, server improvements and additional maps. Its
                cross-platform direction includes Windows, Linux, macOS,
                iPhone (iOS) and Android.
              </p>
            </div>
            <aside className="game-engine-card">
              <span className="game-engine-card__label">THE NEW FOUNDATION</span>
              <strong>zEngine</strong>
              <p>A complete ground-up rewrite for a classic world with a modern future.</p>
            </aside>
          </div>
        </section>

        <section className="game-section game-section--raised">
          <div className="game-shell">
            <header className="game-section__heading game-section__heading--left">
              <p className="game-kicker">DEVELOPMENT PRINCIPLES</p>
              <h2>What guides the journey</h2>
            </header>
            <div className="game-principle-grid">
              {principles.map(([number, title, copy]) => (
                <article className="game-principle" key={number}>
                  <span>{number}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="game-section game-cta">
          <div className="game-shell game-cta__inner">
            <div><p className="game-kicker">FOLLOW THE WORK</p><h2>Explore the public roadmap.</h2></div>
            <Link className="game-button game-button--primary" to="/roadmap">View roadmap</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
