var app = new Vue({

    el: '#app',
    data: {
        query: '',
        apiKey: 'dd971d8403d27ab0d69820d891653085',
        movies: [],
        imgNull: 'pellicola.jpg'
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
    }



});