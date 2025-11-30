
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import TutorCard from "../components/TutorCard";
import { TUTORES } from "../mock/tutors";
import { IonButton } from "@ionic/react";
// …
<IonButton routerLink="/api-users" fill="outline">Ver usuarios (API externa)</IonButton>

export default function Home() {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle>Red de Tutorías</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <h2 style={{ marginTop: 12 }}>Sugeridos para ti</h2>
        {TUTORES.slice(0, 3).map(t => (
          <TutorCard key={t.id} tutor={t} onSolicitar={() => alert(`Solicitud a ${t.nombre} (mock)`)} />
        ))}
      </IonContent>
    </IonPage>
  );
}
