const fs = require('fs')
const chalk = require('chalk')

const getNotes = function getNotes() {
  return 'Your notes...'
}

const addNote = function (title, body) {
  const notes = loadNotes()
  const duplicateNotes = notes.filter(function (note) {
    return note.title === title
  })

  if(duplicateNotes.length === 0) {
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
  const notesToKeep = notes.filter(function (note) {
    return note.title !== title
  })

  if(notes.length !== notesToKeep.length) {  
    saveNotes(notesToKeep)
    console.log(chalk.bgGreen.black.bold('[-] Note titled ' + '\'' + title+'\'' + ' deleted '))
  } else {
    console.log(chalk.bgRed.black.bold('[!] Note not found '))
  }

  console.log(notesToKeep)
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
}