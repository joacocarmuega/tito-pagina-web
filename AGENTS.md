# Instrucciones para la IA que edite esta página

Esta es la página web de **Tito** para prestadores de servicio de los barrios Galápagos y Las Liebres.
Está online en **https://tito-prestadores.vercel.app**.

Quienes te piden cambios son Joaquín y Santi, los dueños del proyecto. **No son programadores.**
Hablales en español rioplatense, simple, sin tecnicismos.

## Cómo está hecha

- Toda la página es un solo archivo: `index.html` (HTML + CSS + un poco de JavaScript, sin frameworks ni build).
- `tito.webp` es el personaje de la marca (el hombre con gorra verde). No lo borres ni lo reemplaces sin que te lo pidan.
- El logo "Tito" con la sonrisa verde está dibujado en SVG dentro de `index.html` (arriba y en el pie). No lo quites.
- `registro.html` es el formulario de inscripción de prestadores (se abre desde la página principal). Al enviarlo, manda los datos a `api/registro.js`, que los reenvía al Apps Script "Tito - Registro de prestadores": este guarda una fila en la planilla Base_Tito_unificada (pestaña PRESTADORES, Estado = Pendiente) y las fotos en Drive. La dirección del Apps Script y la clave están en variables de entorno de Vercel (`TITO_SCRIPT_URL`, `TITO_REGISTRATION_SECRET`): **nunca las pongas en el código**. No cambies los nombres de los campos que se mandan sin revisar también el Apps Script.
- La página está conectada a Vercel: **cada cambio que se guarda en la rama `main` se publica solo en 1 o 2 minutos.** No hace falta hacer nada en Vercel.

## Cómo trabajar

1. Antes de tocar nada, asegurate de tener la última versión de `main` (otra persona puede haber cambiado algo).
2. Hacé **solo el cambio que te pidieron**. No reescribas ni "mejores" otras partes.
3. Cambios chicos y precisos: editá el texto o el bloque puntual, no regeneres el archivo entero.
4. Mantené el estilo: colores verde oscuro `#12301F`, verde `#4FA64F`, verde claro `#E3EFDF`, fondo `#F4F7F2`; tipografías Bricolage Grotesque (títulos) y Figtree (texto).
5. Revisá que la página siga funcionando en celular (la mayoría de los prestadores la abren desde el teléfono).
6. Guardá el cambio en `main` con un mensaje claro en español, por ejemplo: `Cambia el teléfono de Santi`.
7. Al terminar, decile a la persona en una o dos frases qué cambiaste y que en 1–2 minutos lo ve en https://tito-prestadores.vercel.app (puede tener que recargar).

## Cosas que NO hay que cambiar sin que lo pidan explícitamente

- Los teléfonos de contacto: Joaquín (Las Liebres) +54 9 11 2749-2650 y Santi (Galápagos) +54 9 11 6798-1096, ni los links de WhatsApp.
- La respuesta "¿Cuesta algo estar en Tito?" → "No. Estar en Tito es gratis." (no agregar que está en etapa de prueba).
- No poner apellidos de Joaquín ni de Santi.
- El video de YouTube embebido en la sección "Avisos de llegada".

## Si algo sale mal

Si un cambio rompe la página, volvé a la versión anterior del archivo (revertí el último commit) y avisá.
