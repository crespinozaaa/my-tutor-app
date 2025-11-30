import {
  IonCard,
  IonCardContent,
  IonAvatar,
  IonItem,
  IonLabel,
  IonChip,
  IonIcon,
  IonBadge,
  IonText,
  IonButton,
  IonToast,
} from "@ionic/react";
import {
  star,
  locationOutline,
  videocamOutline,
  cashOutline,
  heartOutline,
  heart,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { Tutor as BaseTutor } from "../mock/tutors";
import {
  addFavorite,
  removeFavoriteByTutorId,
  isFavorite,
} from "../db";

/** Permitimos email opcional sin tocar el tipo original de Tutor */
type Tutor = BaseTutor & { email?: string };

export default function TutorCard({
  tutor,
  onSolicitar,
}: {
  tutor: Tutor;
  onSolicitar?: (t: Tutor) => void;
}) {
  const [fav, setFav] = useState(false);

  // toast state
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger" | "medium">("success");

  useEffect(() => {
    (async () => {
      const exists = await isFavorite(tutor.id);
      setFav(exists);
    })();
  }, [tutor.id]);

  const toggleFav = async () => {
    try {
      if (fav) {
        await removeFavoriteByTutorId(tutor.id);
        setFav(false);
        setToastMsg("Quitado de favoritos");
        setToastColor("danger");
        setToastOpen(true);
      } else {
        await addFavorite({
          tutorId: tutor.id,
          nombre: tutor.nombre,
          carrera: tutor.carrera,
          reputacion: tutor.reputacion,
        });
        setFav(true);
        setToastMsg("Agregado a favoritos");
        setToastColor("success");
        setToastOpen(true);
      }
    } catch (e) {
      console.error("Favorito error:", e);
      setToastMsg("Ups, no se pudo actualizar el favorito");
      setToastColor("medium");
      setToastOpen(true);
    }
  };

  const handleContact = () => {
    if (!tutor.email) {
      setToastMsg("Este tutor no tiene email configurado.");
      setToastColor("medium");
      setToastOpen(true);
      return;
    }
    const subject = encodeURIComponent("Consulta sobre tutoría");
    const ramo = tutor.ramos?.[0]?.codigo ? ` sobre ${tutor.ramos[0].codigo}` : "";
    const body = encodeURIComponent(
      `Hola ${tutor.nombre},\n\nMe interesa coordinar una tutoría${ramo}. ¿Tienes disponibilidad esta semana?\n\n¡Gracias!`
    );
    // Abre cliente de correo nativo (Gmail/Outlook/iOS Mail, etc.)
    window.location.href = `mailto:${tutor.email}?subject=${subject}&body=${body}`;
  };

  return (
    <IonCard className="card-elevated">
      <IonCardContent>
        <IonItem lines="none">
          <IonAvatar slot="start">
            <img src={tutor.foto} alt={tutor.nombre} />
          </IonAvatar>
          <IonLabel>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <strong>{tutor.nombre}</strong>
              <IonBadge color="primary" style={{ verticalAlign: "middle" }}>
                <IonIcon icon={star} style={{ marginRight: 4 }} />
                {tutor.reputacion.toFixed(1)}
              </IonBadge>
            </div>
            <IonText color="medium">
              <div>
                {tutor.carrera} · Sem {tutor.semestre}
              </div>
              {tutor.email && (
                <div style={{ marginTop: 4 }}>
                  <strong>Email:</strong> {tutor.email}
                </div>
              )}
            </IonText>
          </IonLabel>
        </IonItem>

        <div
          style={{
            marginTop: 8,
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {tutor.ramos.map((r) => (
            <IonChip key={r.id} color="light">
              {r.codigo}
            </IonChip>
          ))}
        </div>

        <div
          style={{
            marginTop: 10,
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <IonChip color="secondary" outline={true}>
            <IonIcon
              icon={
                tutor.modalidad === "online" ? videocamOutline : locationOutline
              }
              style={{ marginRight: 6 }}
            />
            {tutor.modalidad}
          </IonChip>
          {tutor.precio != null && (
            <IonChip color="tertiary" outline={true}>
              <IonIcon icon={cashOutline} style={{ marginRight: 6 }} />
              ${tutor.precio}/h
            </IonChip>
          )}
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            justifyContent: "space-between",
            marginTop: 12,
            flexWrap: "wrap",
          }}
        >
          <IonButton onClick={() => onSolicitar?.(tutor)}>
            Solicitar
          </IonButton>

          <IonButton
            color="secondary"
            onClick={handleContact}
            aria-label={`Contactar a ${tutor.nombre} por correo`}
          >
            Contactar
          </IonButton>

          <IonButton
            fill="outline"
            color={fav ? "danger" : "medium"}
            onClick={toggleFav}
          >
            <IonIcon slot="start" icon={fav ? heart : heartOutline} />
            {fav ? "Quitar" : "Favorito"}
          </IonButton>
        </div>
      </IonCardContent>

      {/* Toast de feedback */}
      <IonToast
        isOpen={toastOpen}
        message={toastMsg}
        color={toastColor}
        duration={1200}
        position="top"
        onDidDismiss={() => setToastOpen(false)}
      />
    </IonCard>
  );
}
