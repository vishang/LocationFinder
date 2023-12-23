package com.stantech;

import android.content.Context;
import android.os.PowerManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

class BatteryModule extends ReactContextBaseJavaModule {
    private Context context;

    public BatteryModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    /**
     * @return the name of this module. This will be the name used to {@code require()} this module
     * from javascript.
     */

    public String getName() {
        return "BatteryModule";
    }

    @ReactMethod
    public void isPowerSaveModeEnabled(Callback successCallback, Callback errorCallback) {
        try {
            PowerManager powerManager = (PowerManager) getReactApplicationContext().getSystemService(Context.POWER_SERVICE);

            if (powerManager != null) {
                boolean isPowerSaveModeEnabled = powerManager.isPowerSaveMode();
                successCallback.invoke(isPowerSaveModeEnabled);
            } else {
                errorCallback.invoke("PowerManager is null");
            }
        } catch(Throwable t) {
            errorCallback.invoke(t.getMessage());
        }
    }
}
