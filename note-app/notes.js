 notesArr = [
  {
    title: "Helllo",
    desc: "Hello\n",
    color: "#BADA55"
  },
  {
    title: "2nd Healder",
    desc: "Hello\n",
    color: "#BADA55"
  },
]
// fsdfs
// fsdfklsd
const colorArr = ['#ADEAC3','#90DAD9','#F2DDC0','#F3BEBC','#E7A8E3','#A09CF3'];

const addBtn = document.getElementById('add');  
const notes = JSON.parse(localStorage.getItem('notes'));
//localStorage.clear();
console.log(notes)

if(notes) { 
  for(let i = 0; i < notes[0].length; i++){  
    let pairs = [[notes[0][i], notes[1][i]]];
    pairs.forEach(pairs => addNewNote(pairs[0], pairs[1]));  
  } 
}

addBtn.addEventListener('click', () => addNewNote());  
function addNewNote(notetitle = '', notetext = '') {   
  const  note = document.createElement('div'); 
  note.classList.add('note');
  note.classList.add('bg-slate');  
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
   const dropbtn = note.querySelector('.dropbtn')
  const dropDown = note.querySelector('.dropdown-content')

  dropbtn.addEventListener('click', () => {
    dropDown.classList.toggle('show')
    dropbtn.classList.toggle('btn-active')   
  })
 
  window.onclick = (event) =>  {
    if (!event.target.matches('.dropbtn')) {        
        var dropdowns = document.getElementsByClassName("dropdown-content");         
          for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i]
            if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
              dropbtn.classList.remove('btn-active')
            }
          }
        } 
  }  
 
  //bg-color change 
  const colBtns = note.querySelectorAll('.color-btn');
  // const colBtn1 = note.querySelector('#magicMint');
  // const colBtn2 = note.querySelector('#paleRobinBlue');
  // const colBtn3 = note.querySelector('#dutchWhite');
  // const colBtn4 = note.querySelector('#spanishPink');
  // const colBtn5 = note.querySelector('#lightOrchid');
  // const colBtn6 = note.querySelector('#bluePurple');
  colBtns.forEach((colBtn,i) => {
    colBtn.addEventListener("click", () => note.style.backgroundColor=(colorArr[i]))
  })
  // colBtn1.addEventListener('click', () => note.style.backgroundColor=('#ADEAC3'));
  // colBtn2.addEventListener('click', () => note.style.backgroundColor=('#90DAD9'));
  // colBtn3.addEventListener('click', () => note.style.backgroundColor=('#F2DDC0'));
  // colBtn4.addEventListener('click', () => note.style.backgroundColor=('#F3BEBC'));
  // colBtn5.addEventListener('click', () => note.style.backgroundColor=('#E7A8E3'));
  // colBtn6.addEventListener('click', () => note.style.backgroundColor=('#A09CF3'));

  //delete
  const deleteBtn = note.querySelector('.delete'); 

  const title = note.querySelector('.title');       
  const textArea = note.querySelector('.notes-textarea');  
  
   title.value = notetitle ;
   textArea.value = notetext ;   

  deleteBtn.addEventListener('click', () => {  
    note.remove();  
    updateLS();  
  });  

  title.addEventListener('input', (e)=> {
      const { value } = e.target;     
      updateLS();
  });
  textArea.addEventListener('input', (e) => {  
    const { textContent } = e.target;
        
    updateLS();  
  });  
  document.getElementById('notes').appendChild(note); 
}; 


function updateLS() { 
  const notesTitle = document.querySelectorAll('.title');
  const notesText = document.querySelectorAll('.notes-textarea');   
  const notesTexts = [];
  const notesTitles = [];    
    
  notesTitle.forEach(note => notesTexts.push(note.value));
  notesText.forEach(note => notesTitles.push(note.value));  
  const notes = [notesTexts, notesTitles];  
   
  localStorage.setItem('notes', JSON.stringify(notes));  
} 



