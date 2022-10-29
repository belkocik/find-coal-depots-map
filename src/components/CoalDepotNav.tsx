import React from "react";
import { useAuth } from "src/auth/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import { useDeleteCoalDepotMutation } from "generated/graphql";

interface IProps {
  coalDepot: {
    id: string;
    userId: string;
  };
}

const CoalDepotNav = ({ coalDepot }: IProps) => {
  const router = useRouter();
  const { user } = useAuth();
  const canManage = !!user && user.uid === coalDepot.userId;

  const [deleteCoalDepot, { loading }] = useDeleteCoalDepotMutation();

  return (
    <div className="p-2">
      <Link href="/">
        <a>Mapa</a>
      </Link>
      {canManage ? (
        <>
          {" | "}
          <Link href={`/coal-depots/${coalDepot.id}/edit`}>
            <a>Edytuj</a>
          </Link>
          {" | "}
          <button
            disabled={loading}
            type="button"
            onClick={async () => {
              if (confirm("Na pewno chcesz usunąć ten skład opału?")) {
                await deleteCoalDepot({ variables: { id: coalDepot.id } });
                router.push("/");
              }
            }}
          >
            Usuń
          </button>
        </>
      ) : null}
    </div>
  );
};

export default CoalDepotNav;
