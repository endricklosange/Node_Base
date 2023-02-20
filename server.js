//server.js
/*******CONFIG******/

let express = require('express')

// charge le module de database
let db = require('./config/database')

let app = express()
app.set('view engine', 'ejs')

//permet de décoder les donnée de requetes
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// rend le dossier public accessible depuis l'adresse
app.use('/assets', express.static('public'))
/*******ROUTES******/
app.get('/', (req, res) => {
	res.render('pages/index')
})

app.get('/nonvalide', (req, res) => {
	res.send('Ce chemin n\'est pas valide')
})

app.get('/date', (req, res) => {
	let t = new Date()
	res.render('pages/date', { today : t.toLocaleDateString("fr-FR")})
})

app.get('/date/:n', (req, res) => {
	let t = new Date()
	let d = new Date()
	d.setDate(t.getDate() + parseInt(req.params.n))
	res.render('pages/date', { today : t.toLocaleDateString("fr-FR"), other : d.toLocaleDateString("fr-FR"), n :req.params.n})
})
app.post('/date', (req, res) => {
  let numberForm = req.body.nombre
  // on redirige vers la bonne adresse avec le paramètre
  res.redirect('/date/' + numberForm)
})

app.get('/form', (req, res) => {
	res.render('pages/form')
})

app.post('/form', (req, res) => {
  console.log(req.body)
  // On envoie les données a la vue

  res.render('pages/form',{ formContent : req.body.content})
})
app.get('/games', (req, res) => {
  //requete qui cherche toutes les données
  db.query('SELECT * FROM videogame ORDER BY name', (error, results) => {

    console.log(results)

      res.render('pages/listing', { posts : results })
  })
})
app.get('/*', (req, res) => {
	//pour toute autre route, on redirige vers /nonvalide
	res.redirect('nonvalide')
})


//port
app.listen(8888)