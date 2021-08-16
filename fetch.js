const btn = document.getElementById('btn')
const appear = document.getElementById('appear')

const title = document.getElementById('title');
const content = document.getElementById('content');
const btnGet = document.getElementById('btnGet')
const deletebtn = document.getElementById('deletebtn')



const dataArray = [];

const sendHttpRequest = (method, url, data) => {
    return fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: data ? {'Content-Type': 'application/json'} : {}
    }).then(response => {
        if(response.status >= 400){
            throw new Error('Something went wrong!')
        }
        return  response.json()
    });
}


const getData = () => {
     sendHttpRequest('GET', 'https://httprequeststudy-default-rtdb.firebaseio.com/posts.json')
    .then(
        responseData =>{
            for(let item in responseData){
                dataArray.push(responseData[item])
            }
            for(let i = 0; i < dataArray.length; i++){
                const newEl = document.createElement('li')
                const txt = document.createTextNode(dataArray[i].title + ' & ' + dataArray[i].content)
                newEl.append(txt)
                appear.append(newEl)
            }
        }
    )
}

const postData = () => {

    sendHttpRequest('POST', 'https://httprequeststudy-default-rtdb.firebaseio.com/posts.json', {
        title: title.value,
        content: content.value
    }).then(
        response => {
            console.log(response)
            window.location.reload()
        }
    )
    .catch(
        err=>{
            console.log(err)
        }
    )
    
}

btnGet.addEventListener('click', getData)
btn.addEventListener('click', postData)

getData()

const deletePost = () =>{
     fetch('https://httprequeststudy-default-rtdb.firebaseio.com/posts.json', {
        method: 'DELETE'
    }).then(resp => {
        console.log(resp)
        window.location.reload()
    })
    
}
deletebtn.addEventListener('click', deletePost)