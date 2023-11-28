import { ArrowRight } from 'lucide-react';

import { HomeQueryType } from '@/sanity/lib/queries';

export function Home({ data }: { data: HomeQueryType }) {
  const { about, hero, project_list, skills } = data;

  return (
    <main>
      <section className="section section--hero">
        <h1 className="hero__title">{hero.title}</h1>
        <p className="hero__description">{hero.description}</p>
        <span className="hero__scroll-text">{hero.scroll_text}</span>
      </section>
      <section className="section section--about">
        <div>
          <ArrowRight size={60} />
        </div>

        <div>
          <h2 className="about__title">{about.title}</h2>
          <p className="about__description">{about.description}</p>
        </div>
      </section>
    </main>
  );
}
