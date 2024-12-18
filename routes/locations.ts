import express from "express";;
import locationDb from "../locationDb";
import {LocationMutation} from "../types";

const locationRouter = express.Router();

locationRouter.post('/', async (req, res) => {
    if(!req.body.name){
        res.status(400).send("Name is required");
    }

    let newLocation : LocationMutation = {
        name: req.body.name,
        description: req.body.description ? req.body.description : "",
    }

    newLocation =  await locationDb.addLocations(newLocation);
    res.send(newLocation);
})

locationRouter.get('/', async (req, res) => {
    const locations = await locationDb.getLocations()
    res.send(locations)
})

locationRouter.get('/:id', async (req, res) => {
    if(req.params.id){
        res.status(400).send("Id params must be in url");
    }
    const locations = await locationDb.locationsById(req.params.id);
    if (locations){
        res.send(locations);
    }else {
        res.send('Location not found')
    }
})

locationRouter.delete('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send("Id params must be in url");
    }
    let locations = await locationDb.deleteLocations(req.params.id);
    res.send(locations);
})

export default locationRouter;