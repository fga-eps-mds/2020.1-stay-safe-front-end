import Constants from "expo-constants";

const { manifest } = Constants;

export const userApi = `http://${manifest.debuggerHost.split(':').shift()}:8083/api`