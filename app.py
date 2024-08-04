from flask import Flask, render_template, request
from http.client import HTTPConnection
from urllib.parse import urlparse, ParseResult
import json

app: Flask  = Flask(__name__)

urls: list[str] = []

def save_urls() -> None:
    """
    Store the urls list in the json file.
    """
    with open("url_list.json", "w") as file:
        json.dump(urls, file)

def load_urls() -> None:
    """
    Load the data from the json file and store it in the urls list.
    """
    try:
        with open("url_list.json", "r") as file:
            global urls
            urls = json.load(file)
    except FileNotFoundError:
         with open("url_list.json", "w") as file:
            json.dump(urls, file)
        

def check_site(url: str, timeout:int=5) -> bool:
    """
    Check if a given url is online.

    :param url: a url.
    :param timeout: the amount of time the connection will wait.
    :return: whether the site is online.
    """
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
    """
    The main web page.
    """
    load_urls()
    if request.method == "POST":
        com: str = request.form.get('command')
        url: str = request.form.get('value').strip()

        match com:
            # respond to any given command
            case 'Add':
                if url not in urls: urls.append(url)
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