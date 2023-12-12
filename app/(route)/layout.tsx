import { Navigation } from '@/components/shared/navigation';
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
      <Navigation data={navigation} />
      {children}
    </>
  );
}
