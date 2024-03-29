#!/usr/bin/env node

const yargs = require('yargs')
const notes = require('./notes.js')

yargs.alias('v', 'version')
yargs.alias('h', 'help')
yargs.scriptName('bubby-tasks')

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
    if (argv.index === undefined) {
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
      type: 'string'
    },
    index: {
      alias: 'i',
      describe: 'Read by index',
      type: 'number'
    }
  },
  handler: (argv) => {
    if (argv.index === undefined) {
      notes.readNote.byTitle(argv.title)
    } else {
      notes.readNote.byIndex(argv.index)
    }
  }
})


if (process.argv.slice(2).length === 0) {
  console.log('Enter \'bubby-tasks --help\' for more info')
}
yargs.parse()