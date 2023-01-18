const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


// Open / close mobile menu

var menuBtn = $('.nav-menu')
var menuModal = $('.menu-modal')
var menuOverlay = $('.menu__overlay')
var closeMenuBtn = $('.menu__close-icon')

function openMenuMobile() {
    menuModal.style.display = 'block'
}

function closeMenuMobile() {
    menuModal.style.display = 'none'
}
menuBtn.onclick = openMenuMobile
menuOverlay.onclick = closeMenuMobile
closeMenuBtn.onclick = closeMenuMobile


// Open / close mobile search

var searchBtn = $('.search__icon-mobile')
var closeSearchBtn = $('.search__icon-close')
var searchModal = $('.search-modal')

function openSearch() {
    searchBtn.style.display = 'none'
    searchModal.style.display = 'block'
    closeSearchBtn.style.display = 'block'
}

searchBtn.onclick = openSearch

function closeSearch() {
    searchBtn.style.display = 'block'
    searchModal.style.display = 'none'
    closeSearchBtn.style.display = 'none'
}

closeSearchBtn.onclick = closeSearch


// Main music player logic














