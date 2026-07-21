const fs = require("node:fs");
const path = require("node:path");

const {
  initializeApp,
  cert,
  deleteApp,
} = require("firebase-admin/app");

const {
  getFirestore,
  Timestamp,
  GeoPoint,
  DocumentReference,
} = require("firebase-admin/firestore");

const rutaCredencial = path.join(
  __dirname,
  "..",
  "serviceAccountKey.json"
);

const carpetaSalida = path.join(
  __dirname,
  "..",
  "exportacion-firestore"
);

function cargarCredencial() {
  if (!fs.existsSync(rutaCredencial)) {
    throw new Error(
      "No se encontró serviceAccountKey.json en la raíz del proyecto."
    );
  }

  const contenido = fs.readFileSync(rutaCredencial, "utf8");
  return JSON.parse(contenido);
}

function convertirValor(valor) {
  if (valor === null || valor === undefined) {
    return valor;
  }

  if (valor instanceof Timestamp) {
    return {
      tipo: "Timestamp",
      valor: valor.toDate().toISOString(),
    };
  }

  if (valor instanceof GeoPoint) {
    return {
      tipo: "GeoPoint",
      latitud: valor.latitude,
      longitud: valor.longitude,
    };
  }

  if (valor instanceof DocumentReference) {
    return {
      tipo: "DocumentReference",
      ruta: valor.path,
    };
  }

  if (Buffer.isBuffer(valor)) {
    return {
      tipo: "Bytes",
      valor: valor.toString("base64"),
    };
  }

  if (Array.isArray(valor)) {
    return valor.map(convertirValor);
  }

  if (typeof valor === "object") {
    const objetoConvertido = {};

    for (const [clave, valorInterno] of Object.entries(valor)) {
      objetoConvertido[clave] = convertirValor(valorInterno);
    }

    return objetoConvertido;
  }

  return valor;
}

async function exportarColeccion(referenciaColeccion) {
  const snapshot = await referenciaColeccion.get();
  const documentos = [];

  for (const documento of snapshot.docs) {
    const subcolecciones = await documento.ref.listCollections();
    const datosSubcolecciones = {};

    for (const subcoleccion of subcolecciones) {
      datosSubcolecciones[subcoleccion.id] =
        await exportarColeccion(subcoleccion);
    }

    documentos.push({
      id: documento.id,
      ruta: documento.ref.path,
      datos: convertirValor(documento.data()),
      subcolecciones: datosSubcolecciones,
    });
  }

  return documentos;
}

async function iniciarExportacion() {
  let app;

  try {
    console.log("Leyendo credencial de Firebase...");

    const serviceAccount = cargarCredencial();

    app = initializeApp({
      credential: cert(serviceAccount),
      projectId: serviceAccount.project_id,
    });

    const db = getFirestore(app);

    console.log(
      `Conectando con el proyecto: ${serviceAccount.project_id}`
    );

    fs.mkdirSync(carpetaSalida, {
      recursive: true,
    });

    const colecciones = await db.listCollections();

    if (colecciones.length === 0) {
      console.log("No se encontraron colecciones en Firestore.");
      return;
    }

    console.log(
      `Se encontraron ${colecciones.length} colecciones.\n`
    );

    const baseCompleta = {
      proyecto: serviceAccount.project_id,
      fechaExportacion: new Date().toISOString(),
      totalColecciones: colecciones.length,
      colecciones: {},
    };

    for (const coleccion of colecciones) {
      console.log(`Exportando: ${coleccion.id}`);

      const datos = await exportarColeccion(coleccion);

      baseCompleta.colecciones[coleccion.id] = datos;

      const rutaArchivo = path.join(
        carpetaSalida,
        `${coleccion.id}.json`
      );

      fs.writeFileSync(
        rutaArchivo,
        JSON.stringify(datos, null, 2),
        "utf8"
      );

      console.log(
        `✓ ${coleccion.id}: ${datos.length} documentos`
      );
    }

    const rutaCompleta = path.join(
      carpetaSalida,
      "base-datos-completa.json"
    );

    fs.writeFileSync(
      rutaCompleta,
      JSON.stringify(baseCompleta, null, 2),
      "utf8"
    );

    console.log("\nExportación finalizada correctamente.");
    console.log(`Archivos guardados en: ${carpetaSalida}`);
  } catch (error) {
    console.error("\nError al exportar Firestore:");
    console.error(error.message);

    if (
      error.code === 7 ||
      error.code === "permission-denied"
    ) {
      console.error(
        "La cuenta de servicio no tiene permisos para leer Firestore."
      );
    }

    process.exitCode = 1;
  } finally {
    if (app) {
      await deleteApp(app);
    }
  }
}

iniciarExportacion();