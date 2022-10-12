//SELECTOR
const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

const heads = JSON.parse(localStorage.getItem("heads"));

const helpBtn = document.getElementById("help");

//EVENT LISTENER

addBtn.addEventListener("click", (e) => {
	addNewNote();
});

//FUNCTION

if (notes) {
	
	notes.forEach((note, index) => {
		addNewNote(note, index);
	});

}


function addNewNote(text = "",index) {
	const note = document.createElement("div");
	note.classList.add("note");
	note.innerHTML = `
        <div class="notes">
			<div class="head-container">
				<div class="head">
					<a class="heading">${(heads!==null&&index<heads.length)?heads[index]:"Note"}</a>
				</div>
				<div class="tools">
					<button class="download"><i class="fas fa-download"></i></button>
					<button class="edit"><i class="fas fa-edit"></i></button>
					<button class="delete"><i class="fas fa-trash-alt"></i></button>
				</div>
			</div>
			<div class="text ${text ? "" : "hidden"}"></div>
			<textarea class="area ${text ? "hidden" : ""}"></textarea>
		</div>
        `;
	const downloadBtn = note.querySelector(".download");
	const editBtn = note.querySelector(".edit");
	const deleteBtn = note.querySelector(".delete");
	const heading=note.querySelector(".heading");

	const main = note.querySelector(".text");
	const textArea = note.querySelector("textarea");

	textArea.value = text;

	main.innerHTML = marked.parse(text);

	//EVENT LISTENER
	

	heading.addEventListener("dblclick", (e) =>{
		var head= prompt("Enter name here");
		if(head!=null){
			note.querySelector(".heading").innerHTML=head;
			updateLS();
		}
	});

	downloadBtn.addEventListener("click", (e) => {
		const content = textArea.value;
		var currNote=note;
		if(content){
			downloadNote(content,currNote);
		}
	});

	deleteBtn.addEventListener("click", (e) => {
		var con = confirm("Are you sure want to delete the note?");
		if(con){
			const head=note.querySelector('.text').innerText;
			const index=JSON.parse(localStorage.getItem("notes")).indexOf(head);
			var arr=JSON.parse(localStorage.getItem("heads"))
			arr.splice(index,1);
			localStorage.setItem("heads", JSON.stringify(arr));
			note.remove();
			updateLS();
		}
	});

	editBtn.addEventListener("click", () => {
		main.classList.toggle("hidden");
		textArea.classList.toggle("hidden");
	});

	textArea.addEventListener("input", (e) => {
		const { value } = e.target;
		main.innerHTML = marked.parse(value);
		updateLS();
	});

	document.body.appendChild(note);
}

function downloadNote(content,currNote) {
	const ele = document.createElement('a');
	const blob = new Blob([content],{type : 'plain/text'});
	const fileUrl=URL.createObjectURL(blob);
	const head=currNote.querySelector(".heading");
	ele.setAttribute('href',fileUrl);
	ele.setAttribute('download',head.innerText+".txt");
	ele.style.display='none';
	document.body.appendChild(ele);
	ele.click();

	document.body.removeChild(ele);
};

function updateLS() {
	const headText = document.querySelectorAll(".heading");
	// console.log(headText);
	const heads=[]

	headText.forEach(head => {
		heads.push(head.innerText);
	});

	localStorage.setItem("heads", JSON.stringify(heads));

	const notesText = document.querySelectorAll(".area");
	const notes=[]

	notesText.forEach((note) => {
		notes.push(note.value);
	});

	localStorage.setItem("notes", JSON.stringify(notes));

}

// var heads=[];
// function updateheadLs(currNote){
// 	if(notes==null){
// 		heads.push("Note");
// 	}
// 	else if(localStorage.getItem('heads')){
// 		console.log(JSON.parse(localStorage.getItem('heads')));
// 		heads=JSON.parse(localStorage.getItem('heads'));
// 		const currhead = currNote.querySelector('.heading');
// 		const currtext=currNote.querySelector('.text').innerText;
// 				// console.log(JSON.parse(localStorage.getItem("notes")).indexOf(head),JSON.parse(localStorage.getItem("notes")),head.replace(/\r?\n|\r/g, " "));
// 		const index=JSON.parse(localStorage.getItem("notes")).indexOf(currtext);
// 		// console.log(head.innerText);
// 		if(heads!==null && index>heads.length){
// 			heads.push(currhead.innerText);
// 		}else{
// 			heads[index]=currhead.innerText;
// 		}
// 	}
	
// 	localStorage.setItem("heads",JSON.stringify(heads));
// }

const hel = document.querySelector('.help-btn');
document.addEventListener('mouseup', function (e) {
	var container = document.querySelector('.h');

	if (!container.classList.contains("hide") && !(container.contains(e.target))) {
		container.classList.add("hide");
	}
	else if (e.target == hel) {
		container.classList.remove("hide");
	}
});

function headingAlert(){
	
}