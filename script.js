// load categories
const loadCategory = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => showCatagory(data.categories))
    .catch((error) => console.log(error + " occar"))
}

// load videos
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => showVideos(data.videos))
    .catch((error) => console.log(error + " occar"))
}

// showvideos
const showVideos = (data) => {
    console.log(data);
    data.forEach(d => {
        const videoSection = document.getElementById('video-section');
        const div = document.createElement('div');
        // div.classList = "w-full";
        div.innerHTML = 
        `
            <img src="${d.thumbnail}" alt="" class="h-[200px] object-cover rounded-lg">
            <!-- details -->
            <div class="py-5 flex gap-3">
                <div class=""><img src="${d.authors[0].profile_picture}" alt="profile pic" class="w-[50px] h-[50px] rounded-full border-y-4 border-blue-950" ></div>
                <div class="">
                    <h1 class="text-lg font-bold">${d.title}</h1>
                    <!-- author name -->
                    <div class="flex items-center gap-2">
                        <h1 class="text-sm text-gray-500">${d.authors[0].profile_name}</h1>
                        <img src="./Icon.png" alt="verified logo" class="w-[15px] h-[15px]">
                    </div>
                    <h1 class="text-sm text-gray-500">${d.others.views}</h1>
                </div>
            </div>

        `;

        videoSection.appendChild(div);
    })
}




// Show Catagory
const showCatagory = (data) => {
    console.log(data);

    // data.map( (d) => {
    data.forEach(d => {
      
    const categoriesSection = document.getElementById('categories-section');
    const button = document.createElement('button');
    button.innerHTML = `${d.category}`;
    button.classList = 'btn';
    categoriesSection.appendChild(button);
    } );
}




loadVideos();
loadCategory();