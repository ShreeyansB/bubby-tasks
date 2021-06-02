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
    console.log(chalk.greenBright.bold('\n[+] Note added '))
  } else {
    console.log(chalk.redBright.bold('\n[!] Note title taken '))
  }
}

const removeNote = {
  byTitle: function (title) {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length !== notesToKeep.length) {
      saveNotes(notesToKeep)
      console.log(chalk.greenBright.bold('\n[-] Note titled ' + '\'' + chalk.blue(title) + '\'' + ' deleted '))
    } else {
      console.log(chalk.redBright.bold('\n[!] Note not found '))
    }
  },
  byIndex: function (index) {
    const notes = loadNotes()
    if (notes.length === 0) {
      console.log(chalk.redBright.bold('\n[!] No notes exist '))
      return
    } else if (index < 1 || index > notes.length) {
      console.log(chalk.yellowBright('[!] Invalid index '))
      return
    } else {
      const deletedNote = notes.splice(index - 1, 1)
      console.log(chalk.greenBright.bold('\n[-] Note titled ' + '\'' + chalk.blue(deletedNote[0].title) + '\'' + ' deleted '))
      saveNotes(notes)
    }

  }
}

const listNotes = function () {
  console.log(chalk.green.bold('\nYour Notes: \n'))
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
  console.log(chalk.green.bold('\nYour Note: \n'))
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)

  if (note) {
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