# WebGL 2D Programming Playground

An interactive WebGL2-based 2D graphics playground built with React and TypeScript. This project demonstrates real-time 2D transformations including translation, rotation, and scaling through an intuitive UI interface.

## 🎯 Features

- **Interactive 2D Graphics**: Render and manipulate 2D shapes using WebGL2
- **Real-time Transformations**:
  - **Translation**: Move objects along X and Y axes with sliders
  - **Rotation**: Interactive circular rotation control
  - **Scaling**: Scale objects on X and Y axes independently
- **Dynamic Canvas**: Responsive canvas that adapts to window resizing
- **Optimized Rendering**: Efficient WebGL setup with Vertex Array Objects (VAO) and minimal re-renders
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Type-Safe**: Full TypeScript support for better developer experience

## 🛠️ Technologies

- **React 19** - UI framework
- **TypeScript** - Type safety
- **WebGL2** - GPU-accelerated graphics rendering
- **GLSL** - Shader programming (vertex and fragment shaders)
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library (Slider, Input, Switch)
- **Radix UI** - Accessible component primitives

## 📁 Project Structure

```
src/
├── components/
│   ├── organisms/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebars/
│   │   │   ├── OperationSIderBar.tsx    # Left sidebar with translation/rotation controls
│   │   │   └── RightOperationSideBar.tsx # Right sidebar with scaling controls
│   │   └── RotateCricle/
│   │       └── RotateCircle.tsx          # Interactive rotation control
│   └── ui/
│       ├── slider.tsx                    # shadcn slider component
│       ├── input.tsx                     # shadcn input component
│       └── switch.tsx                   # shadcn switch component
├── hooks/
│   └── useCanvasResizer.ts              # Canvas resize hook
├── lib/
│   ├── models/
│   │   └── rectangleModel.ts            # Geometry generation (letter F, rectangles)
│   ├── shaders/
│   │   ├── vertexShaders.ts             # Vertex shader with transformations
│   │   └── fragmentShaders.ts           # Fragment shader for coloring
│   └── webglUtils/
│       ├── shaderUtils.ts               # Shader loading utilities
│       └── progamUtils.ts               # WebGL program creation utilities
└── App.tsx                              # Main application component
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A modern browser with WebGL2 support (Chrome, Firefox, Safari, Edge)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 2d-programing
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## 💻 Usage

### Controls

**Left Sidebar - Transformations:**
- **Width/Height Inputs**: Adjust the dimensions of the rectangle (currently displays letter "F")
- **X/Y Axis Sliders**: Translate the object horizontally and vertically
- **Rotation Circle**: Click and drag on the circular control to rotate the object

**Right Sidebar - Scaling:**
- **Scale Controls**: Adjust X and Y scale independently

### WebGL Features

The application uses WebGL2 with the following shader uniforms:
- `u_resolution`: Canvas dimensions for pixel-to-clipspace conversion
- `u_translation`: 2D translation vector
- `u_rotation`: 2D rotation vector (normalized)
- `u_scale`: 2D scale vector
- `u_color`: RGBA color uniform

Transformations are applied in the vertex shader in this order:
1. Scale
2. Rotation
3. Translation

## 🏗️ Architecture Highlights

### Performance Optimizations

1. **React Optimization**:
   - `useMemo` for static vertex data
   - `useCallback` for draw function to prevent unnecessary re-renders
   - `React.memo` for sidebar components
   - Refs for WebGL resources to avoid React state updates

2. **WebGL Optimization**:
   - Vertex Array Objects (VAO) to cache buffer and attribute state
   - Static vertex buffer upload (only updates when geometry changes)
   - Efficient uniform updates (only changes are sent to GPU)
   - Proper resource cleanup on unmount

3. **Rendering**:
   - Draw calls only triggered when transformation state changes
   - Canvas auto-resizes with window dimensions
   - Translation clamping to keep objects within canvas bounds

### Code Organization

- **Separation of Concerns**: UI components, WebGL utilities, and shaders are separated
- **Type Safety**: Full TypeScript coverage with proper WebGL types
- **Reusable Utilities**: Shader and program utilities can be reused for other WebGL projects
- **Component-Based**: Modular React components for easy maintenance

## 🎨 Shader Details

### Vertex Shader
The vertex shader performs all transformations on the GPU:
- Scales vertices by `u_scale`
- Rotates vertices using rotation matrix from `u_rotation`
- Translates vertices by `u_translation`
- Converts from pixel coordinates to clip space

### Fragment Shader
Simple fragment shader that applies a uniform color (`u_color`) to all fragments.

## 🔧 Configuration

### Canvas Dimensions
Canvas dimensions are automatically calculated based on the container size using the `useCanvasResizer` hook. The canvas maintains aspect ratio and responds to window resizing.

### Translation Limits
Translation sliders automatically adjust their maximum values based on:
- Canvas width/height
- Object width/height

This ensures objects stay within visible bounds.

## 📝 Development

### Adding New Shapes

To add a new shape, create a function in `src/lib/models/rectangleModel.ts`:

```typescript
export const createMyShape = () => {
  return [
    // Triangle example
    0, 0, 0,
    50, 0, 0,
    25, 50, 0,
  ];
};
```

Then use it in `App.tsx`:
```typescript
const vertices = useMemo(() => {
  return createMyShape()
}, [])
```

### Adding New Transformations

1. Add uniform location to `TGlLocationsTypes` in `App.tsx`
2. Get uniform location in initialization effect
3. Pass uniform value in `drawCanvas` function
4. Update vertex shader to use the new uniform
5. Add UI controls in sidebar components

## 🐛 Troubleshooting

**WebGL2 not supported:**
- Ensure you're using a modern browser
- Check browser WebGL support: https://get.webgl.org/

**Canvas not rendering:**
- Check browser console for errors
- Verify shader compilation (check browser console)
- Ensure canvas element is properly mounted

**Performance issues:**
- Check if objects are being re-rendered unnecessarily
- Verify vertex buffer isn't being re-uploaded every frame
- Use browser DevTools Performance tab to profile

## 📚 Learning Resources

This project demonstrates:
- WebGL2 fundamentals
- GLSL shader programming
- React performance optimization
- GPU-accelerated 2D graphics
- Transformation matrices

## 🚧 Future Improvements

- [ ] Add more shape primitives (circles, polygons)
- [ ] Color picker for custom colors
- [ ] Animation system
- [ ] Save/load configurations
- [ ] Multi-object support
- [ ] Texture mapping
- [ ] Post-processing effects

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using WebGL2, React, and TypeScript
