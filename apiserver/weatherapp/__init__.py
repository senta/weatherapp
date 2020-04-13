import os
import logging

from flask import Flask

from weatherapp.models import db
from weatherapp.resources import api
from weatherapp import commands

from dotenv import load_dotenv

load_dotenv()

__IS_DEVELOPMENT_ENV__ = os.environ.get("FLASK_ENV") == "development"

if __IS_DEVELOPMENT_ENV__:
    logging.basicConfig()
    logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)


def create_app(test_config=None):
    """Create and configure a Flask application"""
    app = Flask(
        __name__,
        instance_relative_config=True,
        static_url_path=""
        # static_folder="web/static"
    )

    db_url = os.environ.get("DATABASE_URL")
    # 'mysql://{0}:{1}@{2}:{3}'.format(user, pass, host, port)

    if db_url is None:
        if not __IS_DEVELOPMENT_ENV__:
            raise RuntimeError("databaes connection is not configured")
        # use sqlite in development if it is not configured
        os.makedirs(app.instance_path, exist_ok=True)
        db_url = "sqlite:///" + os.path.join(app.instance_path, "app.sqlite")

    app.config.from_mapping(
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev"),
        SQLALCHEMY_DATABASE_URI=db_url,
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        OWM_API_TOKEN=os.environ.get("OWM_API_TOKEN"),
    )

    if test_config is not None:
        app.config.update(test_config)

    # Initialize SQLAlchemy, API, commands
    db.init_app(app)
    api.init_app(app)
    commands.init_app(app)

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    if __IS_DEVELOPMENT_ENV__:

        @app.after_request
        def after_request(response):
            response.headers.add("Access-Control-Allow-Origin", "*")
            response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
            return response

    return app
