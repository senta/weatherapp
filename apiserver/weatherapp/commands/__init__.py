from .initialize import init_db


def init_app(app):
    """Register available commands"""
    app.cli.add_command(init_db)
