var app = new Vue({
  el:'#app',
  data: {
    query: '',
    apiKey: 'e99307154c6dfb0b4750f6603256716d',
    lang: 'it-IT',
    risultati: [],
    generi: [],
		generiValue: 'All',
  },
  mounted(){
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list",{
         params: {
           language: this.lang,
           api_key: this.apiKey
          }
        })
      .then((result) => {
        result.data.genres.forEach((e) => {
          if(!this.generi.includes(e.name)) {
            this.generi.push(e.name);
          }
        });
      })
      .catch((error) => console.log(error));

      axios
        .get(" https://api.themoviedb.org/3/genre/tv/list",{
           params: {
             language: this.lang,
             api_key: this.apiKey
           }
          })
        .then((result) => {
          result.data.genres.forEach((e) => {
            if(!this.generi.includes(e.name)) {
              this.generi.push(e.name);
            }
          });
          this.generi = this.generi.sort();
          this.generi.unshift('All')
        })
        .catch((error) => console.log(error));
  },
  methods: {
    search(){
    this.risultati = [];
    const parametri = {
        api_key: this.apiKey,
        query: this.query,
        language: this.lang
    }

    let movies = axios.get("https://api.themoviedb.org/3/search/movie",{ params: parametri });

    let tv = axios.get("https://api.themoviedb.org/3/search/tv",{ params: parametri });

      axios
        .all([movies,tv])
        .then((result) => {
          this.risultati = result[0].data.results;

          this.risultati.forEach((element) => {
                this.getCast(element, "movie");
                this.getGenres(element, "movie");
          });

          this.risultatiTv = result[1].data.results;
          this.risultatiTv.forEach((element) => {
                this.getCast(element, "tv");
                this.getGenres(element, "tv");
          });

          this.risultati = this.risultati.concat(this.risultatiTv);
          console.log(this.risultati);
       })
        .catch((error) => console.log(error));
    },

    getPoster(poster){
      return `https://image.tmdb.org/t/p/w185/${poster}`;
    },
    getCast(el, tipo) {
            axios.get(`https://api.themoviedb.org/3/${tipo}/${el.id}/credits?`, {
               params: {
                 language: this.lang,
                 api_key: this.apiKey
               }
            }).then((response) => {
               let castArray = response.data.cast;
               let castNames = [];
               castArray.slice(0, 5).forEach( (person) => {
                  castNames.push(person.name);
               });
               Vue.set(el, "cast", castNames);
            } )
         },
    getGenres (el,tipo) {
      axios.get(`https://api.themoviedb.org/3/genre/${tipo}/list?`, {
         params: {
           language: this.lang,
           api_key: this.apiKey
           }
         })
        .then(result => {
        let genresName = [];
        let tempGenres = result.data.genres;
        // console.log(tempGenres);
        // console.log(el);
        tempGenres.forEach(item => {
          if (el.genre_ids.includes(item.id)){
            genresName.push(item.name);
            // console.log(genresName);
          }
        })
        Vue.set(el, "genereName", genresName);
      })
    },
  }
});
