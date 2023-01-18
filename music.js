
const music = $('#audio')
const listSongs = $('.list-songs')
const cd = $('.cd')
const pauseIcon = $('.pause-icon')
const playIcon = $('.play-icon')
const playBtn = $('.play-btn')
const nextBtn = $('.next-icon')
const replayBtn = $('.repeat-icon')
const shuffleBtn = $('.shuffle-icon')
const previousBtn = $('.previous-icon')
const progress = $('.progress')


const app = {
    // Properties
    songs: [
        {
            name: 'Rain and you', 
            author: 'Lee Mujin',
            path: './assets/songs/song1.mp3',
            image: './assets/images/song1.jpg'
        },
        {
            name: 'Thời Không Sai Lệch', 
            author: 'Ngải Thần',
            path: './assets/songs/song2.mp3',
            image: './assets/images/song2.jpg'
        },
        {
            name: 'Lyly', 
            author: 'Alan Walker, K-391 & Emelie Hollow',
            path: './assets/songs/song3.mp3',
            image: './assets/images/song3.jpg'
        },
        {
            name: 'Bước Qua Nhau', 
            author: 'Vũ',
            path: './assets/songs/song4.mp3',
            image: './assets/images/song4.jpg'
        },
        {
            name: 'Đường Tôi Chở Em Về', 
            author: 'buitruonglinh',
            path: './assets/songs/song5.mp3',
            image: './assets/images/song5.jpg'
        },
        {
            name: 'Gặp người đúng lúc', 
            author: 'Cao Tiến',
            path: './assets/songs/song6.mp3',
            image: './assets/images/song6.jpg'
        },
        {
            name: 'All fall down', 
            author: 'Alan Walker ft. Noah Cyrus',
            path: './assets/songs/song7.mp3',
            image: './assets/images/song7.jpg'
        },
        {
            name: 'Waiting for love', 
            author: 'Avicii',
            path: './assets/songs/song8.mp3',
            image: './assets/images/song8.jpg'
        },
        {
            name: 'On my way', 
            author: 'Alan Walker, Sabrina Carpenter & Farruko',
            path: './assets/songs/song9.mp3',
            image: './assets/images/song9.jpg'
        },
        {
            name: 'Chúng Ta Của Hiện Tại', 
            author: 'Sơn Tùng M-TP',
            path: './assets/songs/song10.mp3',
            image: './assets/images/song10.jpg'
        },
        {
            name: 'Колыбельная (Lullaby)', 
            author: 'Rauf & Faik',
            path: './assets/songs/song11.mp3',
            image: './assets/images/song11.jpg'
        },
        {
            name: 'Chuyện đôi ta', 
            author: 'Emcee L ft Muộii',
            path: './assets/songs/song12.mp3',
            image: './assets/images/song12.jpg'
        },
        {
            name: 'Bài này chill phết', 
            author: 'Đen ft MIN',
            path: './assets/songs/song13.mp3',
            image: './assets/images/song13.jpg'
        },
        {
            name: 'Bước qua mùa cô đơn', 
            author: 'Vũ',
            path: './assets/songs/song14.mp3',
            image: './assets/images/song14.jpg'
        },
        {
            name: 'Nàng thơ', 
            author: 'Hoàng Dũng x FreakD'   ,
            path: './assets/songs/song15.mp3',
            image: './assets/images/song15.jpg'
        },
        {
            name: 'Sinh ra đã là thứ đối lập nhau', 
            author: 'Emcee L ft Badbies',
            path: './assets/songs/song16.mp3',
            image: './assets/images/song16.jpg'
        },
        {
            name: 'A little love', 
            author: 'Fiona Fung',
            path: './assets/songs/song17.mp3',
            image: './assets/images/song17.jpg'
        },
        {
            name: 'Love paradise', 
            author: 'Kelly Chen',
            path: './assets/songs/song18.mp3',
            image: './assets/images/song18.jpg'
        },
        {
            name: 'Dusk till dawn', 
            author: 'Zayn & Sia',
            path: './assets/songs/song19.mp3',
            image: './assets/images/song19.jpg'
        },
        {
            name: 'Như những phút ban đầu', 
            author: 'Hoài Lâm',
            path: './assets/songs/song20.mp3',
            image: './assets/images/song20.jpg'
        },
    ], 
    currentIndex: 0,
    isReplay: false,
    isShuffle: false,
    listSongPlayed: [],
    // Method
    renderSongs: function() {
        const _this = this
        const htmls = this.songs.map(function(song, index, songs) {
            return `
            <li class="song__item ${app.currentIndex === index ? 'active' : ''}" data-index = ${index}>
                <div class="song__intro">
                    <i class="fa-solid fa-guitar song__title-icon"></i>
                    <img src="${song.image}" alt="" class="song__image">
                    <div class="song__title">
                        <h3 class="song__name">${song.name}</h3>
                        <p class="song__singer">${song.author}</p>
                    </div>
                </div>
                <div class="song__desc">
                    <i class="fa-regular fa-heart song__heart-icon active"></i>
                    <i class="fa-solid fa-heart song__heart-icon"></i>
                    <p class="song__time">03:23</p>
                </div>
            </li>
            `
        })
        listSongs.innerHTML = htmls.join('')
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get() {
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvent: function() {
        const _this = this
        // Create CD rotate animation
        const cdAnimate = cd.animate([
            { transform: 'rotate(360deg)'}
        ], {
            duration: 15000,
            iterations: Infinity
        })
        cdAnimate.pause()

        // Hide cd when scroll
        const cdWidth = cd.offsetWidth
        if (window.matchMedia("(max-width: 739px)").matches) {
            document.onscroll = function() {
                const newCdWidth = cdWidth - window.scrollY
                if (newCdWidth > 0) {
                    cd.style.width = newCdWidth + 'px' 
                    cd.style.opacity = newCdWidth / cdWidth 
                } else {
                    cd.style.width = 0
                }
            }
        }

        // Auto next when ended
        music.onended = function() {
            if(!_this.isReplay) {
                nextBtn.click()
            }
        }

        // Handle pause/play
        playBtn.onclick = function() {
            if (music.paused) {
                music.play()
            } else {
                music.pause()
            }
        }

        music.onplay = function() {
            playIcon.classList.remove('active')
            pauseIcon.classList.add('active')
            cdAnimate.play()
        }

        music.onpause = function() {
            playIcon.classList.add('active')
            pauseIcon.classList.remove('active')
            cdAnimate.pause()
        }

        // Next/previous song
        nextBtn.onclick = function() {
            if(_this.isShuffle) {
                _this.randomSong()
            } else {
                if(_this.currentIndex < _this.songs.length - 1) {
                    _this.currentIndex++
                } else {
                    _this.currentIndex = 0
                }
            }
            _this.loadCurrentSong()
            music.play()
        }

        previousBtn.onclick = function() {
            if(_this.isShuffle) {
                _this.randomSong()
            } else {
                if(_this.currentIndex > 0) {
                    _this.currentIndex--
                } else {
                    _this.currentIndex = _this.songs.length - 1
                }
            }
            _this.loadCurrentSong()
            music.play()
        }

        // Replay song
        replayBtn.onclick = function() {
            replayBtn.classList.toggle('active')
            _this.isReplay = !_this.isReplay
            music.loop = _this.isReplay
        }

        // Shuffle songs
        shuffleBtn.onclick = function() {
            shuffleBtn.classList.toggle('active')
            _this.isShuffle = !_this.isShuffle
        }

        // Choose song manualy
        listSongs.onclick = function(e) {
            const newSong = e.target.closest('.song__item:not(.active)')
            if(newSong) {
                _this.currentIndex = parseInt(newSong.dataset.index)
                _this.loadCurrentSong()
                music.play()
            }

        }

        // Change progress
        music.ontimeupdate = function() {
            progress.value = music.currentTime / music.duration * 100
        }

        progress.onchange = function() {
            music.currentTime = progress.value / 100 * music.duration
        }
    },

    loadCurrentSong: function() {
        $(".daskboard__name").innerText = `${this.songs[this.currentIndex].name}`
        $('.daskboard__image').setAttribute('src', `${this.songs[this.currentIndex].image}`)
        music.setAttribute('src', `${this.songs[this.currentIndex].path}`)
        this.activeSong()
    },

    activeSong: function() {
        const previousSong = $('.song__item.active')
        const currentSongPLay = $(`.song__item:nth-child(${this.currentIndex + 1})`)
        if(previousSong && currentSongPLay) {
            previousSong.classList.remove('active')
            currentSongPLay.classList.add('active')
            setTimeout(function() {
                currentSongPLay.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                })
            }, 100)
        }
        
    },

    randomSong: function() {
        let newIndex = 0
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex || (this.listSongPlayed.includes(newIndex)))
        this.listSongPlayed.push(newIndex)
        if(this.listSongPlayed.length === this.songs.length) {
            this.listSongPlayed = []
        }
        this.currentIndex = newIndex
        console.log(this.listSongPlayed)
    },

    start: function() {
        this.loadCurrentSong()
        
        this.defineProperties()
        
        this.handleEvent()
        
        this.renderSongs()
    }
}

app.start()