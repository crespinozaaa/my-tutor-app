import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonInput, IonButton, IonText, IonSpinner, IonIcon, IonToast
} from "@ionic/react";
import { useState } from "react";
import { mailOutline, lockClosedOutline, eyeOffOutline, eyeOutline, logInOutline } from "ionicons/icons";
import { loginService } from "../api/auth";
import { saveSession } from "../lib/session";

export default function Login() {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const validar = () => {
    if (!correo || !password) return "Completa correo y contraseña.";
    if (!correo.includes("@")) return "Correo inválido.";
    return null;
  };

  const onSubmit = async () => {
    setErr(null);
    const v = validar();
    if (v) { setErr(v); setToastOpen(true); return; }
    setLoading(true);
    try {
      const res = await loginService(correo.trim(), password);
      await saveSession(res.access, res.user);
      window.location.href = "/app/home";
    } catch {
      setErr("Credenciales inválidas o servidor inalcanzable.");
      setToastOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter") onSubmit(); };

  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar color="transparent">
          <IonTitle>Ingresar</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding app-bg login-page">
        <div style={{ maxWidth: 420, margin: "40px auto" }}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <IonText color="primary">
              <h1 className="brand-title" style={{ margin: 0 }}>Red de Tutorías</h1>
            </IonText>
            <div className="brand-subtitle">Conecta con tutores de duoc</div>
          </div>

          <IonCard className="card-elevated">
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: "1.1rem" }}>Inicia sesión</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonInput
                className="input-spaced"
                label="Correo institucional"
                labelPlacement="stacked"
                type="email"
                value={correo}
                onIonInput={(e) => setCorreo(e.detail.value ?? "")}
                onKeyDown={onKeyDown}
              
              >
                <IonIcon slot="start" icon={mailOutline} />
              </IonInput>

              <div style={{ height: 12 }} />

              <IonInput
                className="input-spaced"
                label="Contraseña"
                labelPlacement="stacked"
                type={showPwd ? "text" : "password"}
                value={password}
                onIonInput={(e) => setPassword(e.detail.value ?? "")}
                onKeyDown={onKeyDown}
                
              >
                <IonIcon slot="start" icon={lockClosedOutline} />
                <IonButton
                  slot="end"
                  size="small"
                  fill="clear"
                  onClick={() => setShowPwd(s => !s)}
                >
                  <IonIcon icon={showPwd ? eyeOffOutline : eyeOutline} />
                </IonButton>
              </IonInput>

              {err && (
                <IonText color="danger" style={{ display: "block", marginTop: 10 }}>
                  {err}
                </IonText>
              )}

              <div style={{ height: 18 }} />

              <IonButton expand="block" className="btn-primary" onClick={onSubmit} disabled={loading}>
                {loading ? (
                  <IonSpinner name="crescent" />
                ) : (
                  <>
                    <IonIcon slot="start" icon={logInOutline} />
                    Entrar
                  </>
                )}
              </IonButton>

              <div style={{ marginTop: 10, textAlign: "center" }}>
                <IonText color="medium" style={{ fontSize: ".9rem" }}>
                  Usa tu correo <strong>@duocuc.cl</strong>
                </IonText>
              </div>
            </IonCardContent>
          </IonCard>

          <div style={{ textAlign: "center", marginTop: 10 }}>
            <IonText color="medium" style={{ fontSize: ".85rem" }}>
              ¿Olvidaste tu contraseña? <a href="#" onClick={(e)=>e.preventDefault()}>Recupérala</a>
            </IonText>
          </div>
        </div>

        <IonToast
          isOpen={toastOpen}
          message={err ?? ""}
          duration={2200}
          color="danger"
          position="top"
          onDidDismiss={() => setToastOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
}
