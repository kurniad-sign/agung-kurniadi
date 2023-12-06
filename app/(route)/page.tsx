import { makeHomeQuery } from '@/sanity/lib/queries';
import { HomeQueryType } from '@/sanity/lib/types';

import { Home } from './components/home';

export default async function Homepage() {
  const homeDataQuery = await makeHomeQuery();

  return <Home data={homeDataQuery as HomeQueryType} />;
}
