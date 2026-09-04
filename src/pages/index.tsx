import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

const pillars = [
  {
    marker: 'I',
    title: 'A world reborn',
    copy: 'Return to a mythic realm shaped by ancient tribes, sacred powers and conflicts that demand courage and cooperation.',
  },
  {
    marker: 'II',
    title: 'Built for the journey',
    copy: 'zEngine is being developed around the identity, atmosphere and moment-to-moment experience of Tantra Genesis: RE.',
  },
  {
    marker: 'III',
    title: 'Progress in public',
    copy: 'Follow each major workstream from active development through its evidence-based closed-beta completion gate.',
  },
];

export default function Home(): ReactNode {
  const genesisImage = useBaseUrl('/img/genesis-loading.bmp');

  return (
    <Layout
      title="Home"
      description="Tantra Genesis: RE, powered by zEngine from Ashesh Development.">
      <main className="game-site">
        <section className="game-hero" style={{backgroundImage: `url(${genesisImage})`}}>
          <div className="game-hero__veil" aria-hidden="true" />
          <div className="game-shell game-hero__content">
            <p className="game-kicker">ASHESH DEVELOPMENT PRESENTS</p>
            <h1>Tantra Genesis: RE</h1>
            <p className="game-hero__lead">
              The legend begins again on zEngine—a new engine developed by
              Ashesh Development.
            </p>
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
              <p className="game-kicker">THE NEXT CHAPTER</p>
              <h2>A faithful world. A new foundation.</h2>
              <p>
                The project preserves the recognisable spirit of Tantra while
                building a stable, supportable foundation for its future.
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
