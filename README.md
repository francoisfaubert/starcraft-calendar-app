StarCraft II Calendar app
=========================

This app connects to [starcraftcalendar.francoisfaubert.com](http://starcraftcalendar.francoisfaubert.com/) and displays the latest WCS event data.

It is built using [the ionic framework](http://ionicframework.com/) on top of Angular.


Building
========

    cordova build --release android
    jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore platforms/android/ant-build/CordovaApp-release-unsigned.apk alias_name
    zipalign -v 4 platforms/android/ant-build/CordovaApp-release-unsigned.apk StarcraftIICalendar.apk
