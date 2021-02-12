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

            this.movies = this.movies.map(element => {
                return {
                    ...element,
                    votoStelle: Math.round(element.vote_average / 2)
                }
            })

            //Call for tv shows
            axios
                .get("https://api.themoviedb.org/3/search/tv", {
                    params:{
                        api_key: this.apiKey,
                        query: this.query,
                        language: 'it-US'
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
            }
        },
        hoverDescription(){
            this.movies
            this.activeHover = !this.activeHover;
            
            if (this.activeHover == true) {
                this.active = 'active';
                this.none = 'none';
            }
            else {
                this.active = '';
                this.none = '';
            }
        }
    },





});