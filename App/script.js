function getHttpRequest() {
    var httpRequest = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        httpRequest = new XMLHttpRequest();
        if (httpRequest.overrideMimeType) {
            httpRequest.overrideMimeType('text/xml');
        }
    } else if (window.ActiveXObject) { // IE
        try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) { }
        }
    }

    if (!httpRequest) {
        alert('Abandon :( Impossible de créer une instance XMLHTTP');
        return false;
    }

    return httpRequest
}

function getProduct() {
    var xhr = getHttpRequest()
    xhr.onreadystatechange = function () {
        var list = document.createElement("ul");
        document.querySelector(".container-caddy").appendChild(list);
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var results = JSON.parse(xhr.responseText) // contient le résultat de la page;

                results.products.forEach(result => {

                    result.images.forEach(image => {

                        var button = document.createElement("a");
                        button.classList.add("btn");
                        button.classList.add("airmax-button");
                        button.classList.add(image.alt);
                        button.id = image.id;
                        document.querySelector(".container-card").appendChild(button);

                        var card = document.createElement("div");
                        card.classList.add("card");
                        card.style = "width: 18rem";

                        button.appendChild(card);

                        var img = document.createElement("img");
                        img.classList.add("card-img-top");
                        img.src = image.src;
                        card.appendChild(img);

                        var cardBody = document.createElement("div");
                        cardBody.classList.add("card-body");
                        card.appendChild(cardBody);

                        var h5 = document.createElement("h5");
                        h5.classList.add("card-title");
                        h5.innerHTML = image.alt;
                        cardBody.appendChild(h5);

                        var p = document.createElement("p");
                        p.classList.add("card-text");
                        cardBody.appendChild(p);

                        var allButton = document.querySelectorAll(".airmax-button");

                        allButton.forEach(button => {
                            button.addEventListener("click", function (el) {
                                if (button.id == image.id) {
                                    console.log(image);
                                    var elList = document.createElement("li");
                                    elList.innerHTML = image.alt;
                                    list.appendChild(elList);
                                }
                            });
                        });
                    });
                });
            } else {
                alert("Impossible de contacter le serveur")
            }
            var counter = document.createElement("div");
            var count = 0;
            counter.classList.add("counter");
            var allButton = document.querySelectorAll(".airmax-button");

            // increase cart contain
            allButton.forEach(button => {
                button.addEventListener("click", function (el) {
                    count = count + 1;
                    counter.innerHTML = count;
                });
            });
            document.querySelector(".caddy").appendChild(counter);

            // decrease cart contains
            var minus = document.createElement("button");
            minus.classList.add("btn");
            minus.classList.add("btn-secondary");
            minus.innerText = "-";
            minus.addEventListener("click", function () {
                if (count > 0) {
                    count = count - 1;
                    counter.innerHTML = count;
                }
            });
            document.querySelector(".caddy").appendChild(minus);

            // clear  cart
            var empty = document.createElement("button");
            empty.classList.add("btn");
            empty.classList.add("btn-danger");
            empty.innerText = "clear cart";
            empty.addEventListener("click", function () {
                counter.innerHTML = "";
                count = 0;
                list.innerHTML = "";
            })
            document.querySelector(".caddy").appendChild(empty);
        }
    }
    xhr.open('GET', 'http://localhost:1234/products', true)
    xhr.setRequestHeader('X-Requested-With', 'xmlhttprequest')
    xhr.send();
}

function postOrder() {
    var xhr = getHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr);
            if (xhr.status === 200) {
                var results = xhr.responseText
                console.log(xhr);
                // Logique 
            } else {
                alert("Impossible de contacter le serveur")
            }
        }
    }
    const json = {
        "order": {
          "line_items": [
            {
              "variant_id": 34450262425754,
              "quantity": 1
            }
          ]
        }
    }
    xhr.open('post', 'http://localhost:1234/order', true)
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify(json));
    console.log(JSON.stringify(json));
}

function getOrder() {
    var xhr = getHttpRequest()
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var results = xhr.responseText
            } else {
                alert("Impossible de contacter le serveur")
            }
        }
    }
    xhr.open('get', 'http://localhost:1234/orders', true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}
getProduct();
getOrder()
postOrder();
