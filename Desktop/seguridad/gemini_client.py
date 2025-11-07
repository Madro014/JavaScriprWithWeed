import requests
import google.generativeai as genai

genai.configure(api_key="AIzaSyAtVkxL02EVWIBIgIZAHbzDa1-HM9SJYBE")

def generar_descripcion(nombre_producto: str) -> str:
    model = genai.GenerativeModel('gemini-2.5-flash')
    prompt = f"Genera una descripción de marketing atractiva de un solo párrafo para el producto: {nombre_producto}."
    response = model.generate_content(prompt)
    return response.text

def generar_imagen(nombre_producto: str) -> str:
    prompt = f"A high-quality image of {nombre_producto}"
    response = requests.get(f"https://pollinations.ai/prompt/{prompt}")
    if response.status_code == 200:
        return response.url
    return "https://via.placeholder.com/150"