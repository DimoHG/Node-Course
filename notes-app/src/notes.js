import fs from 'fs'
import chalk from "chalk";

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(e => e.title !== title);
    if (notes.length === notesToKeep.length) {
        console.log(chalk.inverse.red('No notes were removed'))
    } else {
        console.log(chalk.inverse.green('Note removed'))
        saveNotes(notesToKeep);
    }
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicatedNote = notes.find(e => e.title === title);
    if (!duplicatedNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
    } else {
        console.log('Note already exists!')
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('./resources/notes.json', notesJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('./resources/notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (exception) {
        return [];
    }
}

const listNotes = () => {
    console.log(loadNotes())
}
const readNote = (title) => {
    debugger;
    const notes = loadNotes();
    const noteToPrint = notes.find(note => note.title === title);
    if(noteToPrint){
        console.log(chalk.inverse.bgGreen(noteToPrint.title));
        console.log(noteToPrint.body);
    } else {
        console.log(chalk.inverse.red('No such note'))
    }
}

export {
    addNote,
    removeNote,
    listNotes,
    readNote
}
