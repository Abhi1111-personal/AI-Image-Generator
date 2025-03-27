
let formInput = document.getElementById("input-value")
let imageForm = document.getElementById("image-form")
let imageText = document.getElementById("image-text")
let generatedImage = document.getElementById("generated-image")
let imageContainer = document.getElementById("image-shown")

async function fetchImages(category) {
    try {
        imageContainer.innerHTML = "";
        const randomPage = Math.floor(Math.random()*100)+1
        console.log("working")
        let response = await fetch(`https://api.unsplash.com/search/photos?page=${randomPage}&client_id=${UNSPLASH_API_KEY}&query=${category}`)
        console.log("working")
        if(!response.ok){
            throw new Error("something went wrong")
        }
        let data = await response.json()
        if (data.results.length === 0) {
            imageContainer.innerHTML = "<p>No images found</p>";
            return;
        }
        
      

        data.results.forEach((imgData) => {
            const anchor = document.createElement("a");
            anchor.href = imgData.urls.full;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";

            const img = document.createElement("img");
            img.src = imgData.urls.small;
            img.alt = imgData.alt_description || category
            img.className = 'image-item'
            anchor.appendChild(img);
            imageContainer.appendChild(anchor);
        });

    
        // console.log(imgUrl);
        // console.log("working-fine")
        // imageContainer.style.display = "block";
        // generatedImage.src = imgUrl;
        } catch (error) {
        console.log(error)
        console.log("some problem with API")
    }
}

imageForm.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    let inputValue = formInput.value;

    if(inputValue !==''){
        fetchImages(inputValue);
        console.log(inputValue);
    }else{
        imageText.innerHTML="Pls!! provide some input";
    }
})

// <div id="image-shown" class="image-container">
//                 <p id="image-text"></p>
//                 <img id="generated-image" class="my-generated-image" src="" alt="AI image Genretated">
//             </div>