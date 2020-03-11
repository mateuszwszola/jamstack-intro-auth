import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { navigate } from 'gatsby';
import IdentityModal, {
  useIdentityContext
} from 'react-netlify-identity-widget';
import Layout from '../components/layout';
import Profile from '../components/profile';
import PrivateRoute from '../components/private-route';

const SecretContent = () => <h1>Super secret content!</h1>;
const BaseContent = () => <h1>SuperBase Content</h1>;

const Login = ({ openLogin }) => {
  const identity = useIdentityContext();

  if (identity && identity.isLoggedIn) {
    navigate('/dashboard/secret', { replace: true });
  }

  return (
    <>
      <h1>Log In or Sign Up</h1>
      <button onClick={openLogin}>Log In</button>
    </>
  );
};

const Dashboard = ({ location }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);

  useEffect(() => {
    if (location.pathname.match(/^\/dashboard\/?$/)) {
      navigate('/dashboard/login', { replace: true });
    }
  }, [location.pathname]);

  return (
    <Layout>
      <Profile showModal={showModal} />
      <Router>
        <Login path="/dashboard/login" openLogin={showModal} />
        <PrivateRoute path="/dashboard/secret" component={SecretContent} />
        <PrivateRoute path="/dashboard/base" component={BaseContent} />
      </Router>
      <IdentityModal
        showDialog={isModalOpen}
        onCloseDialog={() => setIsModalOpen(false)}
      />
    </Layout>
  );
};

export default Dashboard;
