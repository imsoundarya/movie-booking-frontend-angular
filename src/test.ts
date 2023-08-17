import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
declare const require: any;

// Initialize the test environment
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);

// Configure require.context for dynamic imports
const context = require.context('./', true, /\.spec\.ts$/);
context.keys().map(context);
