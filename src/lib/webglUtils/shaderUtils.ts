const loadShader = (
  gl: WebGL2RenderingContext,
  type: GLenum,
  source: string
) => {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Could not Create shader");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(shader), "gl.getShaderInfoLog(shader)");
    gl.deleteShader(shader);
    throw new Error("could not compile shader:" + gl.getShaderInfoLog(shader));
  }
  return shader;
};
export { loadShader };
