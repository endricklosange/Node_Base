let db = require('../config/database');
let moment = require('moment');
moment.locale('fr')
class Game {
    constructor(data) {
        if (data == null) {
            this._id = null;
            this._name = null;
            this._platform = null;
            this._created = null;
            this._modified = null;
        } else {
            this._id = data.id
            this._name = data.name;
            this._platform = data.platform;
            this._created = data.created;
            this._modified = data.modified;
        }
    };

    get id() { return this._id; }
    get name() { return this._name; }
    get platform() { return this._platform; }
    get created() { return moment(this._created) }
    get modified() { return moment(this._modified) }
    set id(id) { this._id = id; }
    set name(name) { this._name = name }
    set platform(platform) { this._platform = platform }
    set created(created) { this._created = created }
    set modified(modified) { this._modified = modified }

    static all(callback) {
        db.query('SELECT * FROM videogame ORDER BY name',
            function (error, results) {
                callback(results.map((data) => new Game(data)));
            })
    }
    static create(name,platform,callback){
        db.query('INSERT INTO videogame (name, platform) VALUES (?, ?)', [name, platform], (error, results) =>{
            callback(results)
        })
        
    }
}
module.exports = Game