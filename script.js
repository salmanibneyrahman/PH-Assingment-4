let interviewList = [];
let rejectedList = [];
let currentStatus = 'all';

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
const mainElement = document.querySelector('main');   // for bottom padding

function calculateCount() {
    const totalCards = allCardSection.children.length;
    
    total.innerText = totalCards;
    availableJobsCount.innerText = `${totalCards} jobs`;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    updateView();   // ← decides what to show (cards or empty state)
}

function updateView() {
    // Hide everything first
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

// Add bottom padding to the whole page (so content never sticks to the bottom)
mainElement.classList.add('pb-24');

// ==================== TOGGLE FILTER BUTTONS ====================
function toggleStyle(id) {
    // reset all buttons
    allFilterBtn.classList.add('bg-white', 'text-[#64748b]');
    allFilterBtn.classList.remove('bg-[#3b82f6]', 'text-white');

    interviewFilterBtn.classList.add('bg-white', 'text-[#64748b]');
    interviewFilterBtn.classList.remove('bg-[#3b82f6]', 'text-white');

    rejectedFilterBtn.classList.add('bg-white', 'text-[#64748b]');
    rejectedFilterBtn.classList.remove('bg-[#3b82f6]', 'text-white');

    const selected = document.getElementById(id);
    currentStatus = id;

    // activate selected button
    selected.classList.remove('bg-white', 'text-[#64748b]');
    selected.classList.add('bg-[#3b82f6]', 'text-white');

    // show/hide sections
    if (id === 'interview-filter-btn') {
        renderInterview();
    } else if (id === 'rejected-filter-btn') {
        renderRejected();
    }

    calculateCount();   // this will call updateView()
}

// ==================== EVENT DELEGATION ====================
mainContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('interview-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobName = parenNode.querySelector('.jobName').innerText;
        const jobPosition = parenNode.querySelector('.jobPosition').innerText;
        const details = parenNode.querySelector('.space-y-6 > div:nth-child(2) p').innerText;
        const notes = parenNode.querySelector('.notes').innerText;

        parenNode.querySelector('.status').innerText = 'Interview';
        parenNode.querySelector('.status').className = 'status rounded px-3 py-2 w-[113px] bg-emerald-100 text-emerald-700 font-medium';

        const cardInfo = {
            jobName,
            jobPosition,
            details,
            status: 'Interview',
            notes
        };

        const jobExist = interviewList.find(item => item.jobName === cardInfo.jobName);
        if (!jobExist) {
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.jobName !== cardInfo.jobName);

        if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }
        calculateCount();

    } else if (event.target.classList.contains('rejected-btn')) {
        const parenNode = event.target.parentNode.parentNode;

        const jobName = parenNode.querySelector('.jobName').innerText;
        const jobPosition = parenNode.querySelector('.jobPosition').innerText;
        const details = parenNode.querySelector('.space-y-6 > div:nth-child(2) p').innerText;
        const notes = parenNode.querySelector('.notes').innerText;

        parenNode.querySelector('.status').innerText = 'Rejected';
        parenNode.querySelector('.status').className = 'status rounded px-3 py-2 w-[113px] bg-red-100 text-red-700 font-medium';

        const cardInfo = {
            jobName,
            jobPosition,
            details,
            status: 'Rejected',
            notes
        };

        const jobExist = rejectedList.find(item => item.jobName === cardInfo.jobName);
        if (!jobExist) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.jobName !== cardInfo.jobName);

        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        }
        calculateCount();

    } else if (event.target.closest('.btn-delete')) {
        const card = event.target.closest('.card');
        const jobName = card.querySelector('.jobName').innerText;

        // Remove from both lists
        interviewList = interviewList.filter(item => item.jobName !== jobName);
        rejectedList = rejectedList.filter(item => item.jobName !== jobName);

        // Remove original card from All view
        const allCardToDelete = Array.from(allCardSection.children).find(c =>
            c.querySelector('.jobName') && c.querySelector('.jobName').innerText === jobName
        );
        if (allCardToDelete) allCardToDelete.remove();

        // Remove the clicked card
        card.remove();

        // Re-render if we are in filtered view
        if (currentStatus === 'interview-filter-btn') {
            renderInterview();
        } else if (currentStatus === 'rejected-filter-btn') {
            renderRejected();
        }

        calculateCount();
    }
});

// ==================== RENDER FUNCTIONS ====================
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

                <div>
                    <p class="text-[#64748b]">${job.details}</p>
                </div>

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

                <div>
                    <p class="text-[#64748b]">${job.details}</p>
                </div>

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

// Initial call
calculateCount();