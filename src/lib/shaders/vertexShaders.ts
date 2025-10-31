export const vertexShaderSource = `#version 300 es
in vec3 a_position;

uniform vec2 u_resolution;
uniform vec2 u_translation;
uniform vec2 u_rotation;
uniform vec2 u_scale;

void main() {

    // scaling
    vec2 scaledPosition = a_position.xy * u_scale;
    // Add a rotation to x and y
      vec2 rotatedPosition = vec2(
     scaledPosition.x * u_rotation.y + scaledPosition.y * u_rotation.x,
     scaledPosition.y * u_rotation.y - scaledPosition.x * u_rotation.x);
    // Add translation to x and y
    vec2 position = rotatedPosition + u_translation;

    vec2 zeroToOne = position / u_resolution;

    vec2 clipSpace = (zeroToOne * 2.0) - 1.0;

    // Flip Y and pass Z from a_position.z
    gl_Position = vec4(clipSpace * vec2(1, -1), a_position.z, 1.0);
}
`;
