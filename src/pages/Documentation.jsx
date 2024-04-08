import { Helmet } from 'react-helmet-async';
import DocumentationView from 'src/sections/documentation/DocumentationView';

// ----------------------------------------------------------------------
function Documentation() {
  return (
    <>
      <Helmet>
        <title> Api Documentation </title>
      </Helmet>
      <DocumentationView />
    </>
  );
}

export default Documentation;
