const canvas = document.querySelector("canvas");

// Get a GPU context
if (!navigator.gpu) {
  throw new Error("WebGPU not supported on this browser.");
}
// Get an adapter
const adapter = await navigator.gpu.requestAdapter();
if (!adapter) {
  throw new Error("No appropriate GPUAdapter found.");
}
// Create the device
const device = await adapter.requestDevice();
