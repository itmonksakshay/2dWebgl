import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { useCanvasResizer } from './hooks/useCanvasResizer'
import { Header } from './components/organisms/Header'
import { Footer } from './components/organisms/Footer'
import { OperationSideBar } from './components/organisms/Sidebars/OperationSIderBar'
import { vertexShaderSource } from './lib/shaders/vertexShaders';
import { fragmentShaderSource } from './lib/shaders/fragmentShaders'
import { loadShader } from './lib/webglUtils/shaderUtils'
import { createProgram } from './lib/webglUtils/progamUtils'
import { createLetterF } from './lib/models/rectangleModel'
import { RightOperationSidebar } from './components/organisms/Sidebars/RightOperationSideBar'
import { mat3 } from './lib/webglUtils/mat3'

type TGlLocationsTypes = {
  positionAttributeLocation: GLint,
  resolutionUniformLocation: WebGLUniformLocation,
  colorLocation: WebGLUniformLocation,
  matrixLocation: WebGLUniformLocation
}

type TProgramInfoTypes = {
  glCtx: WebGL2RenderingContext,
  buffer: WebGLBuffer,
  vao: WebGLVertexArrayObject,
  program: WebGLProgram
};

function App() {
  const [translations, setTranslations] = useState<[number, number]>([0, 1])
  const [rotation, setRotation] = useState<[number, number]>([0, 1])
  const [rectWidth, setRectWidth] = useState<number>(50)
  const [rectHeight, setRectHeight] = useState<number>(100)
  const [scale, setScalling] = useState<[number, number]>([1, 1])
  const { isReady, canvasRef, dimensions } = useCanvasResizer()
  const glLocationsRef = useRef<TGlLocationsTypes | null>(null)
  const programInfoRef = useRef<TProgramInfoTypes | null>(null)

  const vertices = useMemo(() => {
    // Generate rectangle at fixed origin; translation uniform will move it on screen
    return createLetterF()
  }, [])
  const vertexCount = useMemo(() => vertices.length / 3, [vertices])

  const drawCanvas = useCallback((translations: [number, number], rotation: [number, number], scale: [number, number]) => {
    const programInfo = programInfoRef.current
    const glLocations = glLocationsRef.current
    if (!programInfo || !glLocations) return

    const { glCtx, program, vao } = programInfo
    const { resolutionUniformLocation, colorLocation, matrixLocation } = glLocations

    glCtx.useProgram(program)
    glCtx.bindVertexArray(vao)
    // VAO already remembers bound buffer and attribute pointers

    // Pass canvas resolution
    glCtx.uniform2f(resolutionUniformLocation, dimensions.width, dimensions.height)

    // Random color each draw
    const color = [Math.random(), Math.random(), Math.random(), 1]
    glCtx.uniform4fv(colorLocation, color);

    const translate = mat3.translation(translations);
    const rotate = mat3.radianRotation(rotation);
    const scaling = mat3.scaling(scale);

    let matrix = mat3.multiply(translate, rotate);
    matrix = mat3.multiply(matrix, scaling)
    // Set Rotation
    glCtx.uniformMatrix3fv(matrixLocation, false, matrix);

    // Clear and draw
    glCtx.viewport(0, 0, dimensions.width, dimensions.height)
    glCtx.clearColor(0.0, 0.0, 0.0, 1.0)
    glCtx.clear(glCtx.COLOR_BUFFER_BIT | glCtx.DEPTH_BUFFER_BIT)

    glCtx.drawArrays(glCtx.TRIANGLES, 0, vertexCount)

    glCtx.bindVertexArray(null)
  }, [dimensions, vertexCount])

  useEffect(() => {
    if (!canvasRef.current || !isReady) return
    const canvas = canvasRef.current

    const glCtx = canvas.getContext('webgl2')
    if (!glCtx) {
      alert('❌ WebGL2 not supported in this browser.')
      return
    }

    const vertexShader = loadShader(glCtx, glCtx.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = loadShader(glCtx, glCtx.FRAGMENT_SHADER, fragmentShaderSource)
    const program = createProgram(glCtx, vertexShader, fragmentShader)
    const positionAttributeLocation = glCtx.getAttribLocation(program, "a_position")
    const resolutionUniformLocation = glCtx.getUniformLocation(program, "u_resolution")
    const colorLocation = glCtx.getUniformLocation(program, "u_color")
    const matrixLocation = glCtx.getUniformLocation(program, "u_matrix")

    const vao = glCtx.createVertexArray()
    const buffer = glCtx.createBuffer()
    glCtx.bindVertexArray(vao)
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buffer)
    // Upload static vertex data once and configure attribute pointer
    glCtx.bufferData(glCtx.ARRAY_BUFFER, new Float32Array(vertices), glCtx.STATIC_DRAW)
    glCtx.enableVertexAttribArray(positionAttributeLocation)
    glCtx.vertexAttribPointer(positionAttributeLocation, 3, glCtx.FLOAT, false, 0, 0)
    glCtx.bindVertexArray(null)
    if (resolutionUniformLocation && colorLocation && matrixLocation) {
      programInfoRef.current = { glCtx, buffer: buffer!, vao: vao!, program }
      glLocationsRef.current = { positionAttributeLocation, resolutionUniformLocation, matrixLocation, colorLocation }
    }

    return () => {
      if (buffer) glCtx.deleteBuffer(buffer)
      if (vao) glCtx.deleteVertexArray(vao)
      if (program) glCtx.deleteProgram(program)
      programInfoRef.current = null
      glLocationsRef.current = null
    }
  }, [isReady, canvasRef, vertices])

  // Update GPU vertex buffer when rectangle size changes
  useEffect(() => {
    const programInfo = programInfoRef.current
    if (!programInfo) return
    const { glCtx, vao, buffer } = programInfo
    glCtx.bindVertexArray(vao)
    glCtx.bindBuffer(glCtx.ARRAY_BUFFER, buffer)
    glCtx.bufferData(glCtx.ARRAY_BUFFER, new Float32Array(vertices), glCtx.STATIC_DRAW)
    glCtx.bindVertexArray(null)
  }, [vertices])

  useEffect(() => {
    if (programInfoRef.current && glLocationsRef.current) {
      drawCanvas(translations, rotation, scale)
    }
  }, [translations, drawCanvas, rotation, scale])

  // Clamp translations when canvas size or rectangle size changes
  useEffect(() => {
    const maxX = Math.max(0, dimensions.width - rectWidth)
    const maxY = Math.max(0, dimensions.height - rectHeight)
    setTranslations((prev) => {
      const clampedX = Math.min(Math.max(prev[0], 0), maxX)
      const clampedY = Math.min(Math.max(prev[1], 0), maxY)
      if (clampedX === prev[0] && clampedY === prev[1]) return prev
      return [clampedX, clampedY]
    })
  }, [rectHeight, rectWidth, dimensions])


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900">
      {/* 🧭 Header */}
      <Header />

      {/* 🌟 Main Canvas Section */}
      <main className="px-4 py-8 w-full">
        {/* 3-Panel Section with Canvas */}
        <section className="flex  gap-4 min-h-[80vh]">
          {/* Left Panel */}
          <div className="basis-1/3 bg-indigo-100 border-2 border-indigo-400 rounded-md p-4 flex flex-col justify-center shadow-md">
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">
              Operations
            </h2>
            <OperationSideBar
              translations={translations}
              setTranslations={setTranslations}
              rectWidth={rectWidth}
              rectHeight={rectHeight}
              setRectWidth={setRectWidth}
              setRectHeight={setRectHeight}
              setRotation={setRotation}
              maxX={Math.max(0, dimensions.width - rectWidth)}
              maxY={Math.max(0, dimensions.height - rectHeight)}
            />
          </div>

          {/* Canvas Panel */}
          <div className="basis-2/3 relative border-2 border-purple-500 rounded-md overflow-hidden bg-black shadow-lg">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              WebGL Canvas Area
            </div>
          </div>

          {/* Right Panel */}
          <RightOperationSidebar setScaling={setScalling} />
        </section>
      </main>

      {/* 📞 Footer */}
      <Footer />
    </div>
  );
}

export default App
