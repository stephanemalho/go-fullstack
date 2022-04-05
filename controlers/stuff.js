const Thing = require("../models/things")

exports.createThing = (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // update one element selecting him by its id
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id }) // delete one element selecting him by its id
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.oneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) // find one element and select him by its id
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
};

exports.allThings = (req, res, next) => {
  Thing.find() // find all elements
  .then(things => res.status(200).json(things))
  .catch(error => res.status(400).json({ error }));
  };