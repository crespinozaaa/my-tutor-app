import React, { useEffect, useRef, useState } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonInput, IonButtons, IonButton,
  IonAvatar, IonToggle, IonIcon, IonNote, useIonToast
} from "@ionic/react";
import { Capacitor } from "@capacitor/core";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import {
  moonOutline, cameraOutline, trashOutline, saveOutline, logOutOutline
} from "ionicons/icons";
import { getProfile, saveProfile, clearProfile, type Profile } from "../lib/profile";
import { clearSession } from "../lib/session";

export default function ProfilePage() {
  const [present] = useIonToast();

  const [profile, setProfile] = useState<Profile>({
    nombre: "",
    email: "",
    carrera: "",
    semestre: null,
    avatarBase64: null,
    darkMode: false,
  });
  const [saving, setSaving] = useState(false);

  // input de archivo oculto para fallback en web
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      const p = await getProfile();
      setProfile(p);
      document.body.classList.toggle("dark", !!p.darkMode);
    })();
  }, []);

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const openFilePicker = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // reset para permitir misma imagen
      fileInputRef.current.click();
    }
  };

  const onFilePicked = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setProfile((p) => ({ ...p, avatarBase64: base64 }));
    present({ message: "Foto actualizada", duration: 1200, color: "success", position: "top" });
  };

  const pickFromCamera = async () => {
    try {
      // En app nativa: abre prompt cámara/galería
      if (Capacitor.isNativePlatform()) {
        const photo = await Camera.getPhoto({
          quality: 70,
          source: CameraSource.Prompt,
          resultType: CameraResultType.Base64,
        });
        if (photo?.base64String) {
          const base64 = `data:image/${photo.format};base64,${photo.base64String}`;
          setProfile((p) => ({ ...p, avatarBase64: base64 }));
          present({ message: "Foto actualizada", duration: 1200, color: "success", position: "top" });
          return;
        }
      }
      // En web (o si el usuario cancela / falla): selector de archivos
      openFilePicker();
    } catch {
      openFilePicker();
    }
  };

  const removeAvatar = () => setProfile((p) => ({ ...p, avatarBase64: null }));

  const handleSave = async () => {
    if (!profile.nombre?.trim()) {
      present({ message: "Escribe tu nombre", duration: 1200, color: "warning", position: "top" });
      return;
    }
    if (!profile.email?.includes("@")) {
      present({ message: "Email no válido", duration: 1200, color: "warning", position: "top" });
      return;
    }
    setSaving(true);
    try {
      await saveProfile(profile);
      present({ message: "Perfil guardado", duration: 1200, color: "success", position: "top" });
    } catch {
      present({ message: "No se pudo guardar", duration: 1400, color: "danger", position: "top" });
    } finally {
      setSaving(false);
    }
  };

  const handleDarkToggle = async (checked: boolean) => {
    document.body.classList.toggle("dark", checked);
    const updated = { ...profile, darkMode: checked };
    setProfile(updated);
    await saveProfile(updated);
  };

  const handleLogout = async () => {
    await clearSession();
    await clearProfile();
    window.location.href = "/login";
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle>Perfil</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout} color="light">
              <IonIcon slot="start" icon={logOutOutline} />
              Cerrar sesión
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* input oculto para fallback en web */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={onFilePicked}
        />

        {/* Avatar + acciones */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <IonAvatar style={{ width: 88, height: 88 }}>
            <img
              src={profile.avatarBase64 || "/assets/avatar-placeholder.png"}
              alt="avatar"
              style={{ objectFit: "cover" }}
            />
          </IonAvatar>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <IonButton onClick={pickFromCamera}>
              <IonIcon slot="start" icon={cameraOutline} />
              Cambiar foto
            </IonButton>
            <IonButton
              fill="outline"
              color="medium"
              onClick={removeAvatar}
              disabled={!profile.avatarBase64}
            >
              <IonIcon slot="start" icon={trashOutline} />
              Quitar
            </IonButton>
          </div>
        </div>

        {/* Formulario */}
        <IonList inset className="ion-margin-bottom">
          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput
              value={profile.nombre}
              placeholder="Tu nombre"
              onIonInput={(e) =>
                setProfile((p) => ({ ...p, nombre: e.detail.value ?? "" }))
              }
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={profile.email}
              placeholder="tu@email.com"
              onIonInput={(e) =>
                setProfile((p) => ({ ...p, email: e.detail.value ?? "" }))
              }
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Carrera</IonLabel>
            <IonInput
              value={profile.carrera || ""}
              placeholder="Ej: Ing. Informática"
              onIonInput={(e) =>
                setProfile((p) => ({ ...p, carrera: e.detail.value ?? "" }))
              }
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Semestre</IonLabel>
            <IonInput
              type="number"
              min={1}
              max={12}
              value={profile.semestre ?? ""}
              placeholder="Ej: 7"
              onIonInput={(e) =>
                setProfile((p) => ({
                  ...p,
                  semestre: e.detail.value ? Number(e.detail.value) : null,
                }))
              }
            />
          </IonItem>

          <IonItem>
            <IonLabel>Modo oscuro</IonLabel>
            <IonToggle
              checked={!!profile.darkMode}
              onIonChange={(e) => handleDarkToggle(e.detail.checked)}
            >
              <IonIcon slot="end" icon={moonOutline} />
            </IonToggle>
          </IonItem>
        </IonList>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <IonButton onClick={handleSave} disabled={saving}>
            <IonIcon slot="start" icon={saveOutline} />
            {saving ? "Guardando..." : "Guardar cambios"}
          </IonButton>
        </div>

        <div style={{ marginTop: 18 }}>
          <IonNote color="medium">
            La foto y los datos se guardan localmente (Preferences). En celular real se abre la cámara nativa; en web se usa selector de archivos.
          </IonNote>
        </div>
      </IonContent>
    </IonPage>
  );
}
