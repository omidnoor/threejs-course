precision mediump float;

uniform float time;
uniform vec3 uColor;
uniform sampler2D uTexture;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main(){
    // gl_FragColor = vec4(vRandom * vRandom, vRandom *vRandom *vRandom, vRandom, sin(vRandom));
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation*2.0+1.0;
    gl_FragColor = textureColor;
}