import { useEffect, useState } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { Layout } from "./components/Layout";
import { Onboarding } from "./screens/Onboarding";
import { Home } from "./screens/Home";
import { Plan } from "./screens/Plan";
import { ExerciseDetail, ExerciseList } from "./screens/Exercises";
import { Safety, Settings } from "./screens/More";
import { Milestones } from "./screens/Milestones";
import { computeEarnedBadges } from "./data/badges";
import { getProtocol } from "./data/protocols";
import { currentPhase, daysSinceOp, useAppState } from "./lib/state";
import { navigate, useRoute } from "./lib/router";

/** Zieldurchgänge pro Übung und Tag (stündlich, wenn wach ≈ 10 wache Übungsstunden). */
const DAILY_TARGET = 10;

export default function App() {
  // WICHTIG: Sämtliche Hooks stehen vor allen bedingten returns,
  // damit ihre Reihenfolge über alle Renderdurchläufe stabil bleibt.
  const [splashDone, setSplashDone] = useState(false);
  const [freshBadges, setFreshBadges] = useState<string[]>([]);
  const { state, update, logSet, resetAll } = useAppState();
  const route = useRoute();

  const protocol = getProtocol(state.protocolId);
  const onboarded = state.onboardingDone && !!state.opDate && !!protocol;

  const phase =
    onboarded && protocol && state.opDate
      ? currentPhase(protocol, daysSinceOp(state.opDate))
      : null;
  const isNewPhase =
    !!phase && state.lastSeenPhaseId !== null && state.lastSeenPhaseId !== phase.id;

  // Meilensteine: neu Verdientes einmalig mit Datum persistieren.
  useEffect(() => {
    if (!onboarded || !state.opDate) return;
    const earnedNow = computeEarnedBadges(state.progress, state.opDate, DAILY_TARGET);
    const fresh = earnedNow.filter((id) => !state.badges[id]);
    if (fresh.length > 0) {
      const stamp = new Date().toISOString();
      const next = { ...state.badges };
      fresh.forEach((id) => (next[id] = stamp));
      update({ badges: next });
      setFreshBadges((f) => [...f, ...fresh]);
    }
  }, [onboarded, state.opDate, state.progress, state.badges, update]);

  useEffect(() => {
    if (phase && state.lastSeenPhaseId !== phase.id) {
      // Nach dem Rendern als gesehen markieren; der Hinweis bleibt für diese Sitzung sichtbar.
      const t = setTimeout(() => update({ lastSeenPhaseId: phase.id }), 400);
      return () => clearTimeout(t);
    }
  }, [phase?.id, state.lastSeenPhaseId, update]);

  if (!splashDone) {
    return <SplashScreen onDone={() => setSplashDone(true)} />;
  }

  if (!onboarded || !protocol || !state.opDate) {
    return (
      <Onboarding
        onComplete={(opDate, protocolId) => {
          update({ opDate, protocolId, onboardingDone: true, safetyConfirmed: true });
          navigate("/home");
        }}
      />
    );
  }

  const opDate = state.opDate;

  let screen: JSX.Element;
  if (route.startsWith("/uebung/")) {
    const exerciseId = route.slice("/uebung/".length);
    screen = (
      <ExerciseDetail
        protocol={protocol}
        opDate={opDate}
        exerciseId={exerciseId}
        progress={state.progress}
        dailyTarget={DAILY_TARGET}
        onLogSet={logSet}
      />
    );
  } else {
    switch (route) {
      case "/plan":
        screen = <Plan protocol={protocol} opDate={opDate} />;
        break;
      case "/uebungen":
        screen = (
          <ExerciseList
            protocol={protocol}
            opDate={opDate}
            progress={state.progress}
            dailyTarget={DAILY_TARGET}
          />
        );
        break;
      case "/meilensteine":
        screen = <Milestones earned={state.badges} />;
        break;
      case "/hinweise":
        screen = <Safety protocol={protocol} />;
        break;
      case "/einstellungen":
        screen = (
          <Settings
            protocol={protocol}
            opDate={opDate}
            onChangeOpDate={(iso) => update({ opDate: iso })}
            onReset={() => {
              resetAll();
              navigate("/home");
            }}
          />
        );
        break;
      default:
        screen = (
          <Home
            protocol={protocol}
            opDate={opDate}
            progress={state.progress}
            dailyTarget={DAILY_TARGET}
            lastSetAt={state.lastSetAt}
            isNewPhase={isNewPhase}
            badgeCount={Object.keys(state.badges).length}
            freshBadges={freshBadges}
            onDismissFresh={() => setFreshBadges([])}
          />
        );
    }
  }

  return <Layout route={route}>{screen}</Layout>;
}
