class MutationBuilder {
    constructor(maxMutationsPerGen = 4) {
        this.generations = [
            { id: 1, mutations: [] },
            { id: 2, mutations: [] },
            { id: 3, mutations: [] },
            { id: 4, mutations: [] },
            { id: 5, mutations: [] } // inherited
        ];
        // this.currentGenerationIndex = 0;
        this.maxMutationsPerGeneration = maxMutationsPerGen;
        this.maxGenerations = 4;
    }



    canPlaceInSlot(mutationId, slotIndex) {
        const mutation = MUTATIONS[mutationId];
        // slot 2–4 only (index 1 or 3)
        if (mutation.criteria === "slot 2–4") {
            return [1, 3].includes(slotIndex);
        }
        return true;
    }

    canAddToGeneration(mutationId, genIndex) {
        const gen = this.generations[genIndex];
        const hasEmptySlot = gen.mutations.some(slot => slot == null);

        if (!hasEmptySlot && gen.mutations.length >= this.maxMutationsPerGeneration) {
            if (genIndex >= this.generations.length - 1) {
                return false; // no next generation
            }
            console.log("Current generation full, moving to next generation");
            return this.canAddToGeneration(mutationId, this.currentGenerationIndex);
        }
        return true; // there is an empty slot
       
    }

    addMutationAuto(mutationId) {
        const mutation = MUTATIONS[mutationId];

        for (let gen of this.generations) {
            // find first empty slot in this generation
            let emptyIndex = gen.mutations.findIndex(slot => slot == null);
            if (emptyIndex === -1 && gen.mutations.length < this.maxMutationsPerGeneration) {
                emptyIndex = gen.mutations.length;
            }
            if (emptyIndex === -1) continue;
            if(!this.canPlaceInSlot(mutationId, emptyIndex)) {
                console.log("Cannot place mutation in this slot");
                break;
            }
            gen.mutations[emptyIndex] = mutationId;
            return true;
        }
        return false;
    }

    removeMutationId(mutationid) {
        for (let gen of this.generations) {
            if(gen.mutations.includes(mutationid)) {
                gen.mutations = gen.mutations.map(id => id === mutationid ? null : id);
            }
        }
    }

    addMutationToGeneration(mutationId, genIndex) {
        const gen = this.generations[genIndex];
        console.log("gen at start", gen);
        let emptyIndex = gen.mutations.findIndex(slot => slot == null);

        if (emptyIndex === -1 && gen.mutations.length < this.maxMutationsPerGeneration) {
            emptyIndex = gen.mutations.length;
        }
        if (emptyIndex === -1) return false;
        if (!this.canPlaceInSlot(mutationId, emptyIndex)) return false;

        console.log("Gen: ", gen);
        gen.mutations[emptyIndex] = mutationId;
        return true;
    }
    removeFromGeneration(generation, slotIndex) {
        this.generations[generation - 1].mutations[slotIndex] = null;
    }
    clearSelections() {
        this.generations.forEach(gen => gen.mutations = []);
    }

    getSaveData() {
        const saveData = {};

        this.generations.forEach((gen, index) => {
            const mutations = gen.mutations.map(id =>
                id == null ? -1 : id
            );

            saveData[`g${index + 1}`] = mutations;

        });

        return saveData;
    }
    getRemovedData() {
        return Array.from(AppState.selectedRemovedMutations);
    }

    loadFromSaveData(saveData) {
        Object.entries(saveData).forEach(([key, mutations]) => {

            const genIndex = parseInt(key.substring(1)) - 1;

            this.generations[genIndex].mutations =
                mutations.slice(0, this.maxMutationsPerGeneration);

        });
    }

    loadRemovedSelectionsData(removedData) {
        AppState.selectedRemovedMutations = new Set(removedData);
    }

}


const AppState = {

    selectedGeneration: null,
    selectedDietType: null,
    selectedRemovedMutations: new Set(),

    generations: {
        1: {
            element: document.getElementById("generation-1"),
            mutations: []
        },
        2: {
            element: document.getElementById("generation-2"),
            mutations: []
        },
        3: {
            element: document.getElementById("generation-3"),
            mutations: []
        },
        4: {
            element: document.getElementById("generation-4"),
            mutations: []
        },
        5: {
            element: document.getElementById("inherited"),
            mutations: []
        }
    }

};
const builder = new MutationBuilder();

document.addEventListener("DOMContentLoaded", () => {
    
    const uselessMutations = [26,20,17,12,2,1,15,16,23];
    builder.loadRemovedSelectionsData(uselessMutations);

    populateMutations();
    addOnClicks();
    toggleDietTypeButtonOnClick();
    saveMutationSelectionsOnClick();
    saveRemovedMutationSelectionsOnClick();
    loadMutationSelectionssOnClick();
    loadRemovedMutationSelectionsOnClick();
    clearSelectedMutationsOnClick();
    
});




function addOnClicks() {


    document.querySelectorAll(".selected-mutation").forEach(slotDiv => {
        slotDiv.addEventListener("click", function () {
            const slotIndex = Number(this.dataset.mutationSlotIndex);
            const generationId = Number(this.closest(".selected-mutation-generation-row").dataset.generationId);
            builder.removeFromGeneration(generationId, slotIndex);
            slotDiv.dataset.mutationId = "";
            updateSelectedMutations();
        });
    });


    document.querySelectorAll(".selected-mutation").forEach(slotDiv => {
        const infoBox = document.createElement("div");
        infoBox.className = "mutation-info-box";
        infoBox.style.position = "absolute";
        infoBox.style.padding = "8px";
        infoBox.style.background = "rgba(255,255,255,0.9)";
        infoBox.style.color = "#000";
        infoBox.style.borderRadius = "6px";
        infoBox.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
        infoBox.style.pointerEvents = "none"; // allows hovering over other elements
        infoBox.style.display = "none";
        document.body.appendChild(infoBox);

        slotDiv.addEventListener("mouseenter", e => {
            const mutationId = parseInt(slotDiv.dataset.mutationId);
            if (!mutationId) return;

            const mutation = MUTATIONS[mutationId];
            infoBox.innerHTML = `
                <strong>${mutation.name}</strong><br>
                ${mutation.description || ""}<br>
                Value: ${mutation.value || "N/A"}<br>
                ${mutation.additionalInfo ? `<em>${mutation.additionalInfo}</em>` : ""}
            `;
            infoBox.style.display = "block";
            infoBox.style.left = e.pageX + 10 + "px";
            infoBox.style.top = e.pageY + 10 + "px";
        });

        slotDiv.addEventListener("mousemove", e => {
            infoBox.style.left = e.pageX + 10 + "px";
            infoBox.style.top = e.pageY + 10 + "px";
        });

        slotDiv.addEventListener("mouseleave", () => {
            infoBox.style.display = "none";
        });
    });

    document.querySelectorAll(".selected-mutation-generation").forEach(selectedContainer => {
        selectedContainer.addEventListener("click", function () {
            if(selectedContainer.classList.contains("selected")) {
                clearSelectedGeneration();
                AppState.selectedGeneration = null;
            }
            else {
                clearSelectedGeneration();
                selectedContainer.classList.add("selected");
                AppState.selectedGeneration = Number(this.dataset.generationId);
            }
        });
    });
}

function addOnClickForMutationSelecton() {
    document.querySelectorAll(".mutation-item-selectable").forEach(item => {
        item.addEventListener("click", function () {
            if(item.classList.contains("selected")) {
                builder.removeMutationId(Number(this.dataset.id));
                item.classList.remove("selected");
                updateSelectedMutations();
                return;
            }
            const mutationId = Number(this.dataset.id);

            if(AppState.selectedGeneration !== null) {
                if(!builder.addMutationToGeneration(mutationId, AppState.selectedGeneration - 1)) {
                    console.log("Failed to add mutation to generation");
                    return;
                }
            }
            else {
                if (!builder.addMutationAuto(mutationId)) return;
            }
            console.log("builder mutations", builder.generations);
            updateSelectedMutations();
        });

    });
}

function clearSelectedGeneration() {
    document.querySelectorAll(".selected-mutation-generation").forEach(selectedContainer => { 
        selectedContainer.classList.remove("selected");
    });
}

function updateSelectedMutations() {
    builder.generations.forEach((generation) => {
        const generationElement = AppState.generations[generation.id].element;
        if (!generationElement) return;

        // Loop through all slots
        for (let mutationIndex = 0; mutationIndex < builder.maxMutationsPerGeneration; mutationIndex++) {
            const slotDiv = generationElement.querySelector(
                `.selected-mutation[data-mutation-slot-index="${mutationIndex}"]`
            );
            if (!slotDiv) continue;

            const nameText = slotDiv.querySelector(".selected-mutation-name");

            const mutationId = generation.mutations[mutationIndex];
            if (mutationId != null) {
                const mutation = MUTATIONS[mutationId];
                nameText.textContent = mutation.name;
                slotDiv.dataset.mutationId = mutationId ?? "";
            } else {
                nameText.textContent = ""; // empty slot
            }
        }
    });

    updateSelectableHighlights();
}

function updateSelectableHighlights() {
    const selectedIds = new Set();
    builder.generations.forEach(gen => {
        gen.mutations.forEach(id => {
            if (id != null) selectedIds.add(id);
        });
    });

    // iterate over all selectable items and toggle class
    document.querySelectorAll(".mutation-item-selectable").forEach(item => {
        const id = parseInt(item.dataset.id);
        if (selectedIds.has(id)) {
            item.classList.add("selected");
        } else {
            item.classList.remove("selected");
        }
    });
}





// function updateSelectedMutations() {
//     builderState.generations.forEach((generation, generationIndex) => {

//         console.log("Generation:", generation.id);
//         const generationElement = AppState.generations[generation.id].element;
//         generation.mutations.forEach((mutationId, mutationIndex) => {

//             const mutation = MUTATIONS[mutationId];

//             console.log("  Mutation Index:", mutationIndex);
//             console.log("  Mutation ID:", mutationId);
//             console.log("  Mutation Name:", mutation.name);

//             console.log("AppState", AppState);
//             console.log("Generation Element:", generationElement);
//             // example: render mutation into generation element
//             const slotDiv = generationElement.querySelector(
//                 `.selected-mutation[data-mutation-slot-index="${mutationIndex}"]`
//             );
//             if (!slotDiv) return;
//             const nameText = slotDiv.querySelector(".selected-mutation-name");
//             nameText.textContent = mutation.name;


//         });

//     });
// }

function clearMutationContainers(){

}

function clearSelectedMutationsOnClick() {
    const clearButton = document.getElementById("clear-selections-button");
    clearButton.addEventListener("click", function() {
        builder.clearSelections();
        updateSelectedMutations();
    });
}

function saveMutationSelectionsOnClick() {
    const saveButton = document.getElementById("save-selections-button");
    const outputElement = document.getElementById("save-selections-output");

    saveButton.addEventListener("click", function() {
        const saveDataObject = builder.getSaveData();
        const saveDataJSON = JSON.stringify(saveDataObject);
        outputElement.textContent = saveDataJSON;

        console.log("Saved compact data:", saveDataObject);

    });
}

function saveRemovedMutationSelectionsOnClick() {
    const saveButton = document.getElementById("save-removed-selections-button");
    const outputElement = document.getElementById("save-removed-selections-output");

    saveButton.addEventListener("click", function() {
        const removedDataObject = builder.getRemovedData();
        const saveDataJSON = JSON.stringify(removedDataObject);
        outputElement.textContent = saveDataJSON;

    });
}

function loadMutationSelectionssOnClick() {
    const loadButton = document.getElementById("load-selections-button");
    const inputElement = document.getElementById("load-selections-input");

        loadButton.addEventListener("click", function () {

        const raw = inputElement.value.trim();

        if (!raw) {
            console.warn("No input provided");
            return;
        }

        let parsed;
        try {
            parsed = JSON.parse(raw);
        }
        catch (e) {
            console.error("Invalid JSON");
            return;
        }

        if (typeof parsed !== "object" || parsed === null) {
            console.error("Invalid save format");
            return;
        }

        const sanitized = sanitizeSaveData(parsed);
        builder.loadFromSaveData(sanitized);
        updateSelectedMutations();


    });
}
function loadRemovedMutationSelectionsOnClick() {
    const loadButton = document.getElementById("load-removed-selections-button");
    const inputElement = document.getElementById("load-removed-selections-input");

        loadButton.addEventListener("click", function () {
        const raw = inputElement.value.trim();
        if (!raw) {
            console.warn("No input provided");
            return;
        }

        let parsed;
        try {
            parsed = JSON.parse(raw);
        }
        catch (e) {
            console.error("Invalid JSON");
            return;
        }
        console.log(typeof parsed, parsed);
        if (typeof parsed !== "object" || parsed === null) {
            console.error("Invalid save format");
            return;
        }

        const sanitized = sanitizeLoadData(parsed);
        builder.loadRemovedSelectionsData(sanitized);
        populateMutations();


    });
}

function sanitizeLoadData(rawData) {
    if (!Array.isArray(rawData)) {
        return [];
    }
    const cleaned = [];
    rawData.forEach(id => {
        const num = Number(id);
        if(num != -1 && Number.isInteger(num)){
            cleaned.push(num);
        }
        
    });
    return cleaned;
}


function sanitizeSaveData(rawData) { 
    const sanitized = {};
    for (const key in rawData) {

        if (!/^g\d+$/.test(key)) {
            console.warn("Invalid generation key:", key);
            continue;
        }
        const genIndex = parseInt(key.substring(1)) - 1;
        if (genIndex < 0 || genIndex >= builder.generations.length) {
            console.warn("Generation out of range:", key);
            continue;
        }
        const mutations = rawData[key];

        if (!Array.isArray(mutations)) {
            console.warn("Invalid mutations array:", key);
            continue;
        }
        sanitized[key] = mutations.map(id => {

            const num = Number(id);
            // allow -1 (empty)
            if (num === -1) return null;
            // must be valid mutation id
            if (!Number.isInteger(num) || !MUTATIONS[num]) {
                console.warn("Invalid mutation id:", id);
                return null;
            }

            return num;

        });

    }
    return sanitized;
}

function toggleDietTypeButtonOnClick() {
    document.querySelectorAll(".toggle-diet-type-button").forEach(button => { 
        button.addEventListener("click", function() { 
            if(button.classList.contains("selected")) {
                button.classList.remove("selected");
                AppState.selectedDietType = null;
            }
            else {
                document.querySelectorAll(".toggle-diet-type-button").forEach(btn => btn.classList.remove("selected"));
                const dietType = this.dataset.dietType;
                AppState.selectedDietType = dietType;
                button.classList.add("selected");
            }
            populateMutations();
            updateSelectableHighlights();
        });
        
    });
    
}


function populateMutations() {
    // Get the container where mutations will be displayed
    const regularContainer = document.getElementById("regular-mutations-container");
    const slot2or4Container = document.getElementById("slot2-4-mutations-container");
    const unlockableContainer = document.getElementById("unlockable-mutations-container");
    const removedMutationsContainer = document.getElementById("removed-mutations-container");

    regularContainer.innerHTML = "";
    slot2or4Container.innerHTML = "";
    unlockableContainer.innerHTML = "";
    removedMutationsContainer.innerHTML = "";


    // Loop through each mutation
    MUTATIONS.forEach((mutation, index) => {
        if(AppState.selectedDietType && mutation.dietType && !mutation.dietType.includes(AppState.selectedDietType)) {
            return; 
        }

        // Create the outer mutation-item div
        const mutationDiv = document.createElement("div");
        mutationDiv.className = "mutation-item mutation-item-selectable";
        mutationDiv.dataset.id = index;



        mutationDiv.style.position = "relative";

        const removeBtn = document.createElement("div");
        removeBtn.className = "mutation-remove-btn light-font-color";
        removeBtn.innerHTML = "&times;";
        removeBtn.dataset.id = index;
        mutationDiv.appendChild(removeBtn);

        removeBtn.addEventListener("click", function(e) { 
            e.stopPropagation();
            const mutationId = Number(this.dataset.id);
            if(mutationDiv.classList.contains("removed")) {
                mutationDiv.classList.remove("removed");
                AppState.selectedRemovedMutations.delete(mutationId);
            }
            else {
                mutationDiv.classList.add("removed");
                AppState.selectedRemovedMutations.add(mutationId);
            }
            populateMutations();
            updateSelectableHighlights();
        });

        // Create and append the name (h3)
        const nameH3 = document.createElement("h3");
        nameH3.className = "light-font-color mutation-name-margin-adjustment";
        nameH3.textContent = mutation.name;
        mutationDiv.appendChild(nameH3);

        // Create and append the description (p)
        const descP = document.createElement("p");
        descP.className = "light-font-color";
        descP.textContent = mutation.description;
        mutationDiv.appendChild(descP);

        // If value exists, create and append the value (p)
        if (mutation.value) {
            const valueP = document.createElement("p");
            valueP.className = "light-font-color";
            valueP.textContent = `Value: ${mutation.value}`;
            mutationDiv.appendChild(valueP);
        }

        // If criteria exists, show it
        if (mutation.criteria) {
            const critP = document.createElement("p");
            critP.className = "light-font-color";
            critP.textContent = `Criteria: ${mutation.criteria}`;
            mutationDiv.appendChild(critP);
        }

        // If additionalInfo exists, show it
        if (mutation.additionalInfo) {
            const infoP = document.createElement("p");
            infoP.className = "light-font-color";
            infoP.textContent = mutation.additionalInfo;
            mutationDiv.appendChild(infoP);
        }
        if (AppState.selectedRemovedMutations.has(index)) {
            mutationDiv.classList.add("removed");
            removedMutationsContainer.appendChild(mutationDiv);
        }
        else if (!mutation.criteria) {
            regularContainer.appendChild(mutationDiv);
        } else if (mutation.criteria === "slot 2–4") {
            slot2or4Container.appendChild(mutationDiv);
        } else if (mutation.criteria === "unlockable") {
            unlockableContainer.appendChild(mutationDiv);
        }


    });
    addOnClickForMutationSelecton();
}