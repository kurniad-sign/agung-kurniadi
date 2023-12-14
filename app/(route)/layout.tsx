import { Footer } from '@/components/shared/footer';
import { Navigation } from '@/components/shared/navigation';
import { PreloaderWrapper } from '@/components/shared/preloader-wrapper';
import { makeNavigationQuery } from '@/sanity/lib/queries';
import { NavigationType } from '@/sanity/types/navigation';

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
