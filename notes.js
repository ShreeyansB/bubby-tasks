const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
  return 'Your Notes...'
}

// Main functions 

const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    })

    saveNotes(notes)
    console.log(chalk.bgGreenBright.black.bold('[+] Note added '))
  } else {
    console.log(chalk.bgRed.black.bold('[!] Note title taken '))
  }


  console.log(notes)
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

  console.log(notesToKeep)
}

const listNotes = function () {
  console.log(chalk.green.bold('Your Notes: \n'))
  const notes = loadNotes()
  if(notes.length === 0) {
    console.log(chalk.yellowBright('[!] No notes found '))
  } else {
    notes.forEach((note, index) => {
      console.log(chalk.blue((index + 1) + '. '), chalk.yellow(note.title))
      console.log('   ', chalk.red(note.body), '\n')
    });
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
  listNotes: listNotes
}