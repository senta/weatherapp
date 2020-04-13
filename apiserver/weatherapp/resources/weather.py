from flask import current_app
from flask_restful import Resource, reqparse

from weatherapp.services.openweather import OpenWeather
from weatherapp.lib import validator


class Weather(Resource):
    parser = reqparse.RequestParser(trim=True)
    parser.add_argument("city", required=True, type=validator.valid_city)
    parser.add_argument("unit", type=validator.valid_unit, default="imperial")

    def get(self):
        """Fetch current weather from Open Weather

        Returns:
            dict -- the API response from openweather
        """
        args = Weather.parser.parse_args()
        client = OpenWeather(current_app.config["OWM_API_TOKEN"])
        res = client.current_weather(**args)
        return res
