export class SmartDeviceAPI {

    public static async getData() {

        const response = await fetch("http://localhost:8088/smart-device/");
        const deviceData = response.json();

        return deviceData;
    }

}