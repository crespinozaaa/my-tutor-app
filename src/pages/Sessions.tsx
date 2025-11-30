import { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
  IonToast,
} from "@ionic/react";
import { listFavorites, removeFavoriteByTutorId, Favorite } from "../db";

export default function Sessions() {
  const [favs, setFavs] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  // toasts
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger" | "medium">("success");

  const load = async () => {
    setLoading(true);
    const data = await listFavorites();
    setFavs(data);
    setLoading(false);
  };

  useIonViewWillEnter(() => {
    load();
  });

  const removeFav = async (tutorId: number) => {
    await removeFavoriteByTutorId(tutorId);
    await load();
    setToastMsg("Quitado de favoritos");
    setToastColor("danger");
    setToastOpen(true);
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle>Sesiones</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonRefresher
          slot="fixed"
          onIonRefresh={async (e) => {
            await load();
            setToastMsg("Actualizado");
            setToastColor("success");
            setToastOpen(true);
            e.detail.complete();
          }}
        >
          <IonRefresherContent />
        </IonRefresher>

        <IonList lines="none">
          <IonItem>
            <IonLabel>
              <strong>Tutores favoritos (DB local)</strong>
            </IonLabel>
          </IonItem>
        </IonList>

        {loading && <p style={{ color: "var(--ion-color-medium)" }}>Cargando…</p>}

        {!loading && favs.length === 0 && (
          <p style={{ color: "var(--ion-color-medium)" }}>
            Aún no marcas favoritos. Ve a Home/Buscar y toca <em>Favorito</em>.
          </p>
        )}

        {favs.map((f) => (
          <IonCard key={f.id} className="card-elevated">
            <IonCardHeader>
              <IonCardTitle>{f.nombre}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div>
                <strong>Carrera:</strong> {f.carrera}
              </div>
              <div>
                <strong>Reputación:</strong>{" "}
                {f.reputacion?.toFixed?.(1) ?? f.reputacion}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
                <IonButton color="danger" fill="outline" onClick={() => removeFav(f.tutorId)}>
                  Quitar de favoritos
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        ))}

        <IonToast
          isOpen={toastOpen}
          message={toastMsg}
          color={toastColor}
          duration={1200}
          position="top"
          onDidDismiss={() => setToastOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
}
