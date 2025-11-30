import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";

import Home from "../pages/Home";
import Search from "../pages/Search";
import Sessions from "../pages/Sessions";
import Profile from "../pages/Profile";

import {
  homeOutline,
  searchOutline,
  calendarOutline,
  personCircleOutline,
} from "ionicons/icons";

export default function Tabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/home" component={Home} exact />
        <Route path="/app/search" component={Search} exact />
        <Route path="/app/sessions" component={Sessions} exact />
        <Route path="/app/profile" component={Profile} exact />

        {/* si entras a /app, va a /app/home */}
        <Redirect exact from="/app" to="/app/home" />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/app/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="search" href="/app/search">
          <IonIcon icon={searchOutline} />
          <IonLabel>Buscar</IonLabel>
        </IonTabButton>

        <IonTabButton tab="sessions" href="/app/sessions">
          <IonIcon icon={calendarOutline} />
          <IonLabel>Sesiones</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile" href="/app/profile">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

