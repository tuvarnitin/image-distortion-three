export const vertex =  `
varying vec2 vUv;
uniform vec2 uDelta;
float PI = 3.14592652589793228;
void main() {
  vUv = uv;
  vec3 newPostion = position;
  newPostion.x += sin(uv.y * PI ) * uDelta.x * 2.4;
  newPostion.y += sin(uv.x * PI ) * uDelta.y * 1.4;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPostion,1.0);
}
`