let downloadBtn = document.querySelector("#download-btn"); 
let resetBtn = document.querySelector("#reset-btn");
const filterContainer = document.querySelector(".filters")
const imgInput = document.querySelector("#image-input");
const imageCanvas = document.querySelector("#image-canvas");
const ctx = imageCanvas.getContext("2d");
let presetContainer = document.querySelector(".presets");
let file = null;
let image = null;

let filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: '%',
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: '%',
        },
        saturate: {
            value: 100,
            min: 0,
            max: 200,
            unit: '%',
        },
        hueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: 'deg',
        },
        blur: {
            value: 0,
            min: 0,
            max: 10,
            unit: 'px',
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: '%',
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: '%',
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: '%',
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: '%',
        },
}  

function createfilterElement(name, unit = "%", value, min, max){
    const div = document.createElement("div");
    div.classList.add("filter");

    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.value = value;
    input.id = name;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input); 
    
    input.addEventListener("input", (e) => {
        filters[name].value = e.target.value;
        applyFilters();
    })

    return div;

}

function createFilters(){
    Object.keys(filters).forEach((key) =>{
    const filterElement = createfilterElement(
        key,
        filters[key].unit, 
        filters[key].value, 
        filters[key].min, 
        filters[key].max);

    filterContainer.appendChild(filterElement);
});

}

createFilters();




imgInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    const placeholder = document.querySelector(".placeholder");
    imageCanvas.style.display = "block";
    placeholder.style.display = "none";

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        image = img;
        imageCanvas.height = img.height;
        imageCanvas.width = img.width;
        ctx.drawImage(img, 0, 0);
    }
})

function applyFilters(){
    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    ctx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturate.value}${filters.saturate.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})`
    .trim();
    ctx.drawImage(image, 0, 0);
}

resetBtn.addEventListener("click",() =>{
    filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: '%',
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: '%',
        },
        saturate: {
            value: 100,
            min: 0,
            max: 200,
            unit: '%',
        },
        hueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: 'deg',
        },
        blur: {
            value: 0,
            min: 0,
            max: 10,
            unit: 'px',
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: '%',
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: '%',
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: '%',
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: '%',
        },
}  

     applyFilters();
     filterContainer.innerHTML = "";
     createFilters();
});

  downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");

    link.download = "image.png";
    link.href = imageCanvas.toDataURL();
    link.click();
}); 

const presets = {
    original: {
        brightness: 100,
        contrast: 100,
        saturate: 100,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    vintage: {
        brightness: 110,
        contrast: 85,
        saturate: 75,
        hueRotation: 350,
        blur: 0,
        grayscale: 10,
        sepia: 35,
        opacity: 100,
        invert: 0
    },

    retro: {
        brightness: 105,
        contrast: 120,
        saturate: 130,
        hueRotation: 345,
        blur: 0,
        grayscale: 0,
        sepia: 15,
        opacity: 100,
        invert: 0
    },

    cinematic: {
        brightness: 90,
        contrast: 135,
        saturate: 80,
        hueRotation: 0,
        blur: 0,
        grayscale: 5,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    blackAndWhite: {
        brightness: 105,
        contrast: 120,
        saturate: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    faded: {
        brightness: 115,
        contrast: 75,
        saturate: 80,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 12,
        opacity: 100,
        invert: 0
    },

    warm: {
        brightness: 105,
        contrast: 105,
        saturate: 115,
        hueRotation: 350,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },

    cool: {
        brightness: 100,
        contrast: 115,
        saturate: 105,
        hueRotation: 190,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    dramatic: {
        brightness: 85,
        contrast: 150,
        saturate: 110,
        hueRotation: 0,
        blur: 0,
        grayscale: 15,
        sepia: 0,
        opacity: 100,
        invert: 0
    },

    dreamy: {
        brightness: 115,
        contrast: 85,
        saturate: 110,
        hueRotation: 0,
        blur: 1,
        grayscale: 0,
        sepia: 8,
        opacity: 100,
        invert: 0
    }
};

Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button");
    presetButton.innerText = presetName;
    presetButton.classList.add("presets");
    presetContainer.appendChild(presetButton);

    presetButton.addEventListener("click", ()=>{
        const preset = presets[presetName];
        Object.keys(preset).forEach((filterName) => {
            filters[filterName].value = preset[filterName];

        })

        applyFilters();
        filterContainer.innerHTML = "";
        createFilters();
    })
})