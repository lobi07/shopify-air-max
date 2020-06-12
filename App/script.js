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
            } catch (e) {}
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
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var results = JSON.parse(xhr.responseText) // contient le résultat de la page;
                console.log(results);
                results.products.forEach(result => {
                    console.log(result.images);
                    result.images.forEach(image => {

                        var button = document.createElement("a");
                        button.classList.add("btn");
                        button.classList.add("airmax-button");
                        document.querySelector(".container-card").appendChild(button);

                        var card = document.createElement("div");
                        card.classList.add("card");
                        card.style = "width: 18rem";
                        console.log(card);

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
                        h5.innerHTML = "Chaussures air max";
                        cardBody.appendChild(h5);

                        var p = document.createElement("p");
                        p.classList.add("card-text");
                        cardBody.appendChild(p);
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
                button.addEventListener("click", function(el) {
                    count = count + 1;
                    counter.innerHTML = count;
                })
            });
            document.querySelector(".caddy").appendChild(counter);

            // decrease cart contains
            var minus = document.createElement("button");
            minus.classList.add("btn");
            minus.classList.add("btn-secondary");
            minus.innerText = "-";
            minus.addEventListener("click", function() {
                if (count > 0) {
                    count = count - 1;
                    counter.innerHTML = count;
                }
            })
            document.querySelector(".caddy").appendChild(minus);

            // clear  cart
            var empty = document.createElement("button");
            empty.classList.add("btn");
            empty.classList.add("btn-danger");
            empty.innerText = "clear cart";
            empty.addEventListener("click", function() {
                counter.innerHTML = "";
                count = 0;
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
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var results = xhr.responseText
                console.log(results);
                // Logique 
            } else {
                alert("Impossible de contacter le serveur")
            }
        }
    }
    xhr.open('post', 'http://localhost:1234/orders', true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send("hello");
}
getProduct();
Empty();
postOrder();

function Empty() {


}