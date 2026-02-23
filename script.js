let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

const total = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const availableJobsCount = document.getElementById('availableJobsCount');
const emptyState = document.getElementById('empty-state');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const filterSection = document.getElementById('filtered-section');
const mainContainer = document.querySelector('main');

// Bottom padding
mainContainer.classList.add('pb-24');

function calculateCount() {
    const totalCards = allCardSection.children.length;

    total.innerText = totalCards;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    // tab wise count
    let countText = `${totalCards} jobs`;
    if (currentStatus === 'interview-filter-btn') {
        countText = `${interviewList.length} out of ${totalCards} jobs`;
    } else if (currentStatus === 'rejected-filter-btn') {
        countText = `${rejectedList.length} out of ${totalCards} jobs`;
    }
    availableJobsCount.innerText = countText;

    updateView();
}

function updateView() {
    allCardSection.classList.add('hidden');
    filterSection.classList.add('hidden');
    emptyState.classList.add('hidden');

    if (currentStatus === 'all-filter-btn') {
        if (allCardSection.children.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            allCardSection.classList.remove('hidden');
        }
    }
    else if (currentStatus === 'interview-filter-btn') {
        if (interviewList.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            filterSection.classList.remove('hidden');
            renderInterview();
        }
    }
    else if (currentStatus === 'rejected-filter-btn') {
        if (rejectedList.length === 0) {
            emptyState.classList.remove('hidden');
        } else {
            filterSection.classList.remove('hidden');
            renderRejected();
        }
    }
}

// Toggle filter buttons
function toggleStyle(id) {
    allFilterBtn.classList.add('bg-white', 'text-[#64748b]');
    allFilterBtn.classList.remove('bg-[#3b82f6]', 'text-white');

    interviewFilterBtn.classList.add('bg-white', 'text-[#64748b]');
    interviewFilterBtn.classList.remove('bg-[#3b82f6]', 'text-white');

    rejectedFilterBtn.classList.add('bg-white', 'text-[#64748b]');
    rejectedFilterBtn.classList.remove('bg-[#3b82f6]', 'text-white');

    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove('bg-white', 'text-[#64748b]');
    selected.classList.add('bg-[#3b82f6]', 'text-white');

    if (id === 'interview-filter-btn') {
        renderInterview();
    } else if (id === 'rejected-filter-btn') {
        renderRejected();
    }

    calculateCount();
}

// Event delegation
mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobName = parenNode.querySelector('.jobName').innerText;
        const jobPosition = parenNode.querySelector('.jobPosition').innerText;
        const details = parenNode.querySelector('.space-y-6 > div:nth-child(2) p').innerText;
        const notes = parenNode.querySelector('.notes').innerText;

        parenNode.querySelector('.status').innerText = 'Interview';
        parenNode.querySelector('.status').className = 'status rounded px-3 py-2 w-[113px] bg-emerald-100 text-emerald-700 font-medium';

        const cardInfo = { jobName, jobPosition, details, status: 'Interview', notes };

        if (!interviewList.find(item => item.jobName === cardInfo.jobName)) {
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.jobName !== cardInfo.jobName);

        if (currentStatus === 'rejected-filter-btn') renderRejected();
        calculateCount();

    } else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobName = parenNode.querySelector('.jobName').innerText;
        const jobPosition = parenNode.querySelector('.jobPosition').innerText;
        const details = parenNode.querySelector('.space-y-6 > div:nth-child(2) p').innerText;
        const notes = parenNode.querySelector('.notes').innerText;

        parenNode.querySelector('.status').innerText = 'Rejected';
        parenNode.querySelector('.status').className = 'status rounded px-3 py-2 w-[113px] bg-red-100 text-red-700 font-medium';

        const cardInfo = { jobName, jobPosition, details, status: 'Rejected', notes };

        if (!rejectedList.find(item => item.jobName === cardInfo.jobName)) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.jobName !== cardInfo.jobName);

        if (currentStatus === 'interview-filter-btn') renderInterview();
        calculateCount();

    } else if (event.target.closest('.btn-delete')) {
        const card = event.target.closest('.card');
        const jobName = card.querySelector('.jobName').innerText;

        interviewList = interviewList.filter(item => item.jobName !== jobName);
        rejectedList = rejectedList.filter(item => item.jobName !== jobName);

        const allCardToDelete = Array.from(allCardSection.children).find(c =>
            c.querySelector('.jobName') && c.querySelector('.jobName').innerText === jobName
        );
        if (allCardToDelete) allCardToDelete.remove();

        card.remove();

        if (currentStatus === 'interview-filter-btn') renderInterview();
        else if (currentStatus === 'rejected-filter-btn') renderRejected();

        calculateCount();
    }
});

// Render functions
function renderInterview() {
    filterSection.innerHTML = '';
    for (let job of interviewList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between bg-white border border-[#d1d5db] rounded-lg p-8';
        div.innerHTML = `
            <div class="space-y-6">
                <div>
                    <p class="jobName text-[18px] font-bold">${job.jobName}</p>
                    <p class="jobPosition text-[#64748b]">${job.jobPosition}</p>
                </div>
                <div><p class="text-[#64748b]">${job.details}</p></div>
                <button class="status rounded px-3 py-2 w-[113px] bg-emerald-100 text-emerald-700 font-medium">Interview</button>
                <p class="notes">${job.notes}</p>
                <div class="flex gap-5">
                    <button class="interview-btn rounded px-3 py-2 w-[100px] border border-emerald-500 text-emerald-500 font-semibold">Interview</button>
                    <button class="rejected-btn rounded px-3 py-2 w-[100px] border border-red-500 text-red-500 font-semibold">Rejected</button>
                </div>
            </div>
            <div>
                <button class="btn-delete border border-[#f1f2f4] rounded-full p-4 shadow-sm">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        filterSection.appendChild(div);
    }
}

function renderRejected() {
    filterSection.innerHTML = '';
    for (let job of rejectedList) {
        let div = document.createElement('div');
        div.className = 'card flex justify-between bg-white border border-[#d1d5db] rounded-lg p-8';
        div.innerHTML = `
            <div class="space-y-6">
                <div>
                    <p class="jobName text-[18px] font-bold">${job.jobName}</p>
                    <p class="jobPosition text-[#64748b]">${job.jobPosition}</p>
                </div>
                <div><p class="text-[#64748b]">${job.details}</p></div>
                <button class="status rounded px-3 py-2 w-[113px] bg-red-100 text-red-700 font-medium">Rejected</button>
                <p class="notes">${job.notes}</p>
                <div class="flex gap-5">
                    <button class="interview-btn rounded px-3 py-2 w-[100px] border border-emerald-500 text-emerald-500 font-semibold">Interview</button>
                    <button class="rejected-btn rounded px-3 py-2 w-[100px] border border-red-500 text-red-500 font-semibold">Rejected</button>
                </div>
            </div>
            <div>
                <button class="btn-delete border border-[#f1f2f4] rounded-full p-4 shadow-sm">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        filterSection.appendChild(div);
    }
}

// Initial count
calculateCount();