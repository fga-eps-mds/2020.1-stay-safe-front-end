import AsyncStorage from "@react-native-community/async-storage";
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
    isLoading: boolean;
    showNotifications: boolean;
    switchTheme: () => void;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    deleteAccount(): void;
    switchShowNotifications(): void;
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

    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);

    const [showNotifications, setShowNotifications] = useState(true);

    const notificationListener = useRef();
    const responseListener = useRef();

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData(): Promise<void> {
            const [
                token,
                username,
                themeType,
                notifications,
            ] = await AsyncStorage.multiGet([
                "@StaySafe:token",
                "@StaySafe:username",
                "@StaySafe:theme",
                "@StaySafe:notifications",
            ]);

            if (token[1] && username[1]) {
                setData({ token: token[1], username: username[1] });
            }

            setTheme(
                themeType[1] === "default" ? staySafeTheme : staySafeDarkTheme
            );

            setShowNotifications(notifications[1] === "true");

            setIsLoading(false);
        }

        setTimeout(() => {
            loadStorageData();
        }, 1000);
    }, []);

    const registerDeviceForPushNotifications = async () => {
        const tokenNotification = await registerForPushNotificationsAsync();

        setExpoPushToken(tokenNotification);

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(
            (notification) => {
                setNotification(notification);
            }
        );

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(
            (response) => {
                console.log(response);
            }
        );

        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);

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
                setTimeout(async () => {
                    await updateUser(
                        {
                            show_notifications: true,
                            device_token: String(deviceToken),
                        },
                        token
                    );
                }, 10000);
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

    return (
        <UserContext.Provider
            value={{
                data,
                switchTheme,
                theme,
                isLoading,
                switchShowNotifications,
                showNotifications,
                signIn,
                signOut,
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
