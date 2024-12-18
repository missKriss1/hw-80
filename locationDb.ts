import {promises as fs} from 'fs';
import {ILocation, LocationMutation} from "./types";

const filename = './places.json';
let data: ILocation[] = [];

const locationDb = {
    async init() {
        try{
            const fileContent = await  fs.readFile(filename);
            data =  await JSON.parse(fileContent.toString()) as ILocation[];
        }catch(err){
            console.error(err);
        }
    },
    async getLocations () {
        return data
    },
    async addLocations(location: LocationMutation){
        const id = crypto.randomUUID();
        const locations = {id, ...location};
        data.push(locations);
        await this.save();
        return locations;
    },
    async locationsById(id: string) {
        const location = data.find(cat => cat.id === id);
        if (location) {
            return location;
        }else {
            return null;
        }
    },
    async deleteLocations(id: string){
        const index = data.findIndex(cat => cat.id === id);
        const deleteLocation = data.splice(index, 1)[0];
        await this.save();
        return deleteLocation;
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
}

export default locationDb;