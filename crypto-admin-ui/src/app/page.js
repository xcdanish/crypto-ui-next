// project import
import MinimalLayout from 'layout/MinimalLayout';
import Landing from 'views/landing';
import Landing2 from 'views/authentication/auth2/login.js';

// ==============================|| HOME PAGE ||============================== //

export default function HomePage() {
  return (
    <MinimalLayout>
      <Landing2 />
    </MinimalLayout>
  );
}
