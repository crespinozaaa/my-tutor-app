import { useEffect, useState } from "react";
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
  IonText,
  IonButton,
  IonIcon,
  IonToast,
} from "@ionic/react";
import { mailOutline } from "ionicons/icons";
import { fetchApiUsers, ApiUser } from "../api/typicode";

export default function ApiUsers() {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchApiUsers();
        setUsers(data);
      } catch (e) {
        setErr("No se pudieron cargar los usuarios (API externa).");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleContact = (u: ApiUser) => {
    if (!u.email) {
      setToastMsg("Este usuario no tiene email disponible.");
      setToastOpen(true);
      return;
    }

    const subject = encodeURIComponent("Consulta sobre tutoría");
    const body = encodeURIComponent(
      `Hola ${u.name},\n\nMe gustaría saber más sobre tus servicios de tutoría. ¿Podemos coordinar?\n\nGracias.`
    );

    // Abre el cliente de correo nativo
    window.location.href = `mailto:${u.email}?subject=${subject}&body=${body}`;
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle>Usuarios (API externa)</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {loading && <IonText color="medium">Cargando…</IonText>}
        {err && (
          <IonText color="danger">
            <p>{err}</p>
          </IonText>
        )}

        {!loading &&
          !err &&
          users.map((u) => (
            <IonCard key={u.id} className="card-elevated">
              <IonCardHeader
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <IonCardTitle>{u.name}</IonCardTitle>
                <IonIcon
                  icon={mailOutline}
                  size="large"
                  color="secondary"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleContact(u)}
                  title={`Contactar a ${u.name}`}
                />
              </IonCardHeader>

              <IonCardContent>
                <div>
                  <strong>Email:</strong> {u.email}
                </div>
                <div>
                  <strong>Usuario:</strong> {u.username}
                </div>
                <div>
                  <strong>Tel:</strong> {u.phone}
                </div>
                <div>
                  <strong>Web:</strong> {u.website}
                </div>

                <IonButton
                  expand="block"
                  color="secondary"
                  style={{ marginTop: 12, borderRadius: 12 }}
                  onClick={() => handleContact(u)}
                  aria-label={`Contactar a ${u.name} por correo`}
                >
                  <IonIcon slot="start" icon={mailOutline} />
                  Contactar
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))}

        <IonToast
          isOpen={toastOpen}
          message={toastMsg}
          color="medium"
          duration={1200}
          position="top"
          onDidDismiss={() => setToastOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
}
