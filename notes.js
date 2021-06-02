const fs = require('fs')
const chalk = require('chalk')
const ellipsis = require('text-ellipsis')

const getNotes = () => {
  return 'Your Notes...'
}

// Main functions 

const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })

    saveNotes(notes)
    console.log(chalk.bgGreenBright.black.bold('[+] Note added '))
  } else {
    console.log(chalk.bgRed.black.bold('[!] Note title taken '))
  }
}

const removeNote = function (title) {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)

  if (notes.length !== notesToKeep.length) {
    saveNotes(notesToKeep)
    console.log(chalk.bgGreen.black.bold('[-] Note titled ' + '\'' + title + '\'' + ' deleted '))
  } else {
    console.log(chalk.bgRed.black.bold('[!] Note not found '))
  }
}

const listNotes = function () {
  console.log(chalk.green.bold('Your Notes: \n'))
  const notes = loadNotes()
  if (notes.length === 0) {
    console.log(chalk.yellowBright('[!] No notes found '))
  } else {
    notes.forEach((note, index) => {
      console.log(chalk.blue((index + 1) + '. '), chalk.yellow(ellipsis(note.title, 50)))
      console.log('   ', chalk.red(ellipsis(note.body, 75)), '\n')
    });
  }
}

const readNote = function (title) {
  console.log(chalk.green.bold('Your Note: \n'))
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)

  if(note) {
    console.log(chalk.yellow(note.title))
    console.log(chalk.red(note.body), '\n')
  } else {
    console.log(chalk.yellowBright('[!] No note was found '))
  }
}

// Helper Functions

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}