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

// load categories videos
function loadCategoryVideos(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayVideo(data.category));
}

// display button category
function displayCategory(category) {
  console.log(category);
  const categoryContainer = document.getElementById('category-container');
  for (const c of category) {
    const btn = document.createElement('div');
    btn.innerHTML = `
    <button onclick='loadCategoryVideos(${c.category_id})' class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${c.category}</button>
    `;

    categoryContainer.appendChild(btn);
  }
}

// display video
function displayVideo(videos) {
  const videoCardContainer = document.getElementById('video-container');
  videoCardContainer.innerHTML = '';
  videos.forEach(video => {
    const videoCard = document.createElement('div');
    let verified = ' ';
    if (video.authors[0]['verified']) {
      verified = `<img class="h-4 w-4 inline"
        src="https://img.icons8.com/color/48/verified-badge.png"/>`;
    }

    // calculate uploaded time
    let time = video.others.posted_date;
    if (time) {
      if (parseInt(time) <= 86400) {
        const hour = Math.floor(time / 3600);
        const minute = Math.floor((time % 3600) / 60);
        time = `${hour}hrs ${minute} min ago`;
      } else {
        const decade = Math.floor(time / (86400 * 30 * 12 * 10));
        const year = Math.floor(
          (time % (86400 * 30 * 12 * 10)) / (86400 * 30 * 12)
        );
        time = `${decade} decade ${year} year ago`;
      }
    } else {
      time = '';
    }

    videoCard.innerHTML = `
    <div class="card bg-base-100 cursor-pointer">
    <figure class="relative">
        <img class="w-full h-48 object-cover"
        src=${video.thumbnail}/>

        <span class="absolute bottom-2 right-2 text-sm rounded bg-black text-white px-2">${time}</span>
     </figure>
    <div class="flex py-3 gap-2 px-0">
        <div class="avatar mt-1">
            <div class="w-8 h-8 rounded-full">
                <img src=${video.authors[0]['profile_picture']} />
            </div>
        </div>

        <div class="">
            <h2 class="card-title">${video.title}</h2>
            <p class="text-sm">${video.authors[0]['profile_name']} ${verified}</p>
            <p class="text-sm">${video.others.views} views</p>
        </div>
    </div>
    </div>
    `;

    videoCardContainer.appendChild(videoCard);
  });
}

loadCategories();
loadVideos();
