// Recibe el formulario de registro de prestadores y lo reenvía al Apps Script
// "Tito - Registro de prestadores", que guarda la fila en la planilla
// Base_Tito_unificada (pestaña PRESTADORES) y las fotos en Drive.
//
// La dirección del Apps Script y la clave viven en variables de entorno de Vercel
// (TITO_SCRIPT_URL y TITO_REGISTRATION_SECRET). Nunca se mandan al navegador.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'method' });

  const scriptUrl = process.env.TITO_SCRIPT_URL;
  const secret = process.env.TITO_REGISTRATION_SECRET;
  if (!scriptUrl || !secret) return send(res, 500, { ok: false, error: 'config' });

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (_) { return send(res, 400, { ok: false, error: 'json' }); }
  }
  const registration = body && body.registration;
  if (!registration || typeof registration !== 'object' || !UUID.test(String(registration.id || ''))) {
    return send(res, 400, { ok: false, error: 'datos' });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 50000);
  try {
    // Apps Script responde con una redirección: fetch la sigue y trae la respuesta final.
    const upstream = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, registration }),
      redirect: 'follow',
      signal: controller.signal,
    });
    const text = await upstream.text();
    let result = null;
    try { result = JSON.parse(text); } catch (_) { /* respuesta no JSON */ }
    if (result && result.ok === true && result.id === registration.id) {
      return send(res, 200, { ok: true, id: registration.id });
    }
    return send(res, 502, { ok: false, error: 'guardado' });
  } catch (_) {
    return send(res, 504, { ok: false, error: 'conexion' });
  } finally {
    clearTimeout(timer);
  }
};
