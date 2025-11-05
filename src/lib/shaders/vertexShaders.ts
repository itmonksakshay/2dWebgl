export const vertexShaderSource = `#version 300 es


in vec3 a_position;
 
uniform mat3 u_matrix;
 
void main() {
  // Multiply the position by the matrix.
    gl_Position = vec4((u_matrix * vec3(a_position.xy,1.0)), 1.0);
}
`;
