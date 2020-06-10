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
                        var card = document.createElement("div");

                        card.classList.add("card");
                        card.style = "width: 18rem";
                        console.log(card);
                        document.querySelector(".container-card").appendChild(card);

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
postOrder();