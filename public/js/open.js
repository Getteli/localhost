function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
		c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
		}
	}
	return "";
}

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
			var darkmode = document.body.classList.contains("dark-mode") ? "dark-mode" : "";
			var adarkmode = document.body.classList.contains("dark-mode") ? "dark-mode-a" : "";
			let list = document.getElementById("list");
			let parent;
			let nameparent = "";
			
			if (subFolder) {
				var subdiv = document.createElement('div');
				subdiv.classList = "list-subgroup list-group-item list-group-item-action itens " + darkmode;
			}
			if (e != null) {
				parent = e.parentNode;
				nameparent = e.getAttribute("data-name") + "/";
				removeElementsByClass("list-subgroup");
			}

			result.forEach(element => {
				var div = document.createElement('div');
				if (!subFolder) {
					div.classList = "parent list-group-item list-group-item-action itens " + darkmode;
				}
				else{
					div.classList = "list-group-item list-group-item-action itens " + darkmode;
				}

				let a = document.createElement('a');
				
				a.setAttribute("href", "projects/"+nameparent+element);
				a.classList = adarkmode;
				a.setAttribute("target", "_blank");
				a.append(element);
				div.appendChild(a);
				if (!subFolder) {
					var a2 = document.createElement('a');
					a2.classList = "arrow iten_a " + adarkmode;
					a2.setAttribute("href", "#");
					a2.append("▼");
					a2.setAttribute("data-name", element);
					div.appendChild(a2);
				}
				if (subFolder) {
					subdiv.appendChild(div);
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
	var darkmode = document.body.classList.contains("dark-mode") ? "dark-mode-a" : "";
	if (e.target.classList.contains("iten_a")) {
		let itens = document.querySelectorAll("#list a");

		if (!e.target.classList.contains("active")) {
			let folder = e.target.getAttribute("data-name");
			e.target.closest("a").classList.add("active");
			open(folder, e.target);
		}else{
			for (let x = 0; x < itens.length; x++) {
				itens[x].classList.remove("active")
			}
		}
    }

	if (e.target.tagName == 'A' || e.target.tagName == 'DIV') {
		removeElementsByClass("list-subgroup");
	}
}, false);


// #region DARK-MODE
	function darkmode() {
		var body_ = document.body;
		var text_ = document.getElementsByTagName('a');
		var slide_ = document.getElementById("dm");
		var divs_ = document.getElementsByClassName("itens");
		var slider_ = document.getElementById("slider");
		var icontop_ = document.getElementById("logoiliontop");
		var iconbottom_ = document.getElementById("logoilionbottom");
		var line_ = document.getElementById("linef");

		body_.classList.toggle("dark-mode");
		for (const key in text_) {
			var element = text_[key];
			if(element.classList){
				element.classList.toggle("dark-mode-a");
			}
			
		}
		for (const key in divs_) {
			var element = divs_[key];
			if(element.classList){
				element.classList.toggle("dark-mode");
			}
			
		}
		if (!body_.classList.contains('dark-mode')) {
			icontop_.src = "public/image/logoilion.png";
			iconbottom_.src = "public/image/logotipoilion.png";
			setCookie("darkmode", false, 999);
		}else{
			icontop_.src = "public/image/logoilion_negative.png";
			iconbottom_.src = "public/image/logotipoilion_negative.png";
			setCookie("darkmode", true, 999);
		}
		line_.classList.toggle("dark-mode");
		slide_.classList.toggle("dark-mode");
		slider_.classList.toggle("dark-mode");

	}

	document.getElementById("dm").addEventListener('change', function (e) {
		darkmode();
	}, false);

	if (getCookie("darkmode") == "true"){
		darkmode();
	}
// #endregion


ready();