from flask import Flask, render_template, request, redirect, url_for


app: Flask  = Flask(__name__)

urls: list[str] = ["example1.com", "example2.com", "example3.com",
                   "example4.com", "example5.com", "example6.com"]


@app.route("/", methods=["POST", "GET"])
def index() -> str:
    return render_template("index.html", urls=urls)
    

if __name__ == "__main__":
    app.run(debug=True)