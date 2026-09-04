import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

const pillars = [
  {
    marker: 'I',
    title: 'Built from the ground up',
    copy: 'GENESIS is a complete rewrite developed on zEngine as a new foundation for the entire experience.',
  },
  {
    marker: 'II',
    title: 'Classic at its heart',
    copy: 'The familiar gameplay, atmosphere and social adventure remain at the centre, supported by modern functions.',
  },
  {
    marker: 'III',
    title: 'A stronger online world',
    copy: 'New network handling and server improvements are designed to support a more stable, responsive journey.',
  },
  {
    marker: 'IV',
    title: 'Expanded everywhere',
    copy: 'New maps will broaden the world, with Windows, Linux, macOS, iPhone and Android included in the platform vision.',
  },
];

export default function Home(): ReactNode {
  const genesisImage = useBaseUrl('/img/genesis-sanketa-background.jpg');

  return (
    <Layout
      title="Home"
      description="GENESIS — Sanketa I : Kali Agamana.">
      <main className="game-site">
        <section className="game-hero" style={{backgroundImage: `url(${genesisImage})`}}>
          <div className="game-hero__veil" aria-hidden="true" />
          <div className="game-shell game-hero__content">
            <p className="game-kicker">THE FIRST CHAPTER</p>
            <h1>GENESIS</h1>
            <p className="game-hero__chapter">Sanketa I : Kali Agamana</p>
            <p className="game-hero__lead">The age of darkness approaches. A new legend begins.</p>
            <div className="game-actions">
              <Link className="game-button game-button--primary" to="/roadmap">
                View the roadmap
              </Link>
              <Link className="game-button game-button--secondary" to="/about">
                Discover the project
              </Link>
            </div>
          </div>
          <a className="game-scroll-cue" href="#vision" aria-label="Continue to project vision">
            <span>Explore</span>
          </a>
        </section>

        <section className="game-section game-section--raised" id="vision">
          <div className="game-shell">
            <header className="game-section__heading">
              <p className="game-kicker">A NEW WORLD BEGINS</p>
              <h2>Bringing you GENESIS.</h2>
              <p>
                From the developer who played a key part in making
                Kathana&apos;s new engine possible comes a completely new
                experience. Every system and line of code is being written from
                the ground up on zEngine. Only classic game assets—such as
                models and textures—are reused to preserve the world&apos;s
                recognisable identity.
              </p>
            </header>
            <div className="game-pillar-grid">
              {pillars.map((pillar) => (
                <article className="game-pillar" key={pillar.title}>
                  <span className="game-pillar__marker">{pillar.marker}</span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="game-section game-cta">
          <div className="game-shell game-cta__inner">
            <div>
              <p className="game-kicker">DEVELOPMENT ROADMAP</p>
              <h2>See what is ready—and what comes next.</h2>
            </div>
            <Link className="game-button game-button--primary" to="/roadmap">
              Explore progress
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
