precision mediump float;
uniform float time;
varying float vRandom;
void main(){
    // gl_FragColor = vec4(vRandom * vRandom, vRandom *vRandom *vRandom, vRandom, sin(vRandom));
    gl_FragColor = vec4(1.0,0,vRandom,1.0);
}