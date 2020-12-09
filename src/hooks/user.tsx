import AsyncStorage from "@react-native-community/async-storage";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import React, {
    createContext,
    useCallback,
    useState,
    useEffect,
    useContext,
    useRef,
} from "react";
import { ThemeProvider } from "styled-components";

import { authUser, deleteUser, updateUser } from "../services/users";
import staySafeDarkTheme from "../styles/staySafeDarkTheme";
import staySafeTheme from "../styles/staySafeTheme";
import { registerForPushNotificationsAsync } from "../utils/notifications";

interface SignInCredentials {
    username: string;
    password: string;
}

interface UserContextData {
    theme: AppTheme;
    data: UserState;
    location: UserLocation;
    centralize: boolean;
    isLoading: boolean;
    showNotifications: boolean;
    showTutorial: boolean;
    updateLocation: (location: UserLocation) => void;
    updateCentralize: (value: boolean) => void;
    switchTheme: () => void;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    deleteAccount(): void;
    switchShowNotifications(): void;
    notification: {};
    tapNotification: boolean;
    updateShowTutorial(show: boolean): Promise<void>;
}

interface AppTheme {
    type: string;
    primaryDarkBlue: string;
    primarySuperDarkBlue: string;
    primaryLightBlue: string;
    primaryWhite: string;
    primaryRed: string;
    primaryGray: string;
    primaryBackground: string;
    primaryBlack: string;

    primaryStrongYellow: string;

    primaryImpressionRed: string;
    primaryImpressionOrange: string;
    primaryImpressionGreen: string;

    heatMapGreen1: string;
    heatMapYellow2: string;
    heatMapOrange3: string;
    heatMapOrange4: string;
    heatMapOrange5: string;
    heatMapRed6: string;
}

interface UserState {
    username: string;
    token: string;
}

interface UserLocation {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}

const initialLocation = {
    latitude: -15.780311,
    longitude: -47.768043,
    latitudeDelta: 0.2,
    longitudeDelta: 0.2,
};

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const UserContext = createContext<UserContextData | null>(null);

export const UserProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState(staySafeTheme);

    const [data, setData] = useState<UserState>({ token: "", username: "" });

    const [location, setLocation] = useState<UserLocation>(initialLocation);

    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const [tapNotification, setTapOnNotification] = useState(false);

    const [showNotifications, setShowNotifications] = useState(true);
    const [showTutorial, setShowTutorial] = useState(false);

    const notificationListener = useRef();
    const responseListener = useRef();

    const [isLoading, setIsLoading] = useState(true);

    const [centralize, setCentralize] = useState(true);

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            const [
                token,
                username,
                themeType,
                notifications,
                tutorial,
            ] = await AsyncStorage.multiGet([
                "@StaySafe:token",
                "@StaySafe:username",
                "@StaySafe:theme",
                "@StaySafe:notifications",
                "@StaySafe:tutorial",
            ]);

            if (token[1] && username[1]) {
                setData({ token: token[1], username: username[1] });
            }

            setTheme(
                themeType[1] === "default" ? staySafeTheme : staySafeDarkTheme
            );

            if (tutorial[1] === null || tutorial[1] !== "false") {
                setShowTutorial(true);
            }

            setShowNotifications(notifications[1] === "true");
            setIsLoading(false);
        }

        setTimeout(() => {
            loadStorageData();
            getCurrentLocation();
        }, 1000);
    }, []);

    useEffect(() => {
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => receivingNotification(notification)
        );

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            () => tapOnNotification()
        );

        return () => {
            Notifications.removeAllNotificationListeners();
        };
    }, []);

    const receivingNotification = (notification) => {
        setNotification(notification.request.content.data);
    };

    const tapOnNotification = () => {
        setTapOnNotification(true);
        console.log("----------------> RECEBEU!!!!!!!!!");
    };

    const registerDeviceForPushNotifications = async () => {
        const tokenNotification = await registerForPushNotificationsAsync();

        setExpoPushToken(tokenNotification);

        return tokenNotification;
    };

    const signIn = useCallback(async ({ username, password }) => {
        const response = await authUser({
            username,
            password,
        });

        let error = "";

        if (!response.body.error && response.status === 200) {
            const { token } = response.body;

            registerDeviceForPushNotifications().then(async (deviceToken) => {
                await updateUser(
                    {
                        show_notifications: true,
                        device_token: String(deviceToken),
                    },
                    token
                );
            });

            await AsyncStorage.multiSet([
                ["@StaySafe:token", token],
                ["@StaySafe:username", username],
                ["@StaySafe:notifications", String(showNotifications)],
            ]);

            setData({ username, token });
        } else {
            error = response.body.error;
        }

        return error;
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove([
            "@StaySafe:token",
            "@StaySafe:username",
        ]);

        setData({ token: "", username: "" });
    }, []);

    const deleteAccount = useCallback(async () => {
        await deleteUser(data.token);

        await AsyncStorage.multiRemove([
            "@StaySafe:token",
            "@StaySafe:username",
        ]);

        setData({ token: "", username: "" });
    }, []);

    const getCurrentLocation = async () => {
        const { status } = await Location.requestPermissionsAsync();

        if (status !== "granted") {
            console.warn("Permission to access location was denied");
        } else {
            const position = await Location.getCurrentPositionAsync({});

            const someLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            };

            setLocation(someLocation);
            setCentralize(true);
        }
    };

    const switchTheme = useCallback(async () => {
        await AsyncStorage.setItem(
            "@StaySafe:theme",
            theme.type === "default" ? "dark" : "default"
        );
        setTheme(theme === staySafeTheme ? staySafeDarkTheme : staySafeTheme);
    }, [theme]);

    const switchShowNotifications = useCallback(async () => {
        await AsyncStorage.setItem(
            "@StaySafe:notifications",
            String(showNotifications !== true)
        );
        setShowNotifications(showNotifications !== true);
    }, [theme]);

    const updateShowTutorial = useCallback(async (show: boolean) => {
        await AsyncStorage.setItem("@StaySafe:tutorial", String(show));
        setShowTutorial(show);
    }, []);

    const updateLocation = (newLocation: UserLocation) => {
        setLocation(newLocation);
    };

    const updateCentralize = (centralize: boolean) => {
        setCentralize(centralize);
    };

    return (
        <UserContext.Provider
            value={{
                data,
                centralize,
                location,
                updateLocation,
                updateCentralize,
                switchTheme,
                theme,
                isLoading,
                switchShowNotifications,
                showNotifications,
                updateShowTutorial,
                showTutorial,
                signIn,
                tapNotification,
                signOut,
                notification,
                deleteAccount,
            }}
        >
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </UserContext.Provider>
    );
};

export function useUser(): UserContextData {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within an UserProvider");
    }

    return context;
}
