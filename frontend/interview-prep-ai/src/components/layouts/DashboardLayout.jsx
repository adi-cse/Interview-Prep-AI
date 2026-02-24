import React, { useContext } from 'react';
import { UserContext } from '../../Context/userContext';
import Navbar from '../../components/layouts/Navbar';

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <style>{`
        .dl-root {
          min-height: 100vh;
          background: #FFFCEF;
          display: flex;
          flex-direction: column;
        }

        .dl-content {
          flex: 1;
          width: 100%;
        }
      `}</style>

      <div className="dl-root">
        <Navbar />
        {user && (
          <div className="dl-content">
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardLayout;