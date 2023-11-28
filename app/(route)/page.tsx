import { homeQuery, runQuery } from '@/sanity/lib/queries';

import { Home } from './components/home';

export default async function Homepage() {
  const homeData = await runQuery(homeQuery);

  return <Home data={homeData} />;
}
