export const vertexShaderSource = `#version 300 es


in vec3 a_position;
 
uniform vec2 u_resolution;
uniform mat3 u_matrix;
 
void main() {
  // Multiply the position by the matrix.
    vec2 position = (u_matrix * vec3(a_position.xy, 1)).xy;

    vec2 zeroToOne = position / u_resolution;

    vec2 clipSpace = (zeroToOne * 2.0) - 1.0;

    // Flip Y and pass Z from a_position.z
    gl_Position = vec4(clipSpace * vec2(1, -1), a_position.z, 1.0);
}
`;
