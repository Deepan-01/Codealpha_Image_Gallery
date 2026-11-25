// ------------------------------
// Visual Gallery — gallery logic
// ------------------------------

// Each photo has an image URL, a title and a category.
const photos = [
  { id: 1, title: "Quiet Mountains", category: "nature", src: "https://picsum.photos/id/1018/1000/800" },
  { id: 2, title: "Into the Forest", category: "nature", src: "https://picsum.photos/id/10/1000/800" },
  { id: 3, title: "Ocean Air", category: "nature", src: "https://picsum.photos/id/1015/1000/800" },
  { id: 4, title: "City Rhythm", category: "city", src: "https://picsum.photos/id/1011/1000/800" },
  { id: 5, title: "Urban Lines", category: "architecture", src: "https://picsum.photos/id/建筑/1000/800".replace("建筑", "1040") },
  { id: 6, title: "Wild Spirit", category: "animals", src: "https://picsum.photos/id/1024/1000/800" },
  { id: 7, title: "Desert Light", category: "nature", src: "https://picsum.photos/id/1002/1000/800" },
  { id: 8, title: "Street Stories", category: "city", src: "https://picsum.photos/id/1031/1000/800" },
  { id: 9, title: "Little Explorer", category: "animals", src: "https://picsum.photos/id/1025/1000/800" },
  { id: 10, title: "Modern Forms", category: "architecture", src: "https://picsum.photos/id/1040/1000/800" },
  { id: 11, title: "Green Escape", category: "nature", src: "https://picsum.photos/id/1016/1000/800" },
  { id: 12, title: "After Hours", category: "city", src: "https://picsum.photos/id/1038/1000/800" }
];

const gallery = document.querySelector("#gallery");
const imageCount = document.querySelector("#image-count");
const emptyState = document.querySelector("#empty-state");
const filterButtons = document.querySelectorAll(".filter-btn");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxTitle = document.querySelector("#lightbox-title");
const lightboxPosition = document.querySelector("#lightbox-position");

let visiblePhotos = [...photos];
let currentIndex = 0;
let lastFocusedElement = null;

// Build gallery cards from the photo data.
function renderGallery(category = "all") {
  visiblePhotos = category === "all"
    ? [...photos]
    : photos.filter(photo => photo.category === category);

  gallery.innerHTML = "";
  imageCount.textContent = visiblePhotos.length;
  emptyState.hidden = visiblePhotos.length !== 0;

  visiblePhotos.forEach((photo, index) => {
    const card = document.createElement("article");
    card.className = "gallery-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open ${photo.title}`);

    const imageWrap = document.createElement("div");
    imageWrap.className = "card-image-wrap";

    const image = document.createElement("img");
    image.className = "card-image";
    image.src = photo.src;
    image.alt = photo.title;
    image.loading = "lazy";

    const overlay = document.createElement("div");
    overlay.className = "card-overlay";
    overlay.innerHTML = '<span class="view-icon" aria-hidden="true">↗</span>';

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.innerHTML = `<span class="card-title">${photo.title}</span>
      <span class="card-category">${photo.category}</span>`;

    imageWrap.append(image, overlay);
    card.append(imageWrap, meta);
    card.addEventListener("click", () => openLightbox(index));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(index);
      }
    });
    gallery.appendChild(card);
  });
}

// Change the selected category and update the gallery.
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");
    renderGallery(button.dataset.category);
  });
});

// Open the full-screen image viewer.
function openLightbox(index) {
  currentIndex = index;
  lastFocusedElement = document.activeElement;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.querySelector("#lightbox-close").focus();
}

// Keep the image, caption and counter in sync.
function updateLightbox() {
  const photo = visiblePhotos[currentIndex];
  if (!photo) return;
  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.title;
  lightboxTitle.textContent = photo.title;
  lightboxPosition.textContent = `${currentIndex + 1} / ${visiblePhotos.length}`;
}

function showNext() {
  currentIndex = (currentIndex + 1) % visiblePhotos.length;
  updateLightbox();
}

function showPrevious() {
  currentIndex = (currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length;
  updateLightbox();
}

// Close the viewer and return focus to the selected gallery card.
function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelector("#lightbox-next").addEventListener("click", showNext);
document.querySelector("#lightbox-prev").addEventListener("click", showPrevious);
document.querySelector("#lightbox-close").addEventListener("click", closeLightbox);

// Close when the dark background (not the image) is clicked.
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});

// Keyboard controls: arrows move through photos; Escape closes the viewer.
document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("open")) return;
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrevious();
  if (event.key === "Escape") closeLightbox();
});

// Light/dark theme toggle. The setting is kept for this browser session.
const themeToggle = document.querySelector("#theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.querySelector(".theme-icon").textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
});

// Set the current year automatically.
document.querySelector("#year").textContent = new Date().getFullYear();

// Initial gallery.
renderGallery();
