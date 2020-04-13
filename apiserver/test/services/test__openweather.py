import unittest
import responses

from weatherapp.services.openweather import OpenWeather, OpenWeatherAPIError


class TestOpenWeather(unittest.TestCase):
    def setUp(self):
        super().setUp()
        self.client = OpenWeather("dummy_token")

    @responses.activate
    def test_current_weather_should_return_json_response(self):
        endpoint = OpenWeather.BASE_URL + "/weather"
        res = {"message": "this is response"}
        responses.add(responses.GET, endpoint, json=res, status=200)

        result = self.client.current_weather("Vancouver")

        self.assertDictEqual(res, result)
        self.assertEqual(responses.calls[0].request.params["q"], "Vancouver")

    @responses.activate
    def test_current_weather_should_throws_error_with_message(self):
        endpoint = OpenWeather.BASE_URL + "/weather"
        res = {"message": "testing error"}
        responses.add(responses.GET, endpoint, json=res, status=400)

        with self.assertRaises(OpenWeatherAPIError) as error:
            self.client.current_weather("Vancouver")
        self.assertEqual("testing error", str(error.exception))
