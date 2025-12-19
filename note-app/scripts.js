const notesArr =  { title: "", desc: "", bgColor: "" }
const colorArr = ['#ADEAC3','#90DAD9','#F2DDC0','#F3BEBC','#E7A8E3','#A09CF3'];

const addBtn = document.getElementById('add'); 
addBtn.addEventListener('click', () => addNewNote(notesArr)); 

const notes = JSON.parse(localStorage.getItem('notes'));
// //localStorage.clear();
// console.log(notes)

if(notes) {
  notes.forEach(note => addNewNote(note))
}

function addNewNote(singleNote) {   
  const  note = document.createElement('div'); 
  note.classList.add('note');
  note.classList.add('bg-slate'); 
  note.style.backgroundColor = singleNote.bgColor 
  note.innerHTML = `  
  <div class="header">  
  <input class="title" placeholder="Enter Title"/>     
  <div class="dropdown">
  <button id="dropBtn" class="dropbtn"><i class="fas fa-ellipsis-v"></i></button>  
  <div class="dropdown-content">
  <small>Change Background</small>
  <div class="color-btn-group">
  <button id="magicMint" class="color-btn"></button>
  <button id="paleRobinBlue" class="color-btn"></button>
  <button id="dutchWhite" class="color-btn"></button>
  <button id="spanishPink" class="color-btn"></button>
  <button id="lightOrchid" class="color-btn"></button>
  <button id="bluePurple" class="color-btn"></button>
  </div>
  <hr>
  <a class="delete text-red"><i class="fas fa-trash-alt"></i>  Delete</a>
  </div>
  </div>
  </div>   
  <textarea class="notes-textarea" placeholder="Enter Note" dir="ltr"></textarea>
  
  `;  
  // // dropdown
  const dropbtn = note.querySelector('#dropBtn')
  const dropDown = note.querySelector('.dropdown-content')
  
  dropbtn.addEventListener('click', (e) => {
    dropDown.classList.toggle('show')
    e.target.classList.toggle('btn-active')   
  })
  
  window.onclick = (event) =>  {
    if (!event.target.matches('.dropbtn')) {        
      let dropdowns = document.querySelectorAll(".dropdown-content");         
      for (let i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i]
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
        if(dropbtn.classList.contains('btn-active')) {
          dropbtn.classList.remove('btn-active');
        }
      }
    } 
  }   
  //bg-color change 
  const colBtns = note.querySelectorAll('.color-btn');
  colBtns.forEach((colBtn,i) => {
    colBtn.addEventListener("click", () => {
      note.style.backgroundColor=(colorArr[i])
      dropbtn.classList.remove('btn-active');
      updateLS();
    })
  })   
  //delete
  const deleteBtn = note.querySelector('.delete'); 
  
  const title = note.querySelector('.title');       
  const textArea = note.querySelector('.notes-textarea');  
  
  title.value = singleNote.title;
  textArea.value = singleNote.desc;   
  
  deleteBtn.addEventListener('click', () => {  
    note.remove();  
    updateLS();  
  });  
  
  title.addEventListener('input', ()=> updateLS());
  textArea.addEventListener('input', (e) => updateLS());  
  document.getElementById('notes').appendChild(note); 
};   
  
function updateLS() { 
const allNotes = document.querySelectorAll('.note')   
let notes = [];    
  allNotes.forEach((note,i) => {
    const notesTitle = document.querySelectorAll('.title');
    const notesText = document.querySelectorAll('.notes-textarea');
    notes = [...notes, {
      title: notesTitle[i].value,
      desc: notesText[i].value,
      bgColor: note.style.backgroundColor
    }]
    
  })
  localStorage.setItem('notes', JSON.stringify(notes)); 
} 



