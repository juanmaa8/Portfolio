# Juan Manuel Garcia - Portfolio

Este proyecto está construido con React.

## Instrucciones para subir a GitHub / Producción

Para que las imágenes y el PDF funcionen correctamente cuando despliegues este proyecto (en Vercel, Netlify o GitHub Pages), debes seguir estos pasos:

### 1. Estructura de Carpetas

Asegúrate de que tus archivos estáticos estén dentro de la carpeta `public` en la raíz de tu proyecto React:

```
mi-proyecto/
├── src/
│   └── App.tsx
├── public/
│   ├── files/
│   │   └── Juan_Manuel_Garcia_Resume.pdf
│   └── images/
│       ├── executive-overview.png
│       ├── regional-performance.png
│       └── ... (resto de imágenes)
├── package.json
└── ...
```

### 2. Actualizar el código (App.tsx)

He dejado las líneas comentadas en `App.tsx` para que te sea fácil cambiarlo.

1. Abre `App.tsx`.
2. Busca la sección `const projects = [...]`.
3. Cambia las URLs de Unsplash por tus rutas locales.
   
   *Cambiar esto:*
   ```javascript
   gallery: [
      "https://images.unsplash.com/..." 
   ]
   ```
   
   *Por esto:*
   ```javascript
   gallery: [
      "/images/executive-overview.png",
      "/images/regional-performance.png"
   ]
   ```

### 3. El PDF

El botón de descarga ya apunta a `/files/Juan_Manuel_Garcia_Resume.pdf`. 
Si colocas tu PDF en `public/files/Juan_Manuel_Garcia_Resume.pdf`, funcionará automáticamente.
