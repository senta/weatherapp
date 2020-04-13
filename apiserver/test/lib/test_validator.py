import unittest
import unittest.mock as mock

import weatherapp.lib.validator as validator


class TestValidator(unittest.TestCase):
    def test_non_empty_str_ok(self):
        # It should return given value
        self.assertEqual(validator.non_empty_str("ss"), "ss")

    def test_non_empty_str_error(self):
        # It should raise an Error
        with self.assertRaises(ValueError):
            validator.non_empty_str("")

    def test_valid_city_ok(self):
        with mock.patch.object(validator.CityModel, "exists", return_value=True):
            self.assertEqual(validator.valid_city("ss"), "ss")

    def test_valid_city_error(self):
        # It should raise an Error
        with self.assertRaises(ValueError):
            with mock.patch.object(validator.CityModel, "exists", return_value=False):
                validator.valid_city("ss")

    def test_valid_unit_ok(self):
        # It should return given value
        self.assertEqual(validator.valid_unit("imperial"), "imperial")
        self.assertEqual(validator.valid_unit("metric"), "metric")

    def test_valid_unit_error(self):
        # It should raise an Error
        with self.assertRaises(ValueError):
            validator.valid_unit("")
        with self.assertRaises(ValueError):
            validator.valid_unit("something")
