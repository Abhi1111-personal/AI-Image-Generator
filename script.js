
let formInput = document.getElementById("input-value")
let imageForm = document.getElementById("image-form")
let imageText = document.getElementById("image-text")
let generatedImage = document.getElementById("generated-image")
let imageContainer = document.getElementById("image-shown")
let imageBtn = document.getElementById("image-btn")
let aiBtn = document.getElementById("ai-btn")
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
async function query(data){
    // console.log("Ai-generation for" + {category})
    console.log("inside-query-1")
    
    const response = await fetch(
		"https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-dev",
		{
			headers: {
				Authorization: `Bearer ${Hugging_Face_api_key}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
    console.log(result)
    console.log("return-query-1")
	return result;

}

imageBtn.addEventListener('click' ,(e)=>{
    e.preventDefault();
    let inputValue = formInput.value;

    if(inputValue !==''){
        fetchImages(inputValue);
        console.log(inputValue);
    }else{
        imageText.innerHTML="Pls!! provide some input";
    }
})


aiBtn.addEventListener('click' ,(e)=>{
    e.preventDefault();
    let inputValue = formInput.value;
    console.log("button pressed")
    const para = document.createElement("p")
    para.className= "loading-message"
    para.innerHTML = "Loading..."
    imageContainer.appendChild(para)
    if(inputValue !==''){
        query({"inputs": inputValue }).then((response) => {
            console.log("recieve response")
            const imageUrl = URL.createObjectURL(response);
        
            // Displaying the image in the document
            console.log("displaying")
            const anchor = document.createElement("a")
            anchor.href = imageUrl
            anchor.target = "_blank"
            anchor.rel = "noopner noreferrer"
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Generated Image";
            img.className = 'my-generated-image'
            imageContainer.innerHTML = "";
            anchor.appendChild(img);
            imageContainer.appendChild(anchor);
        });
        console.log(inputValue);
    }else{
        imageText.innerHTML="Pls!! provide some input";
    }
})

// <div id="image-shown" class="image-container">
//                 <p id="image-text"></p>
//                 <img id="generated-image" class="my-generated-image" src="" alt="AI image Genretated">
//             </div>