/*
	We need to create:
		1. A right div to hold the names of repos.
		2. A top container to hold both te right div and the github-container div.
*/
// let main = document.getElementById("main")
let resultsContainer = document.getElementById("cont");
let rightDiv = document.getElementById("right");
let list = document.getElementById("github-form");
let repoList = document.getElementById("repo-list");

resultsContainer.appendChild(rightDiv);

function getUser() {
	list.addEventListener("submit", (e) => {
		e.preventDefault();
		let user = e.target.search.value;

		fetch(`https://api.github.com/search/users?q=${user}`)
			.then((response) => response.json())
			.then(render);

		fetch(`https://api.github.com/users/${user}/repos`)
			.then((repos) => repos.json())
			.then(renderRepos);
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
				- User's button. This button when clicked should display the
					user's repository on the right div.
		
		*/

		let user = document.createElement("li");
		let userName = document.createElement("h4");
		let userImage = document.createElement("img");
		let userButton = document.createElement("button");

		userName.textContent = element.login;
		userImage.src = element.avatar_url;
		userButton.textContent = `Click to view ${element.login}'s GitHub Repositories`;
		userButton.id = "bttn";

		// Append container to body then both divs inside container.
		resultsContainer.appendChild(rightDiv);

		// Append the main list to the left div then users to main list

		// Append all the user attributes inside of the created list called USER:
		user.appendChild(userName);
		user.appendChild(userImage);
		user.appendChild(userButton);

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

		userButton.style.display = "block";
		userButton.style.textAlign = "center";
		userButton.style.border = "1px solid black";
		userButton.style.borderRadius = "5px";
		userButton.style.padding = "10px";
		userButton.style.fontSize = "18px";
		userButton.style.textDecoration = "none";
	});
}

function renderRepos(data) {
	let button = document.getElementById("bttn");

	button.addEventListener("click", () => {
		data.map((element) => {
			let eachRepo = document.createElement("li");
			let repoLink = document.createElement("a");

			repoLink.href = element.html_url;
			repoLink.textContent = element.name;

			repoList.appendChild(eachRepo);
			eachRepo.appendChild(repoLink);
		});

		rightDiv.appendChild(repoList);
	});
}
