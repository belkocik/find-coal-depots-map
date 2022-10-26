import {
  useEffect,
  useState,
  useContext,
  createContext,
  FC,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import "firebase/auth";
import initFirebase from "./initFirebase";
import { removeTokenCookie, setTokenCookie } from "./tokenCookies";
import { User, signOut, getAuth, onAuthStateChanged } from "firebase/auth";

interface IAuthContext {
  user: User | null;
  logout: () => void;
  authenticated: boolean;
}

interface IAuthProviderProps {
  children: ReactNode;
}

initFirebase();

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
});

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const auth = getAuth();
  // console.log("auth:", auth);
  // console.log("user", user);

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const cancelAuthListener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setTokenCookie(token);
        setUser(user);
      } else {
        removeTokenCookie();
        setUser(null);
      }
    });

    return () => {
      cancelAuthListener();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, authenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
