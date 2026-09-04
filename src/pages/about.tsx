import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';

const principles = [
  ['01', 'Faithful identity', 'Preserve the atmosphere, world and recognisable experience that define Tantra.'],
  ['02', 'Evidence-led progress', 'Advance each area only when its visible result and completion requirements can be verified.'],
  ['03', 'A durable foundation', 'Build zEngine as a stable base for a supportable game and a dependable closed beta.'],
  ['04', 'A focused release', 'Prioritise a coherent starting experience before expanding the boundaries of the world.'],
];

export default function About(): ReactNode {
  const genesisImage = useBaseUrl('/img/genesis-loading.bmp');

  return (
    <Layout
      title="About"
      description="About Tantra Genesis: RE and the zEngine vision from Ashesh Development.">
      <main className="game-site game-inner-page">
        <section className="game-page-hero">
          <div
            className="game-page-hero__emblem"
            style={{backgroundImage: `linear-gradient(90deg, #0b0807, transparent 35%), url(${genesisImage})`}}
            aria-hidden="true"
          />
          <div className="game-shell game-page-hero__content">
            <p className="game-kicker">ABOUT THE PROJECT</p>
            <h1>A legend reconstructed for a new era.</h1>
            <p>
              Tantra Genesis: RE is a focused revival built on zEngine, a new
              game engine developed by Ashesh Development.
            </p>
          </div>
        </section>

        <section className="game-section">
          <div className="game-shell game-about-grid">
            <div className="game-about-copy">
              <p className="game-kicker">THE VISION</p>
              <h2>Preserve the soul. Strengthen the foundation.</h2>
              <p>
                The project is guided by the feel of the original world: its
                tribes, environments, progression and social adventure. The aim
                is not simply to reproduce individual screens, but to rebuild a
                complete and dependable experience around them.
              </p>
              <p>
                Development begins with the path every player experiences—entry,
                character creation, world arrival, movement, interaction and
                combat—then expands through the systems required for a stable
                closed beta.
              </p>
            </div>
            <aside className="game-engine-card">
              <span className="game-engine-card__label">POWERED BY</span>
              <strong>zEngine</strong>
              <p>A new game engine developed by Ashesh Development.</p>
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
