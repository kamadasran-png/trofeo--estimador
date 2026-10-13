# Trofeo Estimador — Peña Jabalí Hunters (MVP 0.1)

PWA estática en español para estimación orientativa de ciervo, jabalí y macho montés.

## Ejecutar localmente

Los service workers no funcionan desde `file://`. Para probar la app, sirve la carpeta con un servidor HTTP local, por ejemplo:

```bash
python -m http.server 8000
```

Después abre `http://localhost:8000` en el navegador.

## Publicar en GitHub Pages

1. Crea un repositorio independiente, por ejemplo `trofeo-estimador`.
2. Sube el contenido de esta carpeta a la raíz del repositorio.
3. En **Settings → Pages**, selecciona **Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Espera a que termine el despliegue y abre la URL publicada por GitHub.
5. En Android, abre esa URL en Chrome y selecciona **Instalar aplicación** o **Añadir a pantalla de inicio**.

## Alcance actual

- Cálculo local para tres especies.
- Ajuste experimental seleccionable de 0 %, 1,5 % o 2 %.
- Fichas guardadas en `localStorage` y exportación JSON.
- Service worker para caché básica offline tras la primera visita online.
- Sin servidor, cuentas, pagos, sincronización ni captura de fotos en esta iteración.

## Aviso técnico

Las fórmulas y los umbrales son los valores simplificados facilitados para el prototipo. No se han validado contra el CIC ni contra una muestra de trofeos homologados. Las categorías mostradas son orientativas, no homologaciones. El ajuste por preparación es experimental y debe validarse antes de cualquier uso comercial.

## Próximas tareas

1. Contrastar resultados con una muestra real de trofeos y registrar el error de estimación.
2. Revisar rangos de entrada con un especialista por especie.
3. Añadir guías visuales originales de medición y fotografías a cada ficha.
4. Probar instalación y funcionamiento offline en Android real.
5. Antes de comercializar, definir privacidad, exportación/borrado de datos, soporte y política de versiones.
