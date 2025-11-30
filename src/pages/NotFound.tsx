import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonText,
} from "@ionic/react";
import { homeOutline } from "ionicons/icons";

export default function NotFound() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Error 404</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        className="ion-padding"
        style={{
          backgroundColor: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", color: "#f9fafb" }}>
          <h1 style={{ marginBottom: 8, fontSize: "2rem" }}>404</h1>
          <IonText>
            <p style={{ marginTop: 0, marginBottom: 16 }}>
              La página que intentaste abrir no existe.
            </p>
          </IonText>
          <IonButton routerLink="/app/home" color="secondary">
            <IonIcon slot="start" icon={homeOutline} />
            Volver al inicio
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
