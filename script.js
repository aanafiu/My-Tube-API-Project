// load categories
const loadCategory = () =>{
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => showCatagory(data.categories))
    .catch((error) => console.log(error + " occar"))
}

// load videos
const loadVideos = (searchText = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) =>{showVideos(data.videos); })
    .catch((error) => console.log(error + " occar"))
}

// showvideos
const showVideos = (data) => {
    console.log(data);
    const videoSection = document.getElementById('video-section');
    // const videoSectionMain = document.getElementById('video-section-main');   
    videoSection.innerText = '';
    if(data.length === 0)
    {

        const div = document.createElement('div');
        div.innerHTML = `

        <img src="./Icon.png" alt="" class = "w-[200px]">
        <h1 class="font-bold text-2xl pt-5">No Video Found</h1>

        `;
        div.classList.add('flex','flex-col','justify-center', 'item-center','text-center');
        videoSection.classList.remove('grid');
        videoSection.classList.add('flex','pt-10');
        videoSection.appendChild(div);
    }
    else
    {
                
    data.forEach(d => {
        
        const t = parseInt(d.others.posted_date);
        const dateText = convertSecond(t);
      
        const div = document.createElement('div');
        // div.classList = "w-full";
        div.innerHTML = 
        `   
            <div class = "relative">
                                    <!-- time -->
                                    ${d.others.posted_date?.length == 0 ? "" : `<div id = "timeText" class="absolute bottom-4 right-4 bg-red-600 text-white font-bold py-1 px-2 rounded-lg">
                                        <h1>${convertSecond(t)} </h1> 
                                    </div>`}

                    <img src="${d.thumbnail}" alt="" class="h-[200px] w-full object-cover rounded-lg">
            </div>
            <!-- details -->
            <div class="py-5 flex gap-3">
                <div class=""><img src="${d.authors[0].profile_picture}" alt="profile pic" class="w-[50px] h-[50px] rounded-full border-y-4 border-blue-950" ></div>
                <div class="">
                    <h1 class="text-lg font-bold">${d.title}</h1>
                    <!-- author name -->
                    <div class="flex items-center gap-2">
                        <h1 class="text-sm text-gray-500">${d.authors[0].profile_name}</h1>
                        ${d.authors[0].verified === true ? '<img src="./verified.png" alt="verified logo" class="w-[18px] h-[18px]"></img>' : ''  }
                        
                    </div>
                    <h1 class="text-sm text-gray-500">${d.others.views}</h1>
                </div>
            </div>


        `;
        div.classList = "relative";
        videoSection.classList.add('grid');
        videoSection.appendChild(div);
    })
    }


}

// days count
function convertSecond(t){
    const years = Math.floor(t / 365);
    let remainingDays = t % 365;
    const months = Math.floor(remainingDays / 30);
    remainingDays = remainingDays % 30;
    return `${years !== 0 ? years + "Y" : "" } ${months !== 0 ? months + "M" : ""} ${remainingDays !== 0 ? remainingDays + "D" : ""}`;
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
        removeBG();
        sortBtnUl.classList.remove('hidden');
        sortBtn.classList.add("bg-red-500");

    }
    else
    {
        removeBG();
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
    removeBG();
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


document.getElementById('search-input').addEventListener('keyup', (event) =>{
    loadVideos(event.target.value);
})

// sortVideosFetch(ls);


