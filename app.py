from flask import Flask, render_template, request, redirect, url_for


app: Flask  = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def index() -> str:
    pass
    

if __name__ == "__main__":
    app.run(debug=True)