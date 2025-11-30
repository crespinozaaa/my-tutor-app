import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonSearchbar, IonSelect, IonSelectOption, IonSegment, IonSegmentButton, IonLabel
} from "@ionic/react";
import { useMemo, useState } from "react";
import TutorCard from "../components/TutorCard";
import { RAMOS, TUTORES, Tutor } from "../mock/tutors";

export default function Search() {
  const [q, setQ] = useState("");
  const [ramoId, setRamoId] = useState<number | "">("");
  const [mod, setMod] = useState<"todos" | "online" | "presencial" | "mixta">("todos");
  const [minRating, setMinRating] = useState<number>(0);

  const lista = useMemo(() => {
    let res: Tutor[] = TUTORES;
    if (q.trim()) {
      const s = q.toLowerCase();
      res = res.filter(t => t.nombre.toLowerCase().includes(s) || t.carrera.toLowerCase().includes(s));
    }
    if (ramoId) res = res.filter(t => t.ramos.some(r => r.id === ramoId));
    if (mod !== "todos") res = res.filter(t => t.modalidad === mod);
    if (minRating > 0) res = res.filter(t => t.reputacion >= minRating);
    return res;
  }, [q, ramoId, mod, minRating]);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle>Buscar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonSearchbar
          value={q}
          debounce={250}
          placeholder="Buscar por nombre o carrera"
          onIonInput={(e) => setQ(e.detail.value ?? "")}
        />

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap: 8, margin: "8px 0 4px" }}>
          <IonSelect
            label="Ramo"
            value={ramoId}
            onIonChange={(e) => setRamoId(e.detail.value)}
            interface="popover"
          >
            <IonSelectOption value="">Todos</IonSelectOption>
            {RAMOS.map(r => (
              <IonSelectOption key={r.id} value={r.id}>{r.codigo}</IonSelectOption>
            ))}
          </IonSelect>

          <IonSelect
            label="Mín. rating"
            value={minRating}
            onIonChange={(e) => setMinRating(Number(e.detail.value))}
            interface="popover"
          >
            <IonSelectOption value={0}>Todos</IonSelectOption>
            <IonSelectOption value={4}>4.0+</IonSelectOption>
            <IonSelectOption value={4.5}>4.5+</IonSelectOption>
          </IonSelect>
        </div>

        <IonSegment value={mod} onIonChange={(e) => setMod(e.detail.value as any)} style={{ marginTop: 6 }}>
          <IonSegmentButton value="todos"><IonLabel>Todos</IonLabel></IonSegmentButton>
          <IonSegmentButton value="online"><IonLabel>Online</IonLabel></IonSegmentButton>
          <IonSegmentButton value="presencial"><IonLabel>Presencial</IonLabel></IonSegmentButton>
          <IonSegmentButton value="mixta"><IonLabel>Mixta</IonLabel></IonSegmentButton>
        </IonSegment>

        <div style={{ marginTop: 12 }}>
          {lista.map(t => (
            <TutorCard key={t.id} tutor={t} onSolicitar={() => alert(`Solicitud a ${t.nombre} (mock)`)} />
          ))}
          {lista.length === 0 && <p style={{ color: "var(--ion-color-medium)" }}>Sin resultados con esos filtros.</p>}
        </div>
      </IonContent>
    </IonPage>
  );
}
