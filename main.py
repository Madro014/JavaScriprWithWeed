from fastapi import FastAPI
from pydantic import BaseModel
from gemini_client import WeatherService, ImageService

app = FastAPI()

weather_service = WeatherService()
image_service = ImageService()


class CityRequest(BaseModel):
    city: str


class ImageRequest(BaseModel):
    prompt: str


class ImageEditRequest(BaseModel):
    image_url: str
    edit_prompt: str


@app.post("/crear-tiempo")
async def create_weather(request: CityRequest):
    weather_info = weather_service.get_weather_and_time(request.city)
    return {"weather": weather_info}


@app.post("/generar-imagen")
async def generate_image_endpoint(request: ImageRequest):
    image_url = image_service.generate_image(request.prompt)
    return {"image_url": image_url}


@app.post("/editar-imagen")
async def edit_image_endpoint(request: ImageEditRequest):
    edited_image_response = image_service.edit_image(request.image_url, request.edit_prompt)
    return {"edited_image_base64": edited_image_response}
