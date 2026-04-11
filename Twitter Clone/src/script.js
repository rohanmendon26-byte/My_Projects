
document.addEventListener("DOMContentLoaded", () => {

const forYouBtn = document.getElementById("foryou");
const followingBtn = document.getElementById("following");

const forYouContent = document.getElementById("foryouContent");
const followingContent = document.getElementById("followingContent");

forYouBtn.addEventListener("click", () => {
    forYouBtn.classList.add("text-white","font-bold","border-b-2","border-blue-500");
    forYouBtn.classList.remove("text-gray-500");

    followingBtn.classList.remove("text-white","font-bold","border-b-2","border-blue-500");
    followingBtn.classList.add("text-gray-500");

    forYouContent.classList.remove("hidden");
    followingContent.classList.add("hidden");
});

followingBtn.addEventListener("click", () => {
    followingBtn.classList.add("text-white","font-bold","border-b-2","border-blue-500");
    followingBtn.classList.remove("text-gray-500");

    forYouBtn.classList.remove("text-white","font-bold","border-b-2","border-blue-500");
    forYouBtn.classList.add("text-gray-500");

    followingContent.classList.remove("hidden");
    forYouContent.classList.add("hidden");
});

});