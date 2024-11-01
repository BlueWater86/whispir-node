export type FcmWrite = {
    /**
    * Translates to the <span style=\"color:red\">*android_channel_id*</span> attribute in FCM. Note: use this attribute for devices running Android versions 8 or later.
    */
    'androidChannelId'?: string;
    /**
    * The sound to play when the device receives the notification. The value *default* will play the system sound, otherwise this attribute must point to a sound resource bundled in the app, e.g. *_/res/raw/notification_sound.wav*  Note: This attribute can be used for devices running Android versions older than Android 8. For versions 8+ please use the *androidChannelId*
    */
    'sound'?: string;
    /**
    * The action linked with a user click on the notification. Translates to the <span style=\"color:red\">*click_action*</span> attribute in FCM.
    */
    'action'?: string;
    /**
    * The URL of an image to be downloaded and displayed in the notification.  Details of the Android support for images in push notifications can be found [here](https://firebase.google.com/docs/cloud-messaging/android/send-image)
    */
    'image'?: string;
};
/**
* The fcm object holds attributes specific to the contacts\' Firebase-registered Android devices
*/
export declare class Fcm {
    /**
    * Translates to the <span style=\"color:red\">*android_channel_id*</span> attribute in FCM. Note: use this attribute for devices running Android versions 8 or later.
    */
    'androidChannelId': string;
    /**
    * The sound to play when the device receives the notification. The value *default* will play the system sound, otherwise this attribute must point to a sound resource bundled in the app, e.g. *_/res/raw/notification_sound.wav*  Note: This attribute can be used for devices running Android versions older than Android 8. For versions 8+ please use the *androidChannelId*
    */
    'sound': string;
    /**
    * The action linked with a user click on the notification. Translates to the <span style=\"color:red\">*click_action*</span> attribute in FCM.
    */
    'action': string;
    /**
    * The URL of an image to be downloaded and displayed in the notification.  Details of the Android support for images in push notifications can be found [here](https://firebase.google.com/docs/cloud-messaging/android/send-image)
    */
    'image': string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
