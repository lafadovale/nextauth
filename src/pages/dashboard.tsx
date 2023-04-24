import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/Authcontext";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { api } from "@/services/apiClient";
import { setupAPIClient } from "@/services/api";
import {} from "next";
import { useCan } from "@/hooks/useCan";
import { Can } from "@/components/Can";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      <Can permissions={["metrics.list"]}>
        <div>Métricas</div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get("/me");

  console.log(response.data);

  return {
    props: {},
  };
});
