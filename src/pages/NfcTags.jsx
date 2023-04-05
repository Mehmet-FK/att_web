import React, { useEffect } from "react";

import NfcTable from "../components/tables/NfcTable";
import useAtinaCalls from "../hooks/useAtinaCalls";

const NfcTags = () => {
  const { getNfcTagsData } = useAtinaCalls();
  useEffect(() => {
    getNfcTagsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>NFC Tags</h1>
      <NfcTable />
    </>
  );
};

export default NfcTags;
