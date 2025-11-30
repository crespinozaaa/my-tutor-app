import { useEffect, useState } from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Tabs from "./layout/Tabs";
import ApiUsers from "./pages/ApiUsers";
import NotFound from "./pages/NotFound";
import { getToken } from "./lib/session";

// --- Ruta privada: solo permite acceso si hay token guardado ---
function PrivateRoute({ component: Component, ...rest }: any) {
  const [ready, setReady] = useState(false);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      setAuth(!!token);
      setReady(true);
    })();
  }, []);

  if (!ready) return null; // puedes poner un spinner si quieres

  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

// --- App principal ---
export default function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>

          {/* Login público */}
          <Route path="/login" component={Login} exact />

          {/* Página que consume API externa */}
          <Route path="/api-users" component={ApiUsers} exact />

          {/* Rutas privadas con tabs */}
          <PrivateRoute path="/app" component={Tabs} />

          {/* Raíz: redirige al home si hay sesión */}
          <Route exact path="/" render={() => <Redirect to="/app/home" />} />

          {/* 404 global (catch-all) */}
          <Route render={() => <NotFound />} />

        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
