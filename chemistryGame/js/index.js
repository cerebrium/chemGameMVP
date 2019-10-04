const countControl = (function() {
/******** *******************************************************
 ************************* PRIVATE ************************************************************
 * *************************************************************************************/ 

    const data = {
        enumurator : 0,
        lineEnum : 0,
        eventListener : true,
        linesCreated : [],
    }

    // array for keeping created elements in
    let elementsCreated = [];


/******** *******************************************************
************************* PUBLIC ************************************************************
* *************************************************************************************/ 

    return {
        returnData : function () {
            return data
        },

        returnEleCreated : function () {
            return elementsCreated
        },
    }
})();

const uiControl = (function() {

/******** *******************************************************
************************* PRIVATE ************************************************************
* *************************************************************************************/ 

     // DOM
    const DOM = {
        body : document.getElementById('body'),
        hydrogenButton: document.getElementById('hydrogenButton'),
        oxygenButton: document.getElementById('oxygenButton'),
        nitrogenButton: document.getElementById('nitrogenButton'),
        carbonButton: document.getElementById('carbonButton'),
        ele: '',
        currentVar: '',
        resetButton: document.getElementById('reset'),
        // $element: $(''),
    }

/******** *******************************************************
************************* PUBLIC ************************************************************
* *************************************************************************************/ 

    return {
        returnDOM : function () {
            return DOM;
        },

        returnCollision : function () {
            return collisionDetector;
        }
    }

})();

const gameControl = (function(count, ui) {
/******** *******************************************************
************************* PRIVATE ************************************************************
* *************************************************************************************/ 

    // DOM
    const dom = ui.returnDOM();
    const data = count.returnData();
    const createdElements = count.returnEleCreated();

    // event listeners

    // set the mouse click x and y to the elements x and y
    let mouseDown = function() {
        document.addEventListener('mousemove', function(event) {
            if (data.eventListener) {
                let checker = dom.ele.id.toString();
                createdElements.forEach(function(element) {
                    if (element.name == checker) {
                        element.x = document.getElementById(dom.ele.id).getBoundingClientRect().left;
                        element.y = document.getElementById(dom.ele.id).getBoundingClientRect().top;
                    }
                })
                dom.ele.style.top = event.clientY + "px";
                dom.ele.style.left = event.clientX + "px";
            }
        })
    }
    // This is the mousedown and dragging function
    let mouseMove = document.addEventListener('mousedown', function(event) {
        if (event.target.id.toString() != 'body' &&
        event.target.id.toString() != 'hydrogenButton' &&
        event.target.id.toString() != 'nitrogenButton' &&
        event.target.id.toString() != 'oxygenButton' &&
        event.target.id.toString() != 'carbonButton') {
            dom.ele = document.getElementById(event.target.id);
            data.eventListener = true;
                if (event.target.id.toString() != 'body' && 
                    event.target.id.toString() != 'oxygenButton' &&
                    event.target.id.toString() != 'hydrogenButton' &&
                    event.target.id.toString() != 'nitrogenButton' &&
                    event.target.id.toString() != 'carbonButton') {
                    for (i = 0; i < createdElements.length; i++) {
                        for (b = 1; b < createdElements.length; b++) {
                            if (i !== b) {
                                if ((createdElements[i].x+25) < (createdElements[b].x+25)  + createdElements[b].radius &&
                                    (createdElements[i].x+25) + createdElements[i].radius > (createdElements[b].x+25)  &&
                                    (createdElements[b].y+25) < (createdElements[i].y+25)  + createdElements[i].radius &&
                                    (createdElements[b].y+25) + createdElements[b].radius > (createdElements[i].y+25) ) {                          
                                    // making it single bonds
                                    // for (a = 0; a < createdElements[i].bondsAllowed.length; a++) {
                                    //     for (c = 1; c < createdElements[i].bondsAllowed.length; c++) {
                                    //         if (a !== c) {
                                    //             if (createdElements[i].bondsAllowed[a] !== createdElements[i].bondsAllowed[c]) {
                                                
                                                    // collision detection triggered
                                                    console.log(`collision between ${createdElements[i].name} and ${createdElements[b].name}`)
                                                        
                                                    // adding line
                                                    if (createdElements[i].bondsAllowed.length < createdElements[i].bondsNum && createdElements[b].bondsAllowed.length < createdElements[b].bondsNum) {

                                                        console.log('collision part two')

                                                        // pushing name of bonding element to bondsAllowed array within bonded element
                                                        createdElements[i].bondsAllowed.push(createdElements[b].name);
                                                        createdElements[b].bondsAllowed.push(createdElements[i].name);

                                                        // if i is above and to the left of b
                                                        if (createdElements[i].y < createdElements[b].y &&
                                                            createdElements[i].x < createdElements[b].x) {
                                                                console.log('line creation entered')
                                                                let child = document.createElement(`div`);
                                                                child.setAttribute('id', `${createdElements[i].name}_${createdElements[b].name}`);
                                                                document.body.appendChild(child)
                                                                data.linesCreated.push(`${createdElements[i].name}_${createdElements[b].name}`)
                                                                let topT = (createdElements[i].y + 30);
                                                                let bottomT = (createdElements[b].y + 30);
                                                                let leftT = (createdElements[i].x + 30);
                                                                let rightT = (createdElements[b].x + 30);
                                                                let heightT = 3;
                                                                let widthT = (Math.sqrt(((rightT-leftT)**2+(bottomT-topT)**2)));
                                                                let transformT = 10+((Math.sin((Math.abs(topT-bottomT)/widthT)))*180/Math.PI);
                                                                child.style.transformOrigin = `${leftT} ${topT}`
                                                                child.style.zIndex = '-1';
                                                                child.style.top = topT + 'px';
                                                                child.style.left = leftT + 'px';
                                                                child.style.bottom = bottomT  + 'px'; 
                                                                child.style.right = rightT + 'px'; 
                                                                child.style.height = heightT + 'px'; 
                                                                child.style.width = widthT + 'px';
                                                                child.style.backgroundColor = 'black';
                                                                child.style.position = 'absolute';
                                                                child.style.transform = `rotate(${transformT}deg)`;
                                                                data.lineEnum++;
                                                                console.log(transformT, ' is rotating around')

                                                            // if i is above and to the right of b    
                                                            } else if (createdElements[i].y < createdElements[b].y &&
                                                                    createdElements[i].x > createdElements[b].x) {
                                                                console.log('line creation entered')
                                                                let child = document.createElement(`div`);
                                                                child.setAttribute('id', `${createdElements[i].name}_${createdElements[b].name}`);
                                                                document.body.appendChild(child)
                                                                data.linesCreated.push(`${createdElements[i].name}_${createdElements[b].name}`)
                                                                let topT = (createdElements[i].y + 35);
                                                                let bottomT = (createdElements[b].y + 30);
                                                                let leftT = (createdElements[b].x + 25);
                                                                let rightT = (createdElements[i].x + 30);
                                                                let heightT = 3;
                                                                let widthT = (Math.sqrt(((rightT-leftT)**2+(bottomT-topT)**2)));
                                                                let transformT = (90+((Math.sin((Math.abs(topT-bottomT)/widthT)))*180/Math.PI));
                                                                child.style.transformOrigin = `${rightT} ${topT}`
                                                                child.style.zIndex = '-1';
                                                                child.style.top = topT + 'px';
                                                                child.style.left = leftT + 'px';
                                                                child.style.bottom = bottomT  + 'px'; 
                                                                child.style.right = rightT + 'px'; 
                                                                child.style.height = heightT + 'px'; 
                                                                child.style.width = widthT + 'px';
                                                                child.style.backgroundColor = 'black';
                                                                child.style.position = 'absolute';
                                                                child.style.transform = `rotate(${transformT}deg)`;
                                                                data.lineEnum++;
                                                                console.log(transformT, ' is rotating around')

                                                            // if i is below and to the right of b    
                                                            } else if (createdElements[i].y > createdElements[b].y &&
                                                                    createdElements[i].x > createdElements[b].x) {
                                                                console.log('line creation entered')
                                                                let child = document.createElement(`div`);
                                                                child.setAttribute('id', `${createdElements[i].name}_${createdElements[b].name}`);
                                                                document.body.appendChild(child)
                                                                data.linesCreated.push(`${createdElements[i].name}_${createdElements[b].name}`)
                                                                let topT = (createdElements[b].y + 45);
                                                                let bottomT = (createdElements[i].y + 30);
                                                                let leftT = (createdElements[b].x + 25);
                                                                let rightT = (createdElements[i].x + 30);
                                                                let heightT = 3;
                                                                let widthT = (Math.sqrt(((rightT-leftT)**2+(bottomT-topT)**2)));
                                                                let transformT = (180+((Math.sin((Math.abs(topT-bottomT)/widthT)))*180/Math.PI));
                                                                child.style.transformOrigin = `${rightT} ${bottomT}`
                                                                child.style.zIndex = '-1';
                                                                child.style.top = topT + 'px';
                                                                child.style.left = leftT + 'px';
                                                                child.style.bottom = bottomT  + 'px'; 
                                                                child.style.right = rightT + 'px'; 
                                                                child.style.height = heightT + 'px'; 
                                                                child.style.width = widthT + 'px';
                                                                child.style.backgroundColor = 'black';
                                                                child.style.position = 'absolute';
                                                                child.style.transform = `rotate(${transformT}deg)`;
                                                                data.lineEnum++;
                                                                console.log(transformT, ' is rotating around')

                                                            // if i is below and to the left of b    
                                                            } else if (createdElements[i].y > createdElements[b].y &&
                                                                    createdElements[i].x < createdElements[b].x) {
                                                                console.log('line creation entered')
                                                                let child = document.createElement(`div`);
                                                                child.setAttribute('id', `${createdElements[i].name}_${createdElements[b].name}`);
                                                                document.body.appendChild(child)
                                                                data.linesCreated.push(`${createdElements[i].name}_${createdElements[b].name}`)
                                                                let topT = (createdElements[b].y + 45);
                                                                let bottomT = (createdElements[i].y + 30);
                                                                let leftT = (createdElements[i].x + 30);
                                                                let rightT = (createdElements[b].x + 30);
                                                                let heightT = 3;
                                                                let widthT = (Math.sqrt(((rightT-leftT)**2+(bottomT-topT)**2)));
                                                                let transformT = (360-((Math.sin((Math.abs(topT-bottomT)/widthT)))*180/Math.PI));
                                                                child.style.transformOrigin = `${leftT} ${bottomT}`
                                                                child.style.zIndex = '-1';
                                                                child.style.top = topT + 'px';
                                                                child.style.left = leftT + 'px';
                                                                child.style.bottom = bottomT  + 'px'; 
                                                                child.style.right = rightT + 'px'; 
                                                                child.style.height = heightT + 'px'; 
                                                                child.style.width = widthT + 'px';
                                                                child.style.backgroundColor = 'black';
                                                                child.style.position = 'absolute';
                                                                child.style.transform = `rotate(${transformT}deg)`;
                                                                data.lineEnum++;
                                                                console.log(transformT, ' is rotating around')
                                                            } 
                                                        }
                                        //             };
                                        //         }
                                        //     }
                                        // }    
                                        
                                    }    
                                } 
                            }
                        }    
                    // removing lines if not in collusion with each other
                        for (i = 0; i < createdElements.length; i++) {
                            for (b = 1; b < createdElements.length; b++) {
                                if (i !== b) {
                                    for (a = 0; a < createdElements[i].bondsAllowed.length; a++) {
                                        for (c = 0; c < createdElements[b].bondsAllowed.length; c++) {
                                            console.log('wtf')
                                            for (let newVar = 0; newVar < 100; newVar++) {
                                                console.log(newVar)
                                                if (createdElements[i].bondsAllowed[a] == `oxygen_${newVar}` &&
                                                    createdElements[b].bondsAllowed[c] == `oxygen_${newVar}`) {
                                                        console.log('water')
                                                        let imageCreation = document.getElementById('image_1');
                                                        let title = document.getElementById('topWords')
                                                        title.textContent = 'YOU WIN';
                                                        imageCreation.src = 'water.png';
                                                    }
                                                }
                                    if ((createdElements[i].x+25) > (createdElements[b].x+25) + (createdElements[b].radius + 20) ||
                                        (createdElements[i].x+25) + (createdElements[i].radius+20) < (createdElements[b].x+25)  ||
                                        (createdElements[b].y+25) > (createdElements[i].y+25)  + (createdElements[i].radius+20) ||
                                        20 + (createdElements[b].y+25) + (createdElements[b].radius+20) < (createdElements[i].y+25) ) {
                                    // logic for checking 
                                            let divToRemoveI = document.getElementById(`${createdElements[b].bondsAllowed[c]}_${createdElements[i].bondsAllowed[a]}`);
                                            let divToRemoveB = document.getElementById(`${createdElements[i].bondsAllowed[a]}_${createdElements[b].bondsAllowed[c]}`);
                                            console.log(divToRemoveI, divToRemoveB)
                                            if (divToRemoveB != null) {
                                                document.body.removeChild(divToRemoveB)
                                                let divToRemoveBTwo = createdElements[b].bondsAllowed.indexOf(`${createdElements[i].bondsAllowed[a]}_${createdElements[b].bondsAllowed[c]}`)
                                                let divToRemoveITwo = createdElements[i].bondsAllowed.indexOf(`${createdElements[i].bondsAllowed[a]}_${createdElements[b].bondsAllowed[c]}`)
                                                createdElements[b].bondsAllowed.splice(divToRemoveBTwo, 1);
                                                createdElements[i].splice(divToRemoveITwo, 1);
                                            } else if (divToRemoveI != null) {
                                                document.body.removeChild(divToRemoveI);
                                                let divToRemoveBTwo = createdElements[b].bondsAllowed.indexOf(`${createdElements[i].bondsAllowed[a]}_${createdElements[b].bondsAllowed[c]}`)
                                                let divToRemoveITwo = createdElements[b].bondsAllowed.indexOf(`${createdElements[i].bondsAllowed[a]}_${createdElements[b].bondsAllowed[c]}`)
                                                createdElements[b].bondsAllowed.splice(divToRemoveBTwo, 1);
                                                createdElements[i].bondsAllowed.splice(divToRemoveITwo, 1);
                                            }
                                        }
                                    }
                                }
                            }
                        }   
                    }
                } 
            }
        mouseDown(event);
    })
    // })

    // check for wi

    let mouseNotMove = document.addEventListener('mouseup',  function(event) {
        data.eventListener = false;   
    })

    // Button event listeners
    // button creating hydrogen elements
    dom.hydrogenButton.addEventListener('click', function(event) {
        let newHydrogenElement = document.createElement(`div`);
        newHydrogenElement.setAttribute('id', `hydrogen_${data.enumurator}`);
        newHydrogenElement.setAttribute('class', `hydrogen`);
        newHydrogenElement.textContent = 'H';
        document.body.appendChild(newHydrogenElement);
        let hydrogeny = document.getElementById(`hydrogen_${data.enumurator}`)
        hydrogeny.style.background = 'yellow'
        let nameEle = `hydrogen_${data.enumurator}`
        let hydrogen = new Object ();
        hydrogen.bondsNum = 1;
        hydrogen.name = nameEle;
        hydrogen.bondsAllowed = [];
        hydrogen.type = 'hydrogen';
        hydrogen.radius = 75;
        hydrogen.x = event.clientX;
        hydrogen.y = event.clientY;
        createdElements.push(hydrogen);
        data.enumurator++
    })

    // button creating oxygen elements
    dom.oxygenButton.addEventListener('click', function(event) {
        let newOxygenElement = document.createElement(`div`);
        newOxygenElement.setAttribute('id', `oxygen_${data.enumurator}`);
        newOxygenElement.setAttribute('class', `oxygen`);
        newOxygenElement.textContent = 'O';
        document.body.appendChild(newOxygenElement);
        let oxygeny = document.getElementById(`oxygen_${data.enumurator}`)
        oxygeny.style.background = 'teal'
        let oxygen = new Object ();
        let nameEle = `oxygen_${data.enumurator}`
        oxygen.bondsNum = 2;
        oxygen.name = nameEle;
        oxygen.bondsAllowed = [];
        oxygen.type = 'oxygen';
        oxygen.radius = 75;
        oxygen.x = event.clientX;
        oxygen.y = event.clientY;
        createdElements.push(oxygen);
        data.enumurator++
    })

    // button creating nitrogen elements
    dom.nitrogenButton.addEventListener('click', function(event) {
        let newNitrogenElement = document.createElement(`div`);
        newNitrogenElement.setAttribute('id', `nitrogen_${data.enumurator}`);
        newNitrogenElement.setAttribute('class', `nitrogen`);
        newNitrogenElement.textContent = 'N';
        document.body.appendChild(newNitrogenElement);
        let nitrogeny = document.getElementById(`nitrogen_${data.enumurator}`)
        nitrogeny.style.background = 'red';
        let nitrogen = new Object ();
        let nameEle = `nitrogen_${data.enumurator}`
        nitrogen.bondsNum = 3;
        nitrogen.name = nameEle;
        nitrogen.bondsAllowed = [];
        nitrogen.type = 'nitrogen';
        nitrogen.radius = 75;
        nitrogen.x = event.clientX;
        nitrogen.y = event.clientY;
        createdElements.push(nitrogen);
        data.enumurator++
    })

    // button creating carbon elements
    dom.carbonButton.addEventListener('click', function(event) {
        let newCarbonElement = document.createElement(`div`);
        newCarbonElement.setAttribute('id', `carbon_${data.enumurator}`);
        newCarbonElement.setAttribute('class', `carbon`);
        newCarbonElement.textContent = 'C';
        document.body.appendChild(newCarbonElement);
        let carbony = document.getElementById(`carbon_${data.enumurator}`)
        carbony.style.background = 'grey';
        let carbon = new Object ();
        let nameEle = `carbon_${data.enumurator}`
        carbon.bondsNum = 4;
        carbon.name = nameEle;
        carbon.bondsAllowed = [];
        carbon.type = 'carbon';
        carbon.radius = 75;
        carbon.x = event.clientX;
        carbon.y = event.clientY;
        createdElements.push(carbon);
        data.enumurator++
    })

    dom.resetButton.addEventListener('click', function() {
        let cleanUp = document.body.querySelectorAll('div');
        for (i = 0; i < cleanUp.length; i++) {
            console.log(cleanUp)
            cleanUp[i].remove();
            let imageCreation = document.getElementById('image_1');
            let title = document.getElementById('topWords')
            title.textContent = 'Make Water!';
            imageCreation.src = '';
        }
        for (i = 0; i < createdElements.length; i++) {
            for (b = 1; b < createdElements.length; b++) {
                if (i !== b) {
                    console.log(createdElements)
                    for (a = 0; a < createdElements[i].bondsAllowed.length; a++) {
                        for (c = 0; c < createdElements[b].bondsAllowed.length; c++) {
                            createdElements[i].bondsAllowed[a] = '';
                            createdElements[b].bondsAllowed[b] = '';
                        }
                    }
                }
            }
        }
    })


     /******** *******************************************************
     ************************* PUBLIC ************************************************************
     * *************************************************************************************/

    return {
        init: function() {
            mouseMove;
            mouseNotMove;
        }
    }
})(countControl, uiControl);

gameControl.init();


