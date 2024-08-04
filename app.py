from flask import Flask, render_template, request
from http.client import HTTPConnection
from urllib.parse import urlparse, ParseResult
import json

app: Flask  = Flask(__name__)


urls: list[str] = []


def save_urls() -> None:
    with open("url_list.json", "w") as file:
        json.dump(urls, file)

def load_urls() -> None:
    try:
        with open("url_list.json", "r") as file:
            global urls
            urls = json.load(file)
    except FileNotFoundError:
         with open("url_list.json", "w") as file:
            json.dump(urls, file)
        


def check_site(url: str, timeout:int=5) -> bool:
    parser: ParseResult = urlparse(url)
    host_name: str = parser.netloc or parser.path.split("/")[0]
    for port in (80, 443):
        connection: HTTPConnection = HTTPConnection(host=host_name, port=port, timeout=timeout)

        try:
            connection.request("HEAD", "/")
            return True
        except Exception:
            return False
        finally:
            connection.close()

 
@app.route("/", methods=["POST", "GET"])
def index() -> str:
    load_urls()
    if request.method == "POST":
        com: str = request.form.get('command')
        url: str = request.form.get('value').strip()

        print(f"command:\n{com}\n")
        print(f"url:\n{url}\n")

        match com:
            case 'Add':
                if url not in urls:
                    urls.append(url)
                save_urls()
            case 'Check':
                online: bool = check_site(url)
                return f"check::{url}::{online}"
            case 'Delete':
                urls.remove(url)
                empty: bool = not urls
                save_urls()
                return f"delete::{url}::{empty}" 


    return render_template("index.html", urls=urls) 
    

if __name__ == "__main__":
    app.run(debug=True)