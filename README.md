# WAKEUP 

A plugin for jquery that detects when computer has recovered from stand-by mode

## Disclaimer

This code comes from 

https://github.com/paulokopny/jquery.wakeup-plugin

This proyect doesn't have any bower component associated so I made one.

Usage
=====

```
// assign a handler function to be executed after waking up
var bell_id = $.wakeUp(function(sleep_time) {
    alert("I have slept for " + sleep_time/1000 + " seconds")
});

// remove this handler
$.ignoreBell(bell_id);

// remove all handlers
$.dreamOn();

```