from . import db


class CityModel(db.Model):
    """
    A SQLAlchemy Model Class for `cities` table
    """

    __tablename__ = "cities"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    country = db.Column(db.String(2))

    def json(self):
        """Convert model into dictionary

        Returns:
            dict
        """
        return {"id": self.id, "name": self.name, "country": self.country}

    @classmethod
    def exists(cls, name):
        """
        Check if city is exists

        Arguments:
            name {str} -- name of a city

        Returns:
            bool -- True if exists
        """
        return cls.query.filter(cls.name == name).first() is not None

    @classmethod
    def search(cls, letter, limit=100):
        """
        Search the database for the cities that prefixed with `letter`

        Arguments:
            letter {str} -- prefix letter

        Returns:
            List[str] -- matched cities (100 cities at most)
        """
        prefix = f"{letter}%"

        return cls.query.filter(cls.name.ilike(prefix)).order_by(cls.name)[:limit]
