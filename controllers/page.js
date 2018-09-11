const I18n = require('i18n');
const Movie = require(`${process.cwd()}/models/movie`);

exports.index = (req,res) => {
    console.log(I18n.__('hello'));
    res.render('pages/index',{})
};

           

exports.index = async (req,res) =>{
    let topMovies = await Movie.find().sort({'fields.rank':1}).limit(11);
        res.render('pages/index', {
            title : "movie",
            topMovies3 : topMovies.slice(0,3),
            moviesColRight : topMovies.slice(3,6),
            moviesAboveFooter : topMovies.slice(6,10)
    })
}

exports.details = async (req,res) => {
    let id = req.params.id;
    let movie = await Movie.findOne({ _id : id});
    res.render('pages/details', {
        title : movie.fields.title,
        movie : movie
    })
}


exports.reviews = async (req,res) => {
    let movies = await Movie.find().sort({'fields.title':1});
    let genres = [];
    let years = [];
    let i = 2000, current = parseInt(new Date().getUTCFullYear());

    await movies.forEach(async (movie) => {
        await movie.fields.genres.forEach(async(genre) => {
            if(genres.lastIndexOf(genre) === -1)
            {
                await genres.push(genre)
            }
        })
    })

    for (i;i<=current; i++){
        years.push(i);
    }

    res.render('pages/reviews', {
        title : "movie reviews",
        movies : movies.slice(0,12),
        genres :genres.sort(),
        years : years.reverse()
    })
}


exports.filter = async (req,res) => {
    // Récupération des paramètres passés par la requête
    let genre = req.params.genre;
    let year = req.params.year;
    let page = req.params.page - 1;
    let moviesByPage = 12;

    // Récupération des films en DB, en fonction des critères passés par la requête
    let movies = await Movie
        .find(
            {
                $and : [
                    { 'fields.genres': { $in : [genre]} },
                    { 'fields.year'  : year }
            ]}) 
        .sort({ 'fields.title' : 1})
        .skip(moviesByPage*page) 
        .limit(moviesByPage);
        
        // retourner les résultats
        // Méthode 1 = retourner la view compilée côté serveur en cas de non framework côté client
        //res.render('partials/movies', {
        //    movies : movies,
        //    layout : null
        //})

        //Méthode 2 = retourner du JSON (MIEUX)
        res.json(movies)

}


            
        
