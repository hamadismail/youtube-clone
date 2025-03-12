function loadCategories() {
  // fetch the data
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategory(data.categories));
}

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

loadCategories();
