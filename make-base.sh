mkdir build
node_modules/dd-rn-packager/bin/rnpackager bundle --reset-cache --dev false --platform ios --entry-file base.js --bundle-output build/base.ios.0.40.10.bundle --sourcemap-output build/base.ios.0.40.10.sourcemap --manifest-output build/base.ios.0.40.10.manifest
node_modules/dd-rn-packager/bin/rnpackager bundle --reset-cache --dev false --platform android --entry-file base.js --bundle-output build/base.android.0.40.10.bundle --sourcemap-output build/base.android.0.40.10.sourcemap --manifest-output build/base.android.0.40.10.manifest
