import React from 'react';
import {Redirect} from '@docusaurus/router';

export default function DocsIndexPage(): JSX.Element {
  return <Redirect to="/docs/legal/privacy_policy/" />;
}
