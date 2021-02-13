var app = new Vue({

    el: '#app',
    data: {
        query: '',
        apiKey: 'dd971d8403d27ab0d69820d891653085',
        movies: [],
        seriesTv: [],
        imgNull: 'pellicola.jpg',
        maxStars: 5,
        film: 'movie',
        start: false,
        back: true,
        activeHover: false,
        //for css
        none: '',
        active: '',
        activeImg: '',
        noneImg: '',
        contatore: 0,
        topMovies: [],
        topSeries: [],
        person: [],
        pxScroll: 0,
        attivoScroll: false,
        attivoScroll2: false,
        attivoScroll3: false,
        opacity: false
    },
    created(){
        // top rated films
        axios
            .get('https://api.themoviedb.org/3/movie/top_rated', {
                params: {
                    api_key: this.apiKey,
                    // query: this.query,
                    language: 'it-IT'
                }
            })
            .then((result) => {
                this.topMovies = result.data.results;

            })


        //top rated series
        axios
            .get('https://api.themoviedb.org/3/tv/top_rated', {
                params: {
                    api_key: this.apiKey,
                    language: 'it-IT'
                }
            })
        .then((result) => {
            this.topSeries = result.data.results;
        })    

        //actor popular
        axios
            .get('https://api.themoviedb.org/3/movie/popular', {
                params: {
                    api_key: this.apiKey,
                    language: 'it-IT'
                }
            })
            .then((result) => {
                this.person = result.data.results;
            })    


    },
    methods: {
        globalSearch(){//global search é una funzione global per la ricerca ad un evento keyup
            //Questa call é riferita solo e unicamente per i film
            axios
                .get("https://api.themoviedb.org/3/search/movie", {
                    params:{
                        api_key: this.apiKey,
                        query: this.query,
                        language: 'it-IT'
                    }
                })
            .then((result) => {
                this.movies = result.data.results;

                this.ratingStars();

            })

            //Call for tv shows
            axios
                .get("https://api.themoviedb.org/3/search/tv", {
                    params:{
                        api_key: this.apiKey,
                        query: this.query,
                        language: 'it-IT'
                    }
                })
            .then((result) => {
                this.movies = this.movies.concat( result.data.results );

                this.ratingStars();
            })
            
            
        },

        ratingStars(){
            this.movies = this.movies.map(element => {
                return {
                    ...element,
                    votoStelle: Math.round(element.vote_average / 2)
                }
            })
        }
        ,

        startResearch(){
            this.start = !this.start;
            if(this.start == true){
                this.active = 'active';
                this.none= 'none';
                this.opacity = 'total-opacity'
            }
            else{
                this.none = '';
                this.active = '';
            }
        },
        comeBack(){
            this.back=!this.back;
            if(this.back == true){
                this.active= '';
                this.none = '';
                this.query = '';
                this.opacity = '';
            }
        },
        hoverDescription(index){
            this.movies = this.movies.map((element) => {
                return{
                    ...element,
                    activeHover: false
                }
            })
            console.log(this.movies);


            this.movies[index].activeHover = !this.movies[index].activeHover;

            console.log(this.movies[index].activeHover);
            
            if (this.movies[index].activeHover == true) {
                this.activeImg = 'activeImg';
                this.noneImg = 'noneImg';
            }
            else {
                this.activeImg = '';
                this.noneImg = '';
            }

        },
        hoverBack(index){
            return this.movies[index].activeHover = false;
        },


        nextImg(){
            let larghezzaImg = document.getElementsByClassName('container-img-slider')[0].offsetWidth;
            console.log(larghezzaImg);
            const container = document.getElementsByClassName('invisible')[0];
            console.log(container);

            const larghezzaContenitore = container.offsetWidth;
            console.log(larghezzaContenitore);

            const scrollLeft = Math.abs(container.style.left.replace('px', ''));
            console.log(scrollLeft);

            const larghezzaInner = document.getElementsByClassName('img-array')[0].offsetWidth;
            console.log(larghezzaInner);
            if (scrollLeft - 110 > (larghezzaContenitore - larghezzaInner - larghezzaImg)) {
                this.none = 'none';
                return;
            }
            this.pxScroll -= larghezzaImg;
            
            // console.log(scrollLeft, 'io sono scroll left');
            // console.log(container, 'container');

            console.log(this.pxScroll, 'io pxSCROLL');
        
        },
        prevImg(){
            var blocco = true;

            this.countImg--;
            let larghezzaImg = document.getElementsByClassName('container-img-slider')[0].offsetWidth;
            console.log(larghezzaImg);
            const container = document.getElementsByClassName('invisible')[0];
            console.log(container);

            const larghezzaContenitore = container.offsetWidth;
            console.log(larghezzaContenitore);

            const scrollRight = Math.abs(container.style.left.replace('px', ''));
            console.log(scrollRight);

            const larghezzaInner = document.getElementsByClassName('img-array')[0].offsetWidth;
            console.log(larghezzaInner);


            if (this.pxScroll == 0) {
                return blocco = false;
            }

            if (scrollRight > (larghezzaContenitore + larghezzaInner + larghezzaImg)) {
                console.log(scrollRight);
                return;
            }
            this.pxScroll += larghezzaImg;
            
            return this.none = '';
        }        
    },





});