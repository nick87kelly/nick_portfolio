const fragmentAffine =
  "uniform sampler2D uTexture;\nvarying vec2 vUv;\n\nvoid main()\n{\nvec4 color = texture2D(uTexture, vUv);\ngl_FragColor = color;\n}";

export default fragmentAffine;
