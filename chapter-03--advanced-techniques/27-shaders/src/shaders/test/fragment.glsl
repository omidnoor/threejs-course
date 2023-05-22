precision mediump float;
uniform float time;
uniform vec3 uColor;
varying float vRandom;
void main(){
    // gl_FragColor = vec4(vRandom * vRandom, vRandom *vRandom *vRandom, vRandom, sin(vRandom));
    gl_FragColor = vec4(uColor,vRandom);
}