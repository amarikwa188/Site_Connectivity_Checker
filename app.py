from flask import Flask, render_template, request, redirect, url_for


app: Flask  = Flask(__name__)

urls: list[str] = ["example1.com", "example2.com", "example3.com",
                   "example4.com", "example5.com", "example6.com"]


@app.route("/", methods=["POST", "GET"])
def index() -> str:
    if request.method == "POST":
        com: str = request.form.get('command')
        url: str = request.form.get('value')

        print(f"command:\n{com}\n")
        print(f"url:\n{url}\n")

        match com:
            case 'A':
                pass
            case 'C':
                pass
            case 'D':
                pass

    return render_template("index.html", urls=urls)
    

if __name__ == "__main__":
    app.run(debug=True)