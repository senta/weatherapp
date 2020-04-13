import requests


class OpenWeatherAPIError(RuntimeError):
    pass


class OpenWeather:
    """
    Open Weather API client
    https://openweathermap.org/current

    "Free Plan"
    Calls per minute: 60
    Hourly forecast: unavailable
    3 hour forecast: 5
    Daily forecast: unavailable
    """

    BASE_URL = "https://api.openweathermap.org/data/2.5"

    def __init__(self, token):
        """
        Arguments:
            token {str} -- Open Weather API token
        """
        self.token = token

    def current_weather(self, city, unit="imperial"):
        """Fetch current weather at the city

        Keyword Arguments:
            query {str} -- target city name (default: {None})
            city_id {int} -- target city id (default: {"imperial"})

        Raises:
            RuntimeError: raises when the API returns non-success status
        """
        params = {"appid": self.token, "q": city, "unit": unit}

        res = requests.get(OpenWeather.BASE_URL + "/weather", params=params)

        if res.status_code != 200:
            body = res.json()
            raise OpenWeatherAPIError(body["message"])

        return res.json()
