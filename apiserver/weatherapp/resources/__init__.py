from flask_restful import Api

from .weather import Weather
from .citylist import CityList

api = Api(prefix="/v1")
api.add_resource(Weather, "/weather")
api.add_resource(CityList, "/city")
