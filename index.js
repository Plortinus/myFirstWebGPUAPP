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

// Configure the canvas for WebGPU
const context = canvas.getContext("webgpu");
const canvasFormat = navigator.gpu.getPreferredCanvasFormat();
context.configure({
  device: device,
  format: canvasFormat,
});

// Create a command encoder and pass it to the GPU
const encoder = device.createCommandEncoder();

// Create a render pass
const pass = encoder.beginRenderPass({
  colorAttachments: [{
     view: context.getCurrentTexture().createView(),
     loadOp: "clear",
     storeOp: "store",
  }]
});

// Finish the render pass
pass.end();


// Submit the command buffer to the GPU
const commandBuffer = encoder.finish();
device.queue.submit([encoder.finish()]);
