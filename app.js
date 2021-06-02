const chalk = require('chalk')
const { boolean } = require('yargs')
const yargs = require('yargs')
const { listNotes } = require('./notes.js')
const notes = require('./notes.js')

yargs.version('1.3.0')

yargs.alias('v', 'version')
yargs.alias('h', 'help')

// Create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      alias: 't',
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    },
    body: {
      alias: 'b',
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.addNote(argv.title, argv.body)
  }
})

// Create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a note from existing notes',
  builder: {
    title: {
      alias: 't',
      describe: 'Note title',
      type: 'string'
    },
    index: {
      alias: 'i',
      describe: 'Remove by index',
      type: 'number'
    }
  },
  handler: (argv) => {
    if (!argv.index) {
      notes.removeNote.byTitle(argv.title)
    } else {
      notes.removeNote.byIndex(argv.index)
    }
  }
})

// Create list command
yargs.command({
  command: 'list',
  describe: 'List all the notes',
  handler: () => {
    notes.listNotes()
  }
})

// Create read command
yargs.command({
  command: 'read',
  describe: 'Read a note from existing notes',
  builder: {
    title: {
      alias: 't',
      describe: 'Note title',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    notes.readNote(argv.title)
  }
})

yargs.parse()