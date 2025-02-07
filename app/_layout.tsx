import { Stack } from "expo-router";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import MigrationHandler from "./db/MigrationHandler";

const RootLayout: React.FC = () => {
  const handleMigrationComplete = () => {
    console.log("Migrations are complete. App can proceed.");
  };

  return (
    <GluestackUIProvider mode="light">
      <MigrationHandler onMigrationComplete={handleMigrationComplete} />
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="add" />
        <Stack.Screen name="update/[id]" />
      </Stack>
    </GluestackUIProvider>
  );
};

export default RootLayout;
