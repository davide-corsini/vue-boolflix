var app = new Vue({

    el: '#app',
    data: {
        query: '',
        apiKey: 'dd971d8403d27ab0d69820d891653085',
        movies: [],
        seriesTv: [],
        imgNull: 'pellicola.jpg',
        starValue: '',
        maxStars: 5,
        film: 'movie',

        flag: ['de','en','es','fr','it','ja','pt','us'],

            

        italia: 'it'
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
                console.log(this.movies, 'NEI FILM');

                this.movies = this.movies.map(element => {
                    return {
                        ...element,
                        votoStelle: Math.round(element.vote_average / 2)
                    }
                })


                this.movies.forEach(element => {
                    console.log(element.original_language);
                    if(element.original_language == this.flag.element){
                        console.log('ciao');
                    }
                });




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
                this.movies = result.data.results;
                // this.arrayStelle = result.data.results;
                console.log(this.movies, 'TV SHOWWWWW');
                //mappo array e aggiungo key---> votoStelle
                this.movies = this.movies.map(element => {
                    return {
                        ...element,
                        votoStelle: Math.round(element.vote_average / 2)
                    }
                })
            })


            
        }
    },





});