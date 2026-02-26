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

    addMutationToGeneration(mutationId, genIndex) {
        const gen = this.generations[genIndex];
        const emptyIndex = gen.mutations.findIndex(slot => slot == null);

        if (emptyIndex === -1 && gen.mutations.length >= this.maxMutationsPerGeneration) return false; 

        gen.mutations[emptyIndex] = mutationId;
        return true;
    }
    removeFromGeneration(generation, slotIndex) {
        this.generations[generation - 1].mutations[slotIndex] = null;
    }

}


const AppState = {

    selectedGeneration: null,

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
    

    populateMutations();
    addOnClicks();

    
});


function addOnClicks() {

    document.querySelectorAll(".mutation-item-selectable").forEach(item => {
        item.addEventListener("click", function () {
            if(item.classList.contains("selected")) {
                console.log("Mutation already selected");
                return;
            }

            const mutationId = Number(this.dataset.id);
            if (!builder.addMutationAuto(mutationId)) return;
            updateSelectedMutations();
        });

    });



    document.querySelectorAll(".selected-mutation").forEach(slotDiv => {
        slotDiv.addEventListener("click", function () {
            const slotIndex = Number(this.dataset.mutationSlotIndex);
            const generationId = Number(this.closest(".selected-mutation-generation").dataset.generationId);
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



function populateMutations() {
    // Get the container where mutations will be displayed
    const regularContainer = document.getElementById("regular-mutations-container");
    const slot2or4Container = document.getElementById("slot2-4-mutations-container");
    const unlockableContainer = document.getElementById("unlockable-mutations-container");


    // Loop through each mutation
    MUTATIONS.forEach((mutation, index) => {

        // Create the outer mutation-item div
        const mutationDiv = document.createElement("div");
        mutationDiv.className = "mutation-item mutation-item-selectable";
        mutationDiv.dataset.id = index;

        // Create and append the name (h3)
        const nameH3 = document.createElement("h3");
        nameH3.className = "light-font-color";
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

        if (!mutation.criteria) {
            regularContainer.appendChild(mutationDiv);
        } else if (mutation.criteria === "slot 2–4") {
            slot2or4Container.appendChild(mutationDiv);
        } else if (mutation.criteria === "unlockable") {
            unlockableContainer.appendChild(mutationDiv);
        }

    });
}