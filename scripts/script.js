// load button
function loadCategories() {
  // fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.categories));
}

// load videos
function loadVideos() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideo(data.videos));
}

// display button category
function displayCategory(category) {
  const categoryContainer = document.getElementById('category-container');
  for (const c of category) {
    const btn = document.createElement('div');
    btn.innerHTML = `
    <button class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${c.category}</button>
    `;

    categoryContainer.appendChild(btn);
  }
}

// display video
function displayVideo(videos) {
  const videoCardContainer = document.getElementById('video-container');
  console.log(videos);
  videos.forEach(video => {
    const videoCard = document.createElement('div');
    let verified = ' ';
    if (video.authors[0]['verified']) {
      verified = `
        <svg class="inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height=12 width=12>
          <path fill=blue d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
        </svg>
      `;
    }

    videoCard.innerHTML = `
    <div class="card bg-base-100 w-64 shadow-sm">
    <figure>
        <img class="max-w-full h-48 object-cover"
        src=${video.thumbnail}/>
     </figure>
    <div class="card-body">
    <div class="flex gap-2 items-start">
        <div class="avatar">
            <div class="w-8 rounded-full">
                <img src=${video.authors[0]['profile_picture']} />
            </div>
        </div>

        <div>
            <h2 class="card-title text-sm">${video.title}</h2>
            <p class="text-[10px]">${video.authors[0]['profile_name']} ${verified}</p>
            <p class="text-[10px]">${video.others.views} views</p>
        </div>
    </div>
    </div>
    </div>
    `;

    videoCardContainer.appendChild(videoCard);
  });
}

loadCategories();
loadVideos();
