from flask import Flask, render_template, request, redirect, url_for


app: Flask  = Flask(__name__)

urls: list[str] = ["www.example.com",
                   "www.anotherexamplefortesting.gov",
                   "www.evenmore.com.uk",
                   "www.example.com/long-extra-details-details",
                   "www.thisoneisonlineforsure.com",
                   "www.example.com",
                   "www.anotherexamplefortesting.gov",
                   "www.evenmore.com.uk",
                   "www.example.com/long-extra-details-details-detailsdetailsdetails",
                   "www.thisoneisonlineforsure.com"]

# urls = []


@app.route("/", methods=["POST", "GET"])
def index() -> str:
    if request.method == "POST":
        print("\npost\n")
        choice: str = list(request.form.keys())[0]
        url: str = request.form[choice]
        print(choice)
        print(url)

        if choice == "C":
            pass
        elif choice == "D":
            urls.remove(url)
        else:
            if url not in urls:
                urls.append(url)
            
            
        return redirect(url_for("index"))
    else:
        print("\nget\n")
        return render_template("index.html", urls=urls)
    


if __name__ == "__main__":
    app.run(debug=True)