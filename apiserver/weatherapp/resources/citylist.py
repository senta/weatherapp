from flask_restful import Resource, reqparse

from weatherapp.models.city import CityModel
from weatherapp.lib import validator


class CityList(Resource):
    parser = reqparse.RequestParser(trim=True)
    parser.add_argument("q", required=True, type=validator.non_empty_str)
    parser.add_argument("limit", required=True, type=int, default=100)

    def get(self):
        """
        List cities that prefixed with query string

        Returns:
            List[dict]
        """
        args = CityList.parser.parse_args()
        matches = CityModel.search(args["q"], args["limit"])

        return [city.json() for city in matches]
