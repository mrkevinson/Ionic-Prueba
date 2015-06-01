cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.ionic.keyboard/www/keyboard.js",
        "id": "com.ionic.keyboard.keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ]
    },
    {
        "file": "plugins/cordova-plugin-device/www/device.js",
        "id": "cordova-plugin-device.device",
        "clobbers": [
            "device"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/com.telerik.stripe/www/stripe.js",
        "id": "com.telerik.stripe.stripe",
        "clobbers": [
            "stripe"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/charges.js",
        "id": "com.telerik.stripe.charges",
        "clobbers": [
            "stripe.charges"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/customers.js",
        "id": "com.telerik.stripe.customers",
        "clobbers": [
            "stripe.customers"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/recipients.js",
        "id": "com.telerik.stripe.recipients",
        "clobbers": [
            "stripe.recipients"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/subscriptions.js",
        "id": "com.telerik.stripe.subscriptions",
        "clobbers": [
            "stripe.subscriptions"
        ]
    },
    {
        "file": "plugins/com.telerik.stripe/www/transfers.js",
        "id": "com.telerik.stripe.transfers",
        "clobbers": [
            "stripe.transfers"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.ionic.keyboard": "1.0.4",
    "cordova-plugin-console": "1.0.0",
    "cordova-plugin-device": "1.0.0",
    "cordova-plugin-splashscreen": "2.0.0",
    "cordova-plugin-whitelist": "1.0.0",
    "com.telerik.stripe": "1.0.5"
}
// BOTTOM OF METADATA
});