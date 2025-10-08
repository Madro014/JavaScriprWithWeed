import os
import google.generativeai as genai
from datetime import datetime
import uuid
import requests
from PIL import Image
import io
import base64
class WeatherService:
    """Servicio para obtener pronósticos del clima usando Gemini."""
    
    def __init__(self):
        self.google_api_key = "AIzaSyAtVkxL02EVWIBIgIZAHbzDa1-HM9SJYBE"
        genai.configure(api_key=self.google_api_key)

    
    def get_weather_and_time(self, city: str) -> str:
        """
        Genera un pronóstico del clima con formato específico para una ciudad usando Gemini.
        
        Args:
            city: Nombre de la ciudad para el pronóstico
            
        Returns:
            String con el pronóstico formateado o mensaje de error
        """
        try:
            model = genai.GenerativeModel("gemini-2.5-flash")
            now = datetime.now()
            fecha_formateada = now.strftime("%d/%m/%Y")
            hora_formateada = now.strftime("%H:%M")
            
            prompt = (
                f"Proporciona SOLO el clima actual para {city} en este formato exacto:\n"
                f"Clima: [condición climática]   Fecha: {fecha_formateada}   Hora: {hora_formateada}\n\n"
                f"Ejemplo: Clima: LLoviendo   Fecha: {fecha_formateada}   Hora: {hora_formateada}\n"
                f"Responde únicamente con esa línea, sin explicaciones adicionales."
            )
            
            response = model.generate_content(prompt)
            return response.text.strip()
            
        except Exception as e:
            return f"Error al generar el pronóstico del clima con Gemini para {city}: {e}"


class ImageService:
    """Servicio para generar imágenes usando Pollinations.ai y editar imágenes con Gemini."""

    def __init__(self):
        self.google_api_key = "AIzaSyAtVkxL02EVWIBIgIZAHbzDa1-HM9SJYBE"
        genai.configure(api_key=self.google_api_key)

    def generate_image(self, prompt: str) -> str:
        """
        Genera una URL de imagen a partir de un prompt usando Pollinations.ai.

        Args:
            prompt: Descripción de la imagen a generar.

        Returns:
            URL de la imagen generada.
        """
        # Asegura prompts únicos para evitar el caché y formatea el prompt para la URL
        formatted_prompt = prompt.replace(" ", "-") + "-" + str(uuid.uuid4())
        image_url = f"https://image.pollinations.ai/prompt/{formatted_prompt}"
        return image_url

    def edit_image(self, image_url: str, edit_prompt: str) -> str:
        """
        Edita una imagen descargada de una URL usando el modelo gemini-2.5-flash-image.

        Args:
            image_url (str): URL de la imagen a editar.
            edit_prompt (str): Instrucción de texto para la edición (ej. "Añade un sombrero rojo al gato").

        Returns:
            str: La imagen editada en formato base64 o un mensaje de error.
        """
        try:
            # 1. Descargar la imagen de entrada
            response = requests.get(image_url)
            response.raise_for_status()  # Lanza una excepción para códigos de estado HTTP erróneos
            image_data = response.content

            img_original = Image.open(io.BytesIO(image_data))
            print(f"Imagen original descargada desde: {image_url}")

            # 2. Definir el contenido de la solicitud
            contents = [
                img_original,
                edit_prompt
            ]

            # 3. Llamar al modelo de edición de imágenes
            print("Enviando solicitud de edición a Gemini. Esto puede tardar unos segundos...")
            model = genai.GenerativeModel("gemini-2.5-flash-image") # Usar el modelo correcto
            response = model.generate_content(contents)

            # 4. Procesar y devolver la imagen de respuesta en base64
            if response.candidates and response.candidates[0].content and response.candidates[0].content.parts:
                for part in response.candidates[0].content.parts:
                    if part.inline_data is not None:
                        imagen_editada_bytes = part.inline_data.data
                        # Codificar la imagen editada a base64
                        encoded_image = base64.b64encode(imagen_editada_bytes).decode('utf-8')
                        print(f" Edición completada.")
                        return encoded_image

                print(" La respuesta no contenía una imagen editada.")
                return "Error: La respuesta del modelo no contenía una imagen editada."
            else:
                print(" Respuesta del modelo vacía o incompleta.")
                return "Error: Respuesta del modelo vacía o incompleta."

        except requests.exceptions.RequestException as e:
            return f"Error al descargar la imagen: {e}"
        except Exception as e:
            return f"Ocurrió un error durante la edición: {e}"
