import { UAParser } from 'ua-parser-js'

export const getDeviceInfo = async (userAgentString) => {
    const parser = new UAParser();
    const result = parser.setUA(userAgentString).getResult();
    return {
        ua: result.ua,
        browser: {
            name: result.browser.name || "Unknown Browser",
            version: result.browser.version || "Unknown Version",
            major: result.browser.major || "N/A",
            type: result.browser.type || "desktop"
        },
        cpu: {
            architecture: result.cpu.architecture || "Unknown Architecture"
        },
        device: {
            type: result.device.type || "desktop1",
            model: result.device.model || "Generic PC",
            vendor: result.device.vendor || "Custom/Unknown"
        },
        engine: {   
            name: result.engine.name || "Unknown Engine",
            version: result.engine.version || "Unknown Version"
        },
        os: {
            name: result.os.name || "Unknown OS",
            version: result.os.version || "Unknown Version"
        }
    };
} 