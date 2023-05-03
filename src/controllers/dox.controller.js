import User from '../models/User';
import Dox from '../models/Dox';
import mongoose, { mongo } from 'mongoose';
import filesize from 'filesize';
import { addDoxBadge } from '../lib/addBadge';

const postDox = async (req, res) => {
  const { title, content, description } = req.body;
  let tags = [];
  if (req.body.tags) {
    if (req.body.tags.length > 5) {
      req.body.tags = req.body.tags.slice(0, 5)
    }
    for (let i = 0; i < req.body.tags.length; i++) {
      if (typeof req.body.tags[i] !== 'string') return res.status(400).json({ status: 400, message: 'No intentes enviar tags inválidos!' });
      if (req.body.tags[i].length > 20) {
        req.body.tags[i] = req.body.tags[i].slice(0, 20);
      }
      if (req.body.tags[i] === null) return res.status(400).json({ status: 400, message: 'No intentes enviar tags vacíos!' });
      tags.push(req.body.tags[i].replace(/[^a-zA-Z\- ]/g, "").replace(' ', '-').trim().toLowerCase());
    }
  } else {
    tags.push('nationsquad')
  }
  const newDox = new Dox({
    title,
    content,
    description,
    tags,
    author: req.user ? req.user.id : null,
    date: new Date()
  });
  await newDox.save();
  let gotten = null;
  if (req.user) {
    req.user.doxes.push(newDox.id);
    await req.user.save();
    const badge = await addDoxBadge(req.user, true);
    gotten = badge;
  }
  return res.status(201).json({ status: 201, message: 'Dox creado correctamente', gotten, dox: newDox });
}

const getDoxes = async (req, res) => {
  let { int } = req.params;
  if (isNaN(int)) return res.status(400).json({ status: 400, message: 'Página de doxs inválida' });
  const all_doxes = await Dox.find({ deleted: false });
  if (int === 0) {
    int = 1;
  }
  if (int > Math.ceil(all_doxes.length / 10)) return res.status(404).json({ status: 404, message: 'Desearíamos tener tantos doxs!' });
  let page = int * 10;
  let doxes = await Dox.find({ deleted: false })
    .select('-content')
    .limit(page)
    .sort({ date: -1 })
    .populate({
      path: 'author', options: { select: '-liked_doxes' }, populate: [
        {
          path: 'doxes',
          match: { deleted: false },
          options: {
            select: '_id'
          }
        },
        {
          path: 'badges',
          options: {
            select: 'description logo',
            sort: { index: 1 }
          }
        }
      ]
    });
  doxes = doxes.slice(page - 10, page);

  return res.status(200).json({
    status: 200,
    page: parseInt(int),
    prev: !(1 >= int),
    next: !(int > all_doxes.length / 10),
    length: doxes.length,
    all_doxes_length: all_doxes.length,
    doxes
  });
}

const getHisDoxes = async (req, res) => {
  const { userId, int } = req.params;
  const user = await User.findOne({ userId: userId });
  if (!user) return res.status(404).json({ status: 404, message: 'Ese usuario se lo comió nsnt' });
  if (isNaN(int)) return res.status(400).json({ status: 400, message: 'Página de doxs inválida' });
  let doxes = await user.populate({
    path: 'doxes',
    match: { deleted: false },
    options: {
      sort: { 'date': -1 }
    }
  });
  doxes = await doxes.populate({
    path: 'doxes',
    options: {
      select: { content: 0 }
    },
    populate: {
      path: 'author',
      model: 'User'
    }
  });
  doxes = doxes.doxes;
  if (int === 0) {
    int = 1;
  }
  if (int > Math.ceil(doxes.length / 7)) return res.status(404).json({ status: 404, message: 'Este usuario no tiene tanto dox' });
  let page = int * 7;
  const all_doxes_length = doxes.length;
  doxes = doxes.slice(page - 7, page);
  return res.status(200).json({
    status: 200,
    page: parseInt(int),
    prev: !(1 >= int),
    next: !(int > all_doxes_length / 7),
    length: doxes.length,
    all_doxes_length,
    doxes
  });
}

const getLikedDoxes = async (req, res) => {
  let { int } = req.params;
  let doxes = await req.user.populate({
    path: 'liked_doxes',
    match: { deleted: false },
    options: {
      sort: { 'date': -1 }
    }
  });
  doxes = await doxes.populate({
    path: 'liked_doxes',
    populate: {
      path: 'author',
      model: 'User'
    }
  });
  doxes = doxes.liked_doxes;
  if (int === 0) {
    int = 1;
  }
  if (int > Math.ceil(doxes.length / 7)) return res.status(404).json({ status: 404, message: 'Este usuario no tiene tanto dox' });
  let page = int * 7;
  const all_doxes_length = doxes.length;
  doxes = doxes.slice(page - 7, page);
  return res.status(200).json({
    status: 200,
    page: parseInt(int),
    prev: !(1 >= int),
    next: !(int > all_doxes_length / 7),
    length: doxes.length,
    all_doxes_length,
    doxes
  });
}

const getDox = async (req, res) => {
  const { id } = req.params;
  const dox = await Dox.findById(id).populate('author');
  if (!dox || dox.deleted) return res.status(404).json({ status: 404, message: 'ese dox se lo comio nsnt' });
  let file_size = filesize(Buffer.byteLength(dox.content, 'utf8'));
  return res.status(200).json({ status: 200, file_size, dox });
}

const searchDoxes = async (req, res) => {
  let { query } = req.params;
  if (!query) return res.status(400).json({ status: 400, message: 'No intentes enviar una query vacía!' });
  query = query.toLowerCase();
  let allDoxes = await Dox.find({ deleted: false }).populate('author');
  let doxes = [];
  allDoxes.forEach(dox => {
    if (dox.title.toLowerCase().includes(query)) return doxes.push(dox);
    if (dox.author) {
      if (dox.author.username.toLowerCase().includes(query)) return doxes.push(dox);
    }
    if (dox.tags.includes(query)) return doxes.push(dox);
    if (dox.description.includes(query)) return doxes.push(dox);
    if (dox.content.toLowerCase().includes(query)) return doxes.push(dox);
  })
  if (0 >= doxes.length) return res.status(404).json({ status: 404, message: 'No hay resultados para tu búsqueda' });
  return res.status(200).json({ status: 200, doxes });
}

const deleteDox = async (req, res) => {
  const user = req.user;
  try {
    const dox = await Dox.findById(req.params.id);
    if (String(dox.author) !== String(user.id) && !user.admin && !user.mod) return res.status(403).json({ status: 403, message: 'NO PODES BORRAR ESO PAJERO' });
    if (dox.deleted) return res.status(409).json({ status: 409, message: 'Ese dox ya fue eliminado previamente' });
    const author = await User.findById(mongoose.Types.ObjectId(dox.author));
    dox.deleted = true;
    await dox.save();
    let badge;
    if (author) {
      badge = await addDoxBadge(author, false);
    }
    res.status(201).json({ status: 201, badge, message: 'Dox eliminado con éxito' });
  } catch (e) {
    console.log(e);
    return res.status(404).json({ status: 404, message: 'ese dox se lo comio nsnt' });
  }
}

const getStarDoxes = async (req, res) => {
  const doxes = await Dox.find({ star: true }).select('-content').sort({ date: -1 }).populate('author');
  return res.status(200).json({ status: 200, doxes });
}

const makeStarDox = async (req, res) => {
  const dox = await Dox.findById(req.params.id);
  if (!dox) return res.status(404).json({ status: 404, message: 'ese dox se lo comio nsnt' }); // JAJAJAJJAJAJA
  dox.star = !dox.star;
  await dox.save();
  return res.status(201).json({ status: 201, starred: dox.star, dox });
}

const like = async (req, res) => {
  const user = req.user;
  const dox = await Dox.findById(req.params.id);
  if (!dox || dox.deleted) return res.status(404).json({ status: 404, message: 'ese dox se lo comio nsnt' });
  let liked = true;
  if (!user.liked_doxes.includes(mongoose.Types.ObjectId(dox._id))) {
    user.liked_doxes.push(dox._id);
    dox.likes++
  } else {
    for (let i = 0; i < user.liked_doxes.length; i++) {
      console.log(String(user.liked_doxes[i]));
      if (String(user.liked_doxes[i]) === String(dox.id)) {
        user.liked_doxes.splice(i, 1);
      }
    }
    dox.likes--
    liked = false;
  }
  try {
    await user.save();
    await dox.save();
    return res.status(201).json({ status: 201, liked, doxes: dox });
  } catch (e) {
    console.log(e);
    return res.status(502).json({ status: 502, message: "Ocurrió un error dándole like a este dox" });
  }
}

module.exports = {
  postDox,
  getDoxes,
  getDox,
  deleteDox,
  getStarDoxes,
  makeStarDox,
  getLikedDoxes,
  like,
  getHisDoxes,
  searchDoxes
}