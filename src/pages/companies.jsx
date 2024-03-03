import { Helmet } from 'react-helmet-async';

import { CompaniesView } from 'src/sections/companies/view';

// ----------------------------------------------------------------------

export default function CompaniesPage() {
  return (
    <>
      <Helmet>
        <title> Coompanies </title>
      </Helmet>

      <CompaniesView />
    </>
  );
}
