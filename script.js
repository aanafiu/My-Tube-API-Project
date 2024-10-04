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
    // console.log(data);
        
    const videoSection = document.getElementById('video-section');
            
 videoSection.innerText = '';
    data.forEach(d => {

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
    // console.log(data);

    // data.map( (d) => {
    data.forEach(d => {
      
    const categoriesSection = document.getElementById('categories-section');
    // const button = document.createElement('button');
    const button = document.createElement('div');
    button.innerHTML = `
    <button id = "btn-${d.category_id}" onclick = "loadCategoryVideos(${d.category_id})" class = "btn">${d.category}</button>
    `;
    categoriesSection.appendChild(button);
    } );
}

const removeBG = () =>{
    const btns = document.getElementsByClassName("btn");
    for(let btn of btns){
        btn.classList.remove("bg-red-500");
    }
}


// load videos with category
const loadCategoryVideos = (id) =>{
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    // .then((data) => console.log(data.category))
    .then((data) =>{
        removeBG();

        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("bg-red-500");
        if(id === '1000')
        {
            loadVideos();
        }
        else{
            showVideos(data.category);
        }
        
    })
    .catch((error) => console.log(error + " occar"))

}




loadVideos();
loadCategory();




// sort btn
document.getElementById('sortBtn').addEventListener('click', ()=>{
    const sortBtnUl = document.getElementById('sortBtnUl');
    const sortBtn = document.getElementById('sortBtn');
    if(sortBtnUl.classList.contains('hidden')){
        sortBtnUl.classList.remove('hidden');
        sortBtn.classList.add("bg-red-500");

    }
    else
    {
        sortBtnUl.classList.add('hidden');
        sortBtn.classList.remove("bg-red-500");
    }
    
});
// Fetch and sort videos based on views
const sortVideosFetch = (s) => {
    console.log(s);
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then((res) => res.json())
    .then((data) => showSort(data.videos, s))
    .catch((error) => console.log(error + " occurred"));
}

// Convert views string to number
const convertViews = (viewNumber) => {
    if (viewNumber.includes('K')) {
        return parseFloat(viewNumber.split('K')[0]) * 1000;  // Convert "50K" to 50000
    } else if (viewNumber.includes('M')) {
        return parseFloat(viewNumber.split('M')[0]) * 1000000;  // Convert "2M" to 2000000
    }
    return parseInt(viewNumber);  // For normal numbers
}

// Sort and display the videos
const showSort = (data,s) => {
    if(s === 'ls')
    {
        //btn active
        const sortBtnUl = document.getElementById('sortBtnUl');
        const sortBtn = document.getElementById('sortBtn');
        if(sortBtnUl.classList.contains('hidden')){
            sortBtnUl.classList.remove('hidden');
            sortBtn.classList.remove("bg-red-500");
    
        }
        else
        {
            sortBtnUl.classList.add('hidden');
            sortBtn.classList.add("bg-red-500");
        }

        const sortedVideos = data.sort((a, b) => {
            const viewsA = convertViews(a.others.views);
            const viewsB = convertViews(b.others.views);
            console.log(viewsA);
            console.log("b " +  viewsB);
            return ( viewsB - viewsA);  // Sort in descending order (largest to smallest)

        })
        // Now display or log the sorted videos
    showVideos(sortedVideos);
}
    else if(s === 'ds'){

        // btn active 
        const sortBtnUl = document.getElementById('sortBtnUl');
        const sortBtn = document.getElementById('sortBtn');
        if(sortBtnUl.classList.contains('hidden')){
            sortBtnUl.classList.remove('hidden');
            sortBtn.classList.remove("bg-red-500");
    
        }
        else
        {
            sortBtnUl.classList.add('hidden');
            sortBtn.classList.add("bg-red-500");
        }

        const sortedVideos = data.sort((a, b) => {
            const viewsA = convertViews(a.others.views);
            const viewsB = convertViews(b.others.views);
            console.log(viewsA);
            console.log("b " +  viewsB);
            return ( viewsA - viewsB);  // Sort in descending order (largest to smallest)
            
    
    }
    )
    // Now display or log the sorted videos
    // console.log(sortedVideos)
    showVideos(sortedVideos);

    };

}

// sortVideosFetch(ls);


