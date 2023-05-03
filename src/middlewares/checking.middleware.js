import axios from 'axios';
import Dox from '../models/Dox';
import mongoose from 'mongoose';
import { verify } from 'hcaptcha';

export const isDoubleDox = async (req, res, next) => {
    const { title } = req.body;
    const titleExist = await Dox.findOne({title});
    if (titleExist) return res.status(409).json({status: 409, message: "Ya existe un dox con ese título!"});
    next();
}

export const addView = async (req, res, next) => {
    const dox = await Dox.findById(req.params.id);
    dox.views++;
    await dox.save();
    next();
}

export const isDoxLength = async (req, res, next) => {
    const { title, content, description } = req.body;
    if (!title || !content || !description) return res.status(400).json({status: 400, message: "Hacen falta parámetros"});
    if (title.length <= 2) return res.status(409).json({status: 409, message: "Tu título es muy corto"});
    if (title.length > 35) return res.status(409).json({status: 409, message: "Tu título es muy largo"});
    if (description.length <= 2) return res.status(409).json({status: 409, message: "Tu descripción es muy corta"});
    if (description.length > 40) return res.status(409).json({status: 409, message: "Tu descripción es muy larga"});
    if (content.length <= 10) return res.status(409).json({status: 409, message: "Tu contenido es muy corto"});
    next();
}

export const doesDoxExist = async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({status: 400, message: "ese dox se lo comió nsnt"});
    const dox = await Dox.findById(req.params.id);
    if (!dox || dox.deleted) return res.status(404).json({status: 404, message: "ese dox se lo comió nsnt"});
    next();
}

export const checkCaptcha = async (req, res, next) => {
    if (!req.body.token) return res.status(409).json({status: 400, message: 'Por favor, completa el captcha'});

    const key = process.env.CAPTCHA_KEY
    const token = req.body.token;

    try {
        const { success } = await verify(key, token);
        if (!success) return res.status(409).json({status: 409, message: 'Por favor, completa el captcha'});
        return next();
    } catch(e) {
        return res.status(502).json({status: 502, message: 'Error del captcha, inténtalo de nuevo'});
    }
}