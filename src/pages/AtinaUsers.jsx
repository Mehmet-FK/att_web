import React, { useEffect } from "react";

import UsersTable from "../components/tables/UsersTable";
import useAtinaCalls from "../hooks/useAtinaCalls";

const AtinaUsers = () => {
  const { getUsersData } = useAtinaCalls();
  useEffect(() => {
    console.log(getUsersData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>Benutzer</h1>
      <UsersTable />
    </>
  );
};

export default AtinaUsers;
