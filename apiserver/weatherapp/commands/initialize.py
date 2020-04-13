import os
import json

import click
from flask.cli import with_appcontext


from weatherapp.models import db
from weatherapp.models.city import CityModel


@click.command("init-db")
@with_appcontext
def init_db():
    """Initialize database"""
    db.drop_all()
    db.create_all()
    insert_seed()

    click.echo("Initialized the database.")


def insert_seed():
    """Insert seed data into the database"""
    seed_file = os.path.dirname(__file__) + "/seed/cities.json"
    data = []
    with open(seed_file) as f:
        data = json.load(f)
    for row in data:
        row["name"] = row["name"].lower()

    db.session.bulk_insert_mappings(CityModel, data)
    db.session.commit()
