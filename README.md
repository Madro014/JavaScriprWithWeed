# Proyecto Gemini API con FastAPI

Este proyecto es una aplicación FastAPI que integra la API de Gemini para diversas funcionalidades, incluyendo la obtención de pronósticos del clima, la generación de imágenes con Pollinations.ai y la edición de imágenes con el modelo `gemini-2.5-flash-image`.

## Requisitos

Asegúrate de tener Python 3.8 o superior instalado.

## Configuración del Entorno

1.  **Clonar el repositorio (si aplica):**
    ```bash
    git clone <https://github.com/Madro014/JavaScriprWithWeed/tree/pythonbackend>
    cd geminiapi
    ```

2.  **Crear y activar un entorno virtual:**
    ```bash
    python -m venv venv
    # En Windows
    .\venv\Scripts\activate
    # En macOS/Linux
    source venv/bin/activate
    ```

3.  **Instalar las dependencias:**
    ```bash
    pip install -r requirements.txt
    ```
    Si no tienes un `requirements.txt`, puedes instalar las dependencias manualmente:
    ```bash
    pip install fastapi uvicorn google-generativeai requests Pillow
    ```

4.  **Configurar la clave API de Gemini:**
    Asegúrate de tener tu clave API de Google AI Studio (Gemini) configurada como una variable de entorno llamada `GEMINI_API_KEY`. Puedes obtener una clave en [Google AI Studio](https://aistudio.google.com/app/apikey).

    **En Windows (CMD):**
    ```bash
    set GEMINI_API_KEY="TU_CLAVE_API_AQUI"
    ```
    **En Windows (PowerShell):**
    ```bash
    $env:GEMINI_API_KEY="TU_CLAVE_API_AQUI"
    ```
    **En macOS/Linux:**
    ```bash
    export GEMINI_API_KEY="TU_CLAVE_API_AQUI"
    ```
    **Nota:** Para que la variable de entorno persista, deberías añadirla a tu archivo de configuración de shell (por ejemplo, `.bashrc`, `.zshrc`, `config.fish` o variables de entorno del sistema).

## Ejecutar la Aplicación

Para iniciar el servidor FastAPI, ejecuta el siguiente comando desde la raíz del proyecto:

```bash
uvicorn main:app --reload
```

El servidor se ejecutará en `http://127.0.0.1:8000`. El flag `--reload` permite que el servidor se reinicie automáticamente al detectar cambios en el código.

## Endpoints de la API

La aplicación expone los siguientes endpoints:

### 1. Obtener Pronóstico del Clima

-   **URL:** `/crear-tiempo`
-   **Método:** `POST`
-   **Descripción:** Obtiene el pronóstico del clima para una ciudad específica utilizando la API de Gemini.
-   **Cuerpo de la Solicitud (JSON):**
    ```json
    {
        "city": "NombreDeLaCiudad"
    }
    ```
-   **Ejemplo de `curl`:**
    ```bash
    curl -X POST "http://127.0.0.1:8000/crear-tiempo" \
         -H "Content-Type: application/json" \
         -d '{"city": "Madrid"}'
    ```
-   **Respuesta de Ejemplo:**
    ```json
    {
        "weather": "Clima: Soleado   Fecha: 25/07/2024   Hora: 10:30"
    }
    ```

### 2. Generar Imagen

-   **URL:** `/generar-imagen`
-   **Método:** `POST`
-   **Descripción:** Genera una URL de imagen a partir de un prompt utilizando Pollinations.ai.
-   **Cuerpo de la Solicitud (JSON):**
    ```json
    {
        "prompt": "Descripción de la imagen a generar"
    }
    ```
-   **Ejemplo de `curl`:**
    ```bash
    curl -X POST "http://127.0.0.1:8000/generar-imagen" \
         -H "Content-Type: application/json" \
         -d '{"prompt": "un gato astronauta flotando en el espacio"}'
    ```
-   **Respuesta de Ejemplo:**
    ```json
    {
        "image_url": "https://image.pollinations.ai/prompt/un-gato-astronauta-flotando-en-el-espacio-..."
    }
    ```

### 3. Editar Imagen

-   **URL:** `/editar-imagen`
-   **Método:** `POST`
-   **Descripción:** Edita una imagen existente (proporcionada por URL) utilizando el modelo `gemini-2.5-flash-image` de Gemini y un prompt de edición. Devuelve la imagen editada en formato base64.
-   **Cuerpo de la Solicitud (JSON):**
    ```json
    {
        "image_url": "URL_DE_LA_IMAGEN_A_EDITAR",
        "edit_prompt": "Instrucción de edición para la imagen"
    }
    ```
-   **Ejemplo de `curl`:**
    ```bash
    curl -X POST "http://127.0.0.1:8000/editar-imagen" \
         -H "Content-Type: application/json" \
         -d '{
               "image_url": "https://image.pollinations.ai/prompt/un-perro-jugando-en-un-parque",
               "edit_prompt": "Cambia el perro por un gato y haz que el parque sea un bosque nevado."
             }'
    ```
-   **Respuesta de Ejemplo:**
    ```json
    {
        "edited_image_base64": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
    }
    ```
    **Nota:** La respuesta `edited_image_base64` contendrá una cadena muy larga que representa la imagen editada en formato base64. Puedes decodificarla y guardarla como un archivo de imagen o mostrarla en una aplicación web.

---