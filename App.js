import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as Notifications from "expo-notifications";

import HomeScreen from "./app/screens/HomeScreen";
import { getRandomQuote } from "./app/services/apiService";

export default function App() {
  useEffect(() => {
    scheduleMorningNotification();
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldPlaySound: false,
        shouldSetBadge: false,
        shouldShowAlert: true,
      };
    },
  });

  const scheduleMorningNotification = async () => {
    // Request permissions if needed
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) {
        console.log("Notification permission not granted");
        return;
      }
    }

    // Get a random quote
    const quote = await getRandomQuote();

    // Set the notification content
    const notificationContent = {
      title: "Good Morning!",
      body: `"${quote.content}" - ${quote.author}`,
    };

    // Calculate the time for the morning notification (8:00 AM)
    const date = new Date();
    date.setHours(8, 0, 0, 0);

    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: {
        hour: 8,
        minute: 0,
        repeats: true,
      },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <HomeScreen />
      <StatusBar style="auto" />
    </View>
  );
}
