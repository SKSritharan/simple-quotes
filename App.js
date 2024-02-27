import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as Notifications from "expo-notifications";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { FontAwesome } from "react-native-vector-icons";

import HomeScreen from "./app/screens/HomeScreen";
import { getRandomQuote } from "./app/services/apiService";
import DiscoverScreen from "./app/screens/DiscoverScreen";
import SearchScreen from "./app/screens/SearchScreen";

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

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#ccc",
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "quote-left";
            } else if (route.name === "Discover") {
              iconName = "globe";
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Discover"
          component={DiscoverScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
