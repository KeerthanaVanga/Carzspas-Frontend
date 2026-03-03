import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/TanStack";
import { SnackbarProvider } from "notistack";
import AppSuspense from "./components/ui/AppSuspense";
const App = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <AppSuspense>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AppSuspense>
    </SnackbarProvider>
  );
};

export default App;
