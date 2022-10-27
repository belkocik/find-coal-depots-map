import React from "react";
import { useAuth } from "src/auth/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";

interface IProps {
  coalDepot: {
    id: string;
    userId: string;
  };
}

const CoalDepotNav = ({ coalDepot }: IProps) => {
  const { user } = useAuth();
  const canManage = !!user && user.uid === coalDepot.userId;
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
        </>
      ) : null}
    </div>
  );
};

export default CoalDepotNav;
