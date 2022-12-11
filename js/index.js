function getUser() {
	let list = document.getElementById("github-form");
	list.addEventListener("submit", (e) => {
		e.preventDefault();
		let user = e.target.search.value;

		fetch(`https://api.github.com/search/users?q=${user}`)
			.then((response) => response.json())
			.then(render);
	});
}

getUser();

function render(data) {
	data.items.map((element) => {
		// Elements to target here:
		let ul = document.getElementById("user-list");

		// Elements to create here:

		/*
			We need a LIST in which there will be the:
				- User's Name
				- User's Image
				- User's Link
		
		*/

		let user = document.createElement("li");
		let userName = document.createElement("h4");
		let userImage = document.createElement("img");
		let userLink = document.createElement("a");

		userName.textContent = element.login;
		userImage.src = element.avatar_url;
		userLink.textContent = `Link to ${element.login}'s GitHub Repositories`;
		userLink.href = element.html_url;

		// Append all the user attributes inside of the created list called USER:
		user.appendChild(userName);
		user.appendChild(userImage);
		user.appendChild(userLink);

		// Append the created USER list inside the Unordered list.
		ul.appendChild(user);

		// OPTIONAL STYLING:
		userName.style.border = "none";
		userName.style.textAlign = "center";
		userName.style.borderRadius = "5px";
		userName.style.padding = "10px";
		userName.style.background = "#660066";
		userName.style.color = "#fff";

		userImage.style.border = "1px solid black";
		userImage.style.borderRadius = "5px";

		userLink.style.display = "block";
		userLink.style.textAlign = "center";
		userLink.style.border = "1px solid black";
		userLink.style.borderRadius = "5px";
		userLink.style.padding = "3px";
		userLink.style.fontSize = "18px";
		userLink.style.textDecoration = "none";
	});
}
