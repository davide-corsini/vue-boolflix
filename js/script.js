var app = new Vue({

    el: '#app',
    data: {
        query: '',
        apiKey: 'dd971d8403d27ab0d69820d891653085',
        movies: [],
        imgNull: 'pellicola.jpg',


        maxStars: 5
    },
    methods: {
        globalSearch(){//global search é una funzione global per la ricerca ad un evento keyup
            //Questa call é riferita solo e unicamente per i film
            axios
                .get("https://api.themoviedb.org/3/search/movie", {
                    params:{
                        api_key: this.apiKey,
                        query: this.query,
                        language: 'en-US'
                    }
                })
            .then((result) => {
                this.movies = result.data.results;
                console.log(this.movies);
            })


            //Call for tv shows
            axios
                .get("https://api.themoviedb.org/3/search/tv",{
                    params:{
                        api_key: this.apiKey,
                        query: this.query,
                        language: 'en-US'
                    }
                })
            .then((result) => {
                this.movies = result.data.results;
            })


            
        }
    },
    computed: {
        //funzione voto stars
        //La posso mettere in un computed o in un mounted??? Da chiedere
        voteRating() {
            return (this.movies.vote_avarage / this.maxStars) * 100
        }
    }



});