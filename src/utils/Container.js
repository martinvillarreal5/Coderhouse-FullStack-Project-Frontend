const fs = require('fs').promises;
const fstest = require('fs')
class Container {
    constructor(file) {
        this.file = file;
        console.log(file)
    }

    async getById(id) {
        // Recibe un id y devuelve el objeto con ese id, o null si no está.
        try {
            let array = JSON.parse(await fstest.promises.readFile(this.file, 'utf-8'));
            const object = array.find(object => object.id === id);
            return object ? object : null;
        } catch (err) {
            console.log('Error en método getById: ', err);
        }
    }

    async save(object) {
        // Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
        try {
            let array = JSON.parse(
                await fs.readFile(this.file, 'utf-8'));

            // Archivo existente
            !array.length 
                ? object.id = 0 
                : object.id = array[array.length - 1].id + 1;
            array.push(object);

            await fs.writeFile(this.file, JSON.stringify(array, null, '\t'));
            return object.id;
        } catch (err) {
            // Si el archivo no existe, lo crea
            if (err.code === 'ENOENT') {
                object.id = 1;
                await fs.writeFile(this.file, JSON.stringify([object], null, '\t'));
                return object.id;
            } else {
                console.log('Error en método save: ', err);
            }
        }
    }

    

    async getAll() {
        // Devuelve un array con los objetos presentes en el archivo.
        try {
            return JSON.parse(await fs.readFile(this.file, 'utf-8'));
        } catch (err) {
            if (err.code === 'ENOENT') {
                return {};
            } else {
                console.log('Error en método getAll: ', err);
            }
        }
    }

    async deleteById(number) {
        // Elimina del archivo el objeto con el id buscado.
        try {
            let array = JSON.parse(await fs.readFile(this.file, 'utf-8'));
            const filteredArray = array.filter(object => object.id != number);
            await fs.writeFile(this.file, JSON.stringify(filteredArray, null, '\t'));
        } catch (err) {
            console.log('Error en método deleteById: ', err);
        }
    }

    async deleteAll() {
        // Elimina todos los objetos presentes en el archivo.
        try {
            await fs.writeFile(this.file, JSON.stringify([], null, '\t'));
        } catch (err) {
            console.log('Error en método deleteAll: ', err);
        }
    }

    async updateById(id, object) {
        // Actualiza un objeto en el archivo segun su id, usando un nuevo objeto como parametro. Devuelve (o no) el objeto.
        // TODO Mejorar implementacion?
        try {
            let array = JSON.parse(await fs.readFile(this.file, 'utf-8'));
            object.id = id;
            
            const index = array.findIndex((element) => {
                return element.id === object.id;
            })

            if (index !== -1) {
                array[index] = object;
                await fs.writeFile(this.file, JSON.stringify(array, null, '\t'));
                // return object; //Not necesary?
            } else {
                throw 'Producto no encontrado';
            }
        } catch (err) {
            console.log('Error en método updateById: ', err);
        }
    }
}

module.exports = {
    Container: Container,
};