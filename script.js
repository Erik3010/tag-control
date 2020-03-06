let container = document.querySelector('.container');
let tagContainer = document.querySelector('.tag-container');
let input = document.getElementById('tag');
let addBtn = document.querySelector('.btn');

// get data from taglist json
function fetchData() {
    fetch('taglist.json')
        .then(res => res.json())
        .then(res => {
            res.tag.forEach((data,i) => {
                tagContainer.innerHTML += `
                    <div class="badge">${data} <button class="close-btn">&times;</button></div>
                `;
            });
            let close = document.querySelectorAll('.close-btn');
            close.forEach((el, i) => {
                deleteTag(el);
            })
        });
}

fetchData();

function deleteTag(el) {
    el.addEventListener('click', (e) => {
        let target = e.target.parentNode;
        let parent = target.parentNode;
        parent.removeChild(target);
    })
}

input.addEventListener('input', function(e) {
    fetch('taglist.json')
        .then(res => res.json())
        .then((res) => {
            let value = input.value;
            let datas = res.tag;

            closeAutoComplete();

            if(!value) return;

            let autoContainer = document.createElement('div');
            autoContainer.setAttribute('class', 'autocomplete');
            container.appendChild(autoContainer);

            datas.forEach((data, i) => {
                if(data.substr(0,value.length).toLowerCase() == value.toLowerCase()) {
                    let option = document.createElement('div');
                    option.setAttribute('class', 'option');
                    option.setAttribute('data-value', data);
                    option.innerHTML = `<strong>${data.substr(0, value.length)}</strong>`
                    option.innerHTML += data.substr(value.length);

                    autoContainer.appendChild(option);

                    option.addEventListener('click', function(e) {
                        input.value = option.getAttribute('data-value');
                        closeAutoComplete();
                    })
                }
            })
        })
})

function closeAutoComplete(el) {
    let items = document.querySelectorAll('.option');
    let autoContain = document.querySelector('.autocomplete');
    if(autoContain != null) {
        autoContain.parentNode.removeChild(autoContain)
    }
    items.forEach((item, i) => {
        if(el != item && el != input) {
            item.parentNode.removeChild(item);
        }
    })
}

addBtn.addEventListener('click', (e) => {
    if(!input.value) return;

    let vals = input.value.split(" ");
    vals.forEach((val, i) => {
        tagContainer.innerHTML += `
            <div class="badge badge-add">${val} <button class="close-btn">&times;</button></div>
        `
        input.value = '';
    })
    let close = document.querySelectorAll('.close-btn');
    close.forEach((el, i) => {
        deleteTag(el);
    })
})

document.addEventListener('click', (e) => {
    closeAutoComplete(e.target)
})
// async function fetchData() {
//     let response = await fetch('taglist.json');
//     let data = await response.json();
//     return data;
// }

// let result = fetchData();
// result.then((data) => {
//     data.tag.forEach((data, i) => {
//         tagContainer.innerHTML += `
//             <div class="badge">${data} <button class="close-btn">&times;</button></div>
//         `;
//     })
//     let close = document.querySelectorAll('.close-btn');
//     close.forEach((el, i) => {
//         el.addEventListener('click', (e) => {
//             console.log(e.target);
//         })
//     })
// })

// close.forEach((el, i) => {
//     console.log(e)
//     close.addEventListener('click', (e) => {
//         console.log(e.target)
//     })
// })