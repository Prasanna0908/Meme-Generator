'use strict'
const container = document.querySelector('.main--container')
const images = document.querySelector('.images')
const generate = document.querySelector('.generate-btn')
let line1 = document.getElementById("top-text")
const proxy = 'https://cors-anywhere.herokuapp.com/';



line1.value = "Upper Line"

let line2 = document.getElementById("bottom-text")
line2.value = "Bottom Line"

fetch(`https://api.imgflip.com/get_memes`).then(res => res.json()).then(info => {
    const { data } = info
    console.log(data)

    for (let i = 0; i < 100; i++) {

        const html =
            `
        <div class="container">
            <img src='${data.memes[i].url}' alt="Meme" class="Images">
            <h3>${data.memes[i].name} </h3>
        </div>
        `

        container.insertAdjacentHTML('beforeend', html)
    }

    const memes = document.querySelectorAll('.container')

    memes.forEach(function (meme) {
        meme.addEventListener('click', function () {
            console.log(meme.children[0])

            images.innerHTML = ''
            let html2 =
                `
                <img src="${meme.children[0].getAttribute("src")}" class="imag" alt="">
                
            `
            images.insertAdjacentHTML('beforeend', html2)

            document.documentElement.scrollTop = 0;


        })
    })

    generate.addEventListener('click', function () {
        line1 = document.getElementById("top-text").value
        console.log(line1)
        let upper =
            `
        <div class="firstLine">${line1}</div>
        `
        images.insertAdjacentHTML('beforeend', upper)

        line2 = document.getElementById("bottom-text").value
        console.log(line2)
        let lower =
            `
        <div class="secondLine">${line2}</div>
        `
        images.insertAdjacentHTML('beforeend', lower)

    })


    setUpDownloadPageAsImage();

    function setUpDownloadPageAsImage() {
        document.getElementById("download-page-as-image").addEventListener("click", function () {
            html2canvas(document.body).then(function (canvas) {
                console.log(canvas);
                simulateDownloadImageClick(canvas.toDataURL(), 'file-name.png');
            });
        });
    }

    function simulateDownloadImageClick(uri, filename) {
        var link = document.createElement('a');
        if (typeof link.download !== 'string') {
            window.open(uri);
        } else {
            link.href = uri;
            link.download = filename;
            accountForFirefox(clickLink, link);
        }
    }

    function clickLink(link) {
        link.click();
    }

    function accountForFirefox(click) { // wrapper function
        let link = arguments[1];
        document.body.appendChild(link);
        click(link);
        document.body.removeChild(link);
    }



})

