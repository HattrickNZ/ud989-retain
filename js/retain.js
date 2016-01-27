$(function(){
	
	//where does the enter button be picked up? 
	var debug = 1;
	
	
    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
			if(debug){console.log("obj",obj)}
            var data = JSON.parse(localStorage.notes);
			if(debug){console.log("data",data)}
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
			if(debug){console.log("localStorage.notes",localStorage.notes)}
			if(debug){console.log("JSON.stringify(data)",JSON.stringify(data))}
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
				dateSubmitted: Date.now()
            });
			console.log("model",model)
			console.log("model.content",model.content)
            view.render();
        },

        getNotes: function() {
			if(debug){console.log("model.getAllNotes()",model.getAllNotes().reverse)}
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
			if(debug){console.log("when is this run?","A-on visiting the page?")}
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
				console.log("e",e)
				octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
				
				console.log("newNoteContent.val()",newNoteContent.val())
				
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content + '<span class="note-date">' + new Date(note.dateSubmitted) + '</span>' + 
                    '</li>';
            });
			if(debug){console.log("htmlStr",htmlStr)}
            this.noteList.html( htmlStr );
        }
    };

    octopus.init(); // this starts it all 
	
	// then it inits    
	// model.init();
    // view.init();
	
	
	

	
	var test1={
		init: function(){
			
			console.log("test1.init() has been called.... ");
		}
	};
	
	//test1.init();
});