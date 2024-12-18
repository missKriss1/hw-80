import express from "express";
import categoryDb from "../categoryDb";
import {CategoryMutation} from "../types";

const categoryRouter = express.Router();

categoryRouter.post('/', async (req, res) => {
    if(!req.body.name){
        res.status(400).send("Name is required");
    }

    let newCategory : CategoryMutation = {
        name: req.body.name,
        description: req.body.description ? req.body.description : "",
    }

    newCategory =  await categoryDb.addCategory(newCategory);
    res.send(newCategory);
})

categoryRouter.get('/', async (req, res) => {
    const categories = await categoryDb.getCategories()
    res.send(categories)
})

categoryRouter.get('/:id', async (req, res) => {
    if(!req.params.id){
        res.status(400).send("Id params must be in url");
    }
    const categories = await categoryDb.categoryById(req.params.id);
    if (categories){
        res.send(categories);
    }else{
        res.send("Category not found");
    }
})

categoryRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send("Id params must be in url");
    }
    let categories = await categoryDb.deleteCategory(req.params.id);
    res.send(categories);
})

export default categoryRouter;