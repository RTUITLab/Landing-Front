window.addEventListener('scroll', scrollFunction, {passive: true});
const children = Array.from(document.getElementById('pageContentParent').children);
const headersChildren = Array.from(document.getElementById('headerElements').children);
let lastActive = 0;
const obj = document.getElementById('header');
const headerTitle = document.getElementById("sectionHeaderTitle")

const pages = {
	projects: "Проекты",
	achievements: "Достижения",
	equipment: "Оборудование",
	staff: "Сотрудники",
	contacts: "Контакты"
}

function setScrollStatus(obj) {
	if (window.scrollY > 50) {
		obj.setAttribute('scroll', 'true');
	} else {
		obj.setAttribute('scroll', 'false');
	}
}

function findActiveTab(activeTab) {
	for (let i = 0; i < children.length; i++) {
		if (window.scrollY + (window.innerHeight / 2) * 1 >= children[i].offsetTop) {
			activeTab = i;
		}
	}
	return activeTab - 1;
}

function scrollFunction() {

	setScrollStatus(obj);
	let activeTab = lastActive;
	activeTab = findActiveTab(activeTab);
	if (activeTab !== lastActive) {
		if (activeTab < 0) setText("")
		else setText(pages[children[activeTab + 1].id])
	}

	if (activeTab !== lastActive) {
		setTab(activeTab);
		if (activeTab >= 0) window.history.pushState(null, null, "#" + children[activeTab + 1].id)
		else window.history.pushState(null, null, "#")
	}
}

function setTab(activeTab) {
	if (lastActive >= 0) headersChildren[lastActive].setAttribute('active', 'false');
	if (activeTab >= 0) headersChildren[activeTab].setAttribute('active', 'true');
	lastActive = activeTab;
}

new Promise((_) => {
	const newText=pages[window.location.hash.replace("#", "")]
	if(newText) headerTitle.innerText = newText;

	setScrollStatus(obj);
	setTab(findActiveTab(lastActive));
	_();
});

function setText(text){
	headerTitle.classList.add("hideElement")
	setTimeout(() => {
		headerTitle.innerText = text;
		headerTitle.classList.remove("hideElement")
	},150)
}