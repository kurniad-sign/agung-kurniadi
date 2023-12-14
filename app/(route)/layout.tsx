import { Metadata } from 'next';
import { q } from 'groqd';

import { Footer } from '@/components/shared/footer';
import { Navigation } from '@/components/shared/navigation';
import { PreloaderWrapper } from '@/components/shared/preloader-wrapper';
import { makeNavigationQuery } from '@/sanity/lib/queries';
import { runQuery, urlForOpenGraphImage } from '@/sanity/lib/utils';
import { NavigationType } from '@/sanity/types/navigation';

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await runQuery(
    q('*').filter('_type == "home"').slice(1).grab$({
      title: q.string(),
      overview: q.string(),
    })
  );

  const ogGraph = await runQuery(
    q('*')
      .filter('_type == "settings"')
      .slice(0)
      .grab$({
        ogImage: q.sanityImage('ogImage', { withHotpot: true }),
      })
  );

  return {
    title: metadata.title,
    description: metadata.overview,
    openGraph: {
      images: urlForOpenGraphImage(ogGraph.ogImage),
    },
  };
}

export default async function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = (await makeNavigationQuery()) as NavigationType;

  return (
    <>
      <PreloaderWrapper>
        <Navigation data={navigation} />
        {children}
        <Footer />
      </PreloaderWrapper>
    </>
  );
}
