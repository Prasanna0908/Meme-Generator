'use strict'
const container = document.querySelector('.main--container')
const images = document.querySelector('.images')
const generate = document.querySelector('.generate-btn')
let lines
let draggables


let filename = document.querySelector('#filename')
filename.value = "meme"

let line1 = document.getElementById("top-text")
line1.value = "Upper Line"

let line2 = document.getElementById("bottom-text")
line2.value = "Bottom Line"

draggables = document.querySelectorAll('.draggable')

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
    
            <aside draggable="true" class="dragme" data-item="0"><div class="firstLine draggable"></div></aside>
            <aside draggable="true" class="dragme second" data-item="1"><div class="secondLine"></div></aside>
                
            `
            images.insertAdjacentHTML('beforeend', html2)

            document.documentElement.scrollTop = 0;


            function drag_start(event) {
                var style = window.getComputedStyle(event.target, null);
                event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY) + ',' + event.target.getAttribute('data-item'));
            }

            function drag_over(event) {
                event.preventDefault();
                return false;
            }

            function drop(event) {
                var offset = event.dataTransfer.getData("text/plain").split(',');
                var dm = document.getElementsByClassName('dragme');
                dm[parseInt(offset[2])].style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
                dm[parseInt(offset[2])].style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
                event.preventDefault();
                return false;
            }

            var dm = document.getElementsByClassName('dragme');
            for (var i = 0; i < dm.length; i++) {
                dm[i].addEventListener('dragstart', drag_start, false);
                document.body.addEventListener('dragover', drag_over, false);
                document.body.addEventListener('drop', drop, false);
            }







        })
    })

    generate.addEventListener('click', function () {
        line1 = document.getElementById("top-text").value
        console.log(line1)
        // let upper =
        //     `
        // <div class="firstLine" draggable="true">${line1}</div>
        // `
        // images.insertAdjacentHTML('beforeend', upper)
        console.log(document.querySelector('.firstLine'))
        document.querySelector('.firstLine').textContent = `${line1}`

        line2 = document.getElementById("bottom-text").value
        console.log(line2)
        // let lower =
        //     `
        // <div class="secondLine" draggable="true">${line2}</div>
        // `
        // images.insertAdjacentHTML('beforeend', lower)

        document.querySelector('.secondLine').textContent = `${line2}`




    })




    setUpDownloadPageAsImage();

    function setUpDownloadPageAsImage() {
        document.getElementById("download-page-as-image").addEventListener("click", function () {


            filename = document.getElementById("filename").value
            console.log(filename)

            html2canvas(document.querySelector(".images"), { logging: true, letterRendering: 1, allowTaint: false, useCORS: true }).then(canvas => {
                simulateDownloadImageClick(canvas.toDataURL(), `${filename}.png`);
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



// lines = document.querySelector('.firstLine')
// console.log(lines)

// lines.addEventListener('dragstart', dragStart)
// lines.addEventListener('dragend', dragEnd)

// function dragStart() {
//     console.log("start")
// }

// function dragEnd() {
//     this.className = 'lines'
// }
// const imag = document.querySelector('.imag')

// imag.addEventListener('dragover', dragOver)
// imag.addEventListener('dragenter', dragEnter)
// imag.addEventListener('dragleave', dragLeave)
// imag.addEventListener('drop', dragDrop)

// function dragOver(e) {
//     e.preventDefault()
// }

// function dragEnter(e) {
//     e.preventDefault()
// }

// function dragLeave(e) {
//     e.preventDefault()
// }

// function dragDrop(e) {
//     e.preventDefault()
//     this.append(lines)
// }


// var dragme = document.getElementById('dragme')
// var dropzone = document.getElementById('content2')

// dragme.addEventListener('dragstart', function (e) {
//     console.log("Start")
// })

// dropzone.addEventListener('dragover', function (e) {
//     e.preventDefault()
// })
// dropzone.addEventListener('drop', function (e) {
//     e.preventDefault()
//     console.log("End")

// })



// const smallContainer = document.querySelector('.small__container')


// draggables.forEach(draggable => {
//     draggable.addEventListener('dragstart', () => {
//         console.log("start")
//         draggable.classList.add('dragging')
//     })


//     draggable.addEventListener('dragend', () => {
//         console.log("end")
//         draggable.classList.remove('dragging')
//     })




// })

// smallContainer.addEventListener('dragover', () => {
//     const draggable = document.querySelector('.dragging')
//     smallContainer.appendChild(draggable)
// })


function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain",
        (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY));
}
function drag_over(event) {
    event.preventDefault();
    return false;
}
function drop(event) {
    var offset = event.dataTransfer.getData("text/plain").split(',');
    var dm = document.getElementById('dragme');
    dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
    dm.style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
    event.preventDefault();
    return false;
}
var dm = document.getElementById('dragme');
dm.addEventListener('dragstart', drag_start, false);
document.body.addEventListener('dragover', drag_over, false);
document.body.addEventListener('drop', drop, false);





