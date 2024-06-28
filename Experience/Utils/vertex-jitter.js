const vertexJitter =
  "varying vec2 vUv;\nuniform float uJitterLevel;\n\nvoid main()\n{\nvUv = uv;\nvec4 v = modelViewMatrix * vec4(position, 1.0);\ngl_Position = projectionMatrix * v;\n\ngl_Position /= gl_Position.w;\n\ngl_Position.xy = floor(gl_Position.xy * uJitterLevel) / uJitterLevel * gl_Position.w;\n}";

export default vertexJitter;
