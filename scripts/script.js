// remove active class
function removeActiveClass() {
  const btns = document.getElementsByClassName('active');
  for (const btn of btns) {
    btn.classList.remove('active');
  }
}

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
    .then(data => {
      removeActiveClass();
      document.getElementById('btn-all').classList.add('active');
      displayVideo(data.videos);
    });
}

// load categories videos
function loadCategoryVideos(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      removeActiveClass();
      const btn = document.getElementById(`btn-${id}`);
      btn.classList.add('active');
      displayVideo(data.category);
    });
}

function loadVideoDetails(id) {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayVideoDetails(data.video));
}

// display button category
function displayCategory(category) {
  const categoryContainer = document.getElementById('category-container');
  for (const c of category) {
    const btn = document.createElement('div');
    btn.innerHTML = `
    <button id=btn-${c.category_id} onclick='loadCategoryVideos(${c.category_id})' class="btn btn-sm hover:bg-[#ff1f3d] hover:text-white">${c.category}</button>
    `;

    categoryContainer.appendChild(btn);
  }
}

// display video
function displayVideo(videos) {
  const videoCardContainer = document.getElementById('video-container');
  videoCardContainer.innerHTML = '';

  if (!videos.length) {
    videoCardContainer.innerHTML = `
    <div class="col-span-full mt-8">
        <img class="mx-auto" src="./assets/Icon.png" alt="" />
        <h2 class="text-2xl font-bold text-center">
        Oops!! Sorry, There is no content here
        </h2>
    </div>`;
    return;
  }

  videos.forEach(video => {
    const videoCard = document.createElement('div');

    // add verified badge
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
    <div onclick="loadVideoDetails('${video.video_id}')" class="card bg-base-100 cursor-pointer">
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

function displayVideoDetails(data) {
  document.getElementById('my_modal_1').showModal();
  const detailsContainer = document.getElementById('details-container');

  detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
  <figure>
    <img class="object-cover w-full" src= ${data.thumbnail} />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${data.title}</h2>
    <p>${data.description}</p>
  </div>
</div>
  `;
}

loadCategories();
loadVideos();
