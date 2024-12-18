import {CategoryMutation, ICategory} from "./types";
import {promises as fs} from 'fs';

const filename = './categories.json';
let data: ICategory[] = [];

const categoryDb = {
    async init() {
        try{
            const fileContent = await  fs.readFile(filename);
            data =  await JSON.parse(fileContent.toString()) as ICategory[];
        }catch(err){
            console.error(err);
        }
    },
    async getCategories () {
        return data
    },
    async addCategory(category: CategoryMutation){
        const id = crypto.randomUUID();
        const categories = {id, ...category};
        data.push(categories);
        await this.save();
        return categories;
    },
    async categoryById(id: string) {
        const category = data.find(cat => cat.id === id);
        if (!category) {
            throw new Error(`Категория с ID ${id} не найдена`);
        }
        return category;
    },
    async deleteCategory(id: string){
        const index = data.findIndex(cat => cat.id === id);
        const deleteCategory = data.splice(index, 1)[0];
        await this.save();
        return deleteCategory;
    },
    async save() {
        return fs.writeFile(filename, JSON.stringify(data, null, 2));
    }
}

export default categoryDb;