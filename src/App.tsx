import { useEffect, useState } from "react";
import "./App.css";
import {
  AnalyticsProvider,
  AuthProvider,
  FirestoreProvider,
  useAnalytics,
  useFirebaseApp,
} from "reactfire";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { TodoList } from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { UserContext } from "./components/context/UserContext";
import { TopBar } from "./components/TopBar";

function App() {
  const firebaseApp = useFirebaseApp();
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);
  const analytics = getAnalytics(firebaseApp);
  // const performance = useInitPerformance(async (fa) => {
  //   const { getPerformance } = await import("firebase/performance");
  //   return getPerformance(fa);
  // });
  const [userContext, setUserContext] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserContext({
          user,
        });
      } else {
        setUserContext({});
      }
    });
  }, [auth]);

  return (
    <UserContext.Provider value={userContext}>
      <AnalyticsProvider sdk={analytics}>
        {/* <PerformanceProvider sdk={performance.data}> */}
        <AuthProvider sdk={auth}>
          <FirestoreProvider sdk={firestore}>
            <ThemeProvider
              theme={createTheme({
                typography: {
                  h1: {
                    fontSize: 24,
                  },
                },
              })}
            >
              <SnackbarProvider maxSnack={3}>
                <TopBar />
                <TodoList />
              </SnackbarProvider>
            </ThemeProvider>
            <MyPageViewLogger location={window.location} />
          </FirestoreProvider>
        </AuthProvider>
        {/* </PerformanceProvider> */}
      </AnalyticsProvider>
    </UserContext.Provider>
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
