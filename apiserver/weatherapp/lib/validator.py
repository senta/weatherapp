from weatherapp.models.city import CityModel

"""
Validator functions for Flask-Restful reqparser
"""


def non_empty_str(value):
    """
    Validate if the value is not empty string

    Arguments:
        value {str} -- arequest parameter

    Raises:
        ValueError: If the value is invalid

    Returns:
        str -- the input value
    """
    if not value:
        raise ValueError(
            "Missing required parameter in the JSON body or the post body or the query string"
        )
    return value


def valid_city(value):
    """
    Validate if the value is a valid city (stored on the DB)

    Arguments:
        value {str} -- arequest parameter

    Raises:
        ValueError: If the value is invalid

    Returns:
        str -- the input value
    """
    non_empty_str(value)
    if not CityModel.exists(value.lower()):
        raise ValueError("Unknown city")

    return value


def valid_unit(value):
    """
    Validate if the value is a valid unit for Open Weather API
    Only "imperial" and "metric" are valid

    Arguments:
        value {str} -- arequest parameter

    Raises:
        ValueError: If the value is invalid

    Returns:
        str -- the input value
    """
    if value != "imperial" and value != "metric":
        raise ValueError("Unit ")

    return value
