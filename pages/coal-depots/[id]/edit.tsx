import { GetServerSideProps, NextApiRequest } from "next";
import { useRouter } from "next/router";
import { loadIdToken } from "src/auth/firebaseAdmin";
import CoalDepotForm from "src/components/CoalDepotForm";
import { useAuth } from "src/auth/useAuth";
import { useEditCoalDepotQuery } from "../../../generated/graphql";

const EditCoalDepot = () => {
  const {
    query: { id },
  } = useRouter();
  if (!id) return null;

  return <CoalDepotData id={id as string} />;
};

export default EditCoalDepot;

function CoalDepotData({ id }: { id: string }) {
  const { user } = useAuth();
  const { data, loading } = useEditCoalDepotQuery({ variables: { id } });

  if (!user) return <p>Zaloguj się aby edytować</p>;
  if (loading) return <p>Loading...</p>;
  if (data && !data.coalDepot)
    return <p>Nie udało się załadować składu opału</p>;
  if (user.uid !== data?.coalDepot?.userId)
    return <p>Nie masz uprawnień aby edytować</p>;
  // TODO: finish edit coal depot
  return <CoalDepotForm coalDepot={data.coalDepot} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (!uid) {
    res.setHeader("location", "/auth");
    res.statusCode = 302;
    res.end();
  }

  return { props: {} };
};
