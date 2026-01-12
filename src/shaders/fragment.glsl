export const fragment = `
uniform sampler2D uTexture;
uniform float uOpacity;
varying vec2 vUv;

void main() {

  vec3 texture = texture2D(uTexture,vUv).rgb;
  gl_FragColor = vec4(texture,uOpacity);

}
`