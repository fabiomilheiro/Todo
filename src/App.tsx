import { useEffect } from "react";
import "./App.css";
import {
  AnalyticsProvider,
  AuthProvider,
  FirestoreProvider,
  useAnalytics,
  useFirebaseApp,
} from "reactfire";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { List, ListItem, ListItemText } from "@mui/material";
import { getAnalytics, logEvent } from "firebase/analytics";
import { TodoList } from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  const firebaseApp = useFirebaseApp();
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const analytics = getAnalytics(firebaseApp);
  // const performance = useInitPerformance(async (fa) => {
  //   const { getPerformance } = await import("firebase/performance");
  //   return getPerformance(fa);
  // });

  return (
    <AnalyticsProvider sdk={analytics}>
      {/* <PerformanceProvider sdk={performance.data}> */}
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestore}>
          <TodoList />
          <MyPageViewLogger location={window.location} />
        </FirestoreProvider>
      </AuthProvider>
      {/* </PerformanceProvider> */}
    </AnalyticsProvider>
  );
}

interface MyPageViewLoggerProps {
  location: Location;
}

function MyPageViewLogger({ location }: MyPageViewLoggerProps) {
  const analytics = useAnalytics();

  // By passing `location.pathname` to the second argument of `useEffect`,
  // we only log on first render and when the `pathname` changes
  useEffect(() => {
    logEvent(analytics, "page_view", { page_location: location.href });
  }, [analytics, location.href]);

  return null;
}

export default App;
