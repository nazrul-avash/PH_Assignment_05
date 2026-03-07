

const getBorderColor = (status) =>{
    if (status === "open"){
        return "border-green-400";
    }
    else if (status === "closed"){
            return "border-purple-400";
    }
};
const getPriorityColor = (priority) =>{
    if (priority === "high"){
        return "red";
    }
    else if (priority === "medium"){
            return "yellow";
    }
    else if(priority === "low"){
        return "gray";
    }
    
};
const getStatusImage = (status) =>{
    if (status === "open"){
        return "Open-Status.png";
    }
    else if (status === "closed"){
            return "Closed- Status .png";
    }
};
const addLabel = (element,allLabels) => {
    element.innerHTML = "";
    for(const label of allLabels){
        const labelBox = document.createElement("h2");
        if (label === "bug"){
             labelBox.innerHTML =`<h2 class="bg-red-300 flex items-center gap-1 rounded-full px-3 py-1 text-[12px] text-red-500/80"><i class="fa-solid fa-bug"></i> ${label}</h2>`
        }
        else  if (label === "help wanted"){
             labelBox.innerHTML =`<h2 class="bg-yellow-300/40 flex items-center gap-1 rounded-full px-3 py-1 text-[12px] text-yellow-500"><i class="fa-solid fa-handshake-angle"></i></i> ${label}</h2>`
        }
        else  if (label === "enhancement"){
             labelBox.innerHTML =`<h2 class="bg-green-300/40 flex items-center gap-1 rounded-full px-1 py-1 text-[12px] text-green-500"><i class="fa-solid fa-handshake-angle"></i></i> ${label}</h2>`
        }
        else {
             labelBox.innerHTML =`<h2 class="bg-purple-300/40 flex items-center gap-1 rounded-full px-1 py-1 text-[12px] text-purple-500"><i class="fa-solid fa-handshake-angle"></i></i> ${label}</h2>`
        }
        element.append(labelBox);
       

    }

};
const manageSpinner = (status) => {
    if (status === true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("card-container").classList.add("hidden");
    } else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("card-container").classList.remove("hidden");
    }
}; 
const updateIssueCount = (count) =>{
    const countElement = document.getElementById("issue-count");
    countElement.innerText = count;
};
const renderDetails = (issue) => {
    const detailContainer = document.getElementById("detail-container");
    detailContainer.innerHTML = `  <h1 class="font-bold text-2xl">${issue.title}</h1>
        <div class="flex gap-10 items-center justify-start">
            <button class="btn btn-sm bg-green-400 rounded-full p-2">${issue.status}</button>
            <ul class="flex gap-15 list-disc items-center justify-evenly ">
                <li class="text-[12px] text-[#64748B]">Opened by ${issue.author}</li>
                <li class="text-[12px] text-[#64748B]">${issue.createdAt}</li>
            </ul>
        </div>
        <div id="detailLabels-${issue.id}" class="flex  items-center gap-4">
                
            </div>
            <h1 class="text-[12px] text-[#64748B]">The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.</h1>
            <div class="flex justify-start gap-20 bg-gray-200 px-3 py-2 rounded-2xl">
                <div>
                    <h1 class="text-[12px] text-[#64748B]">Assignee:</h1>
                    <h1>${issue.author}</h1>
                </div>
                <div>
                    <h1 class="text-[12px] text-[#64748B]">Priority:</h1>
                    <button class="btn btn-sm bg-${getPriorityColor(issue.priority)}-400 rounded-full">${issue.priority}</button>
                </div>
            </div>`;
            const label = document.getElementById(`detailLabels-${issue.id}`);
            addLabel(label,issue.labels);
    
    document.getElementById("detail_modal").showModal();
    
};
const loadDetails = async (id) =>{
    const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await response.json();
    renderDetails(data.data);


};

const renderCards = (issues) =>{
    updateIssueCount(issues.length);
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    for(let issue of issues){
        const card = document.createElement("div");
        card.innerHTML =`<div onClick="loadDetails(${issue.id})" id="status-card" class="bg-white rounded-lg shadow-md p-4 border-t-4 ${getBorderColor(issue.status)} space-y-2">
                    <div class="flex gap-3 justify-between items-center">
                        <img src="./assets/${getStatusImage(issue.status)}">
                        <p class="bg-${getPriorityColor(issue.priority)}-500/40 rounded-2xl px-2 text-[12px]">${issue.priority}</p>
                    </div>
                    <h1 class="font-semibold text-[14px]">${issue.title}</h1>
                    <p class="text-[12px] text-[#64748B]">${issue.description}</p>
                    <div id="labels-${issue.id}" class="flex gap-2 items-center justify-start">
                        
                    </div>
                    <hr class="-mx-4 border-gray-300 my-4">
                
                    <p class="text-[12px] text-[#64748B]">#1 by ${issue.author}</p>
                    <h2 class="text-[12px] text-[#64748B]">${issue.createdAt}</h2>
                </div>`;
                cardContainer.append(card);
                const label = document.getElementById(`labels-${issue.id}`);
                addLabel(label,issue.labels);

    }
    manageSpinner(false);
};
const searchBox = document.getElementById("search-issue");
searchBox.addEventListener("keydown", async (e) =>{
    console.log("event fired");
    if(e.key ==="Enter"){
        const key = searchBox.value;
        const response = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${key}`);
        const data = await response.json();
        console.log(data.data);
        const filteredArray = data.data.filter((el) => el.title.includes(key));
        console.log(filteredArray);
        renderCards(filteredArray);
    }
});
const buttonSelection = (btnName) =>{
    document.querySelectorAll("#categoryBtn .btn").forEach((btn) => btn.classList.remove("btn-primary"));
    if (btnName === "open"){
        document.getElementById("btn-open").classList.add("btn-primary");
    }
    else if (btnName === "closed"){
        document.getElementById("btn-closed").classList.add("btn-primary");
    }
    else {
        document.getElementById("btn-all").classList.add("btn-primary");
    }
};
const loadCards = async (btnName) =>{
    buttonSelection(btnName);
    manageSpinner(true);
    const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await response.json();
    if(btnName !== "btn-all"){
        const filteredArray = data.data.filter((el) => el.status === btnName);
        renderCards(filteredArray);
    }
    else renderCards(data.data);
    
};
let statusBtnSelected = "btn-all";
loadCards(statusBtnSelected);
document.getElementById("btn-signin").addEventListener("click",function(){
    const  username= document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if(username === 'admin' && password==="admin123"){
        alert("login successful");
        window.location.replace("./home.html");
    }
    else{
        alert("login failed");
        return;

    }
});

