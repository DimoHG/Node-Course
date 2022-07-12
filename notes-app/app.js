import yargs from "yargs/yargs";
import {addNote, removeNote, listNotes, readNote} from "./src/notes.js";
yargs(process.argv.slice(2))
    .command({
        command: 'add',
        describe: 'Add note',
        builder: {
            title:{
                describe: 'Note title',
                demand: true,
                type: 'string'
            },
            body:{
                describe: 'Note title',
                demand: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            addNote(argv.title, argv.body)
        }
    }).command({
        command: 'remove',
        describe: 'Remove note',
        builder: {
            title:{
                describe: 'Note title',
                demand: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            removeNote(argv.title)
        }
    }).command({
        command: 'list',
        describe: 'List notes',
        handler: function () {
            listNotes();
        }
    }).command({
        command: 'read',
        describe: 'Read note',
        builder: {
            title: {
                describe: 'Note title',
                demand: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            readNote(argv.title)
        }
    }).command({
        command: 'del',
        describe: 'Del command',
        handler() {
            console.log('working')
        }
    }).parse()
