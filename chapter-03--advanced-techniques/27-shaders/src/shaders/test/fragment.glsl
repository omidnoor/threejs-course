precision mediump float;
uniform float time;
void main(){
    gl_FragColor = vec4(0.7, 0.2 * sin(time), 0.5, 1.0);
}