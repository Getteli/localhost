function ready() {
	access();
}

function open(folder, e) {
	access(folder, e);
}

function removeElementsByClass(className){
	var elements = document.getElementsByClassName(className);
	while(elements.length > 0){
		elements[0].parentNode.removeChild(elements[0]);
	}
}

function access(subFolder = null, e = null) {
	var data = new FormData();
	data.append('subFolder', subFolder);

	var request = new Request("public/scripts/open.php", {
		method: "POST",
		body: data
	});

	fetch(request)
	.then(function(response) {
		response.json()
		.then(function(result) {
			let list = document.getElementById("list");
			let parent, nameparent;
			
			if (subFolder) {
				var subdiv = document.createElement('div');
				subdiv.classList = "list-subgroup";
			}
			if (e != null) {
				parent = e.parentNode;
				nameparent = e.getAttribute("data-name");
				removeElementsByClass("list-subgroup");
			}

			result.forEach(element => {
				var div = document.createElement('div');
				if (!subFolder) {
					div.classList = "parent";
				}
				let a = document.createElement('a');
				if (subFolder) {
					a.setAttribute("href", "projects/"+nameparent+"/"+element);
					a.setAttribute("target", "_blank");
				}else{
					a.setAttribute("href", "#");
				}
				a.classList = "list-group-item list-group-item-action itens";
				a.setAttribute("data-name", element);
				a.append(element);
				div.appendChild(a);
				if (subFolder) {
					subdiv.appendChild(div);
					// alert("add na sub");
					parent.appendChild(subdiv);
				}
				else{
					list.appendChild(div);
				}
			});
		})
	  })
	.catch(function(err) {
		console.error(err);
	});	
}

document.body.addEventListener('click', function (e) {
	if (e.target.className == 'list-group-item list-group-item-action itens') {
		let itens = document.querySelectorAll("#list a");
		document.addEventListener("click", function(e) {
			for (let x = 0; x < itens.length; x++) {
				itens[x].classList.remove("active")
			}
			e.target.closest("a").classList.add("active")
		})
		let folder = e.target.getAttribute("data-name");
		open(folder, e.target);
    }
}, false);

ready();