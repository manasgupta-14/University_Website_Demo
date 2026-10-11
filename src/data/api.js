import { notices } from "./notices.js";
import { services } from "./services.js";

export function fetchData({ retry = false } = {}) {
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            const shouldFail =
                new URLSearchParams(window.location.search).has("error") && !retry;

            if (shouldFail) {
                reject(new Error("Simulated demo error"));
            } else {
                resolve({ notices, services });
            }
        }, 650);
    });
}
