import useSWR from "swr";

async function fetchStatus() {
  const response = await fetch("/api/v1/status");
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  const response = useSWR("status", fetchStatus, {
    refreshInterval: 2000,
    dedupingInterval: 2000,
  });

  function Status() {
    if (!response.isLoading && response.data) {
      const status = response.data;
      return (
        <>
          <div>
            <spam>UpdatedAt: {status ? status.updated_at : ""}</spam>
          </div>
        </>
      );
    }
  }

  function DatabaseInformation() {
    if (!response.isLoading && response.data) {
      const status = response.data;
      return (
        <>
          <div>
            <div>
              <spam>
                Version: {status ? status.dependencies.database.version : ""}
              </spam>
            </div>
            <div>
              <spam>
                Max connections:{" "}
                {status ? status.dependencies.database.max_connections : ""}
              </spam>
            </div>
            <div>
              <spam>
                Openned connections:{" "}
                {status ? status.dependencies.database.opened_connections : ""}
              </spam>
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <>
      <h1>Status</h1>
      <Status />
      <h2>Database:</h2>
      <DatabaseInformation />
    </>
  );
}
