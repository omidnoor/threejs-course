precision mediump float;
uniform float time;
uniform vec3 uColor;
uniform sampler2D uTexture;
varying float vRandom;
varying vec2 vUv;

void main(){
    // gl_FragColor = vec4(vRandom * vRandom, vRandom *vRandom *vRandom, vRandom, sin(vRandom));
    vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = textureColor;
}