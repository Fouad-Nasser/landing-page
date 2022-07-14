/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
    const main = document.getElementById("main");
    const navMenu = document.getElementById("navbar__list");    
    const nav = document.querySelector(".page__header");
    let sectionsArr = Array.from(document.querySelectorAll("section")) ;
    let newListItemStack = []; // to be used in addSection and delSection functions

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

   // create function to scroll smoothly
      function scrollSmoothly(item)
        {
            item.onclick = e => {
                // prevent link from default moving into section 
                    e.preventDefault();

                // get the target section
                    const sectionId = item.getAttribute('href');
                    const target = document.querySelector(sectionId);

                // determine the dimensions of the target section
                    let headerOffset = 100;
                    let elementPosition = target.offsetTop;
                    let offsetPosition = elementPosition - headerOffset;
        
                // scroll to the target section smoothly     
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                };
        }
   /****************************************************************************/  


    // create funcrion to add a new list item to the navbar 
      function addListItem(targetLink,linkText)
        {
          // create a new link  
           const link = document.createElement(`a`);
            link.setAttribute(`class`, `menu__link`);
            link.setAttribute(`href`, `#${targetLink}`);
            link.innerHTML = linkText;

          // create a new list item 
           const listItem = document.createElement(`li`);
            listItem.appendChild(link);

          // make onclick event of new link scroll smoothly
             scrollSmoothly(link);

          // add a new list item to navbar
             navMenu.appendChild(listItem); 

          // add new list item to the newListItemStack
             newListItemStack.push(listItem);

          // show navbar after adding a new item
            nav.classList.remove(`hide`);

          // hide navbar again after 2s 
            setTimeout(hideNav,2000)             
        }
   /******************************************************************************/ 
   
   
    // find out if section is in viewport 
      function isInViewport(el) 
        {
            // Get the dimensions of the section 
                const secPosition = el.getBoundingClientRect();

            // return if the section is in viewport or not
                return (secPosition.top >= 0 && secPosition.left >= 0)&&
                    secPosition.bottom <= (window.innerHeight+450 || document.documentElement.clientHeight+450) &&
                    secPosition.right <= (window.innerWidth || document.documentElement.clientWidth);
                        // add 450 on the buttom to be responsive in smart phones 
        }
   /******************************************************************************/
   
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

   // create the navbar list for sectionsArr's elements 
      function createNavBar()
        {
            // loop through sectionsArr  
            for(let el of sectionsArr)
                {
                    sectioName = el.getAttribute(`data-nav`);
                    sectionLink = el.getAttribute(`id`);

                   // create a list item for each section in the sections array  
                    const listItem = document.createElement(`li`);
                    listItem.innerHTML = `<a class = "menu__link" href = "#${sectionLink}"> ${sectioName} </a>`;

                   // add the above created list item to the nav menu  
                    navMenu.appendChild(listItem);
                }
        }
   /******************************************************************************/


   // create function to hide navbar
      function hideNav()
        {
            nav.classList.add(`hide`);
            
        }
   /*************************************************************************/  
 
   // create function to show navbar when scrolling
      function showNav()
        {
            // show navbar when scroll
                window.addEventListener('scroll',() => {
                    nav.classList.remove(`hide`);

                    // hide navbar again after 2s 
                    setTimeout(hideNav,2000)
            });  
        }
   /***********************************************************************/    


   // create funcrion to Determine which section is active or not
      function takeActiveState()
        {
           for(let el of sectionsArr)
            {
                if(isInViewport(el)) // check if the section is in the viewport
                {
                    el.classList.add(`your-active-class`)
                }
                else // if the section isn't in the viewport remove it
                {
                    el.classList.remove(`your-active-class`)
                }

            }
        }
   /******************************************************************************/


   // create function scroll smoothly to the target section 
     function scrollToSection()
        {
                const listItems = document.querySelectorAll(`.menu__link`);
                 // loop through listItems and apply smooth scroll to each element
                  for(let listItem of listItems) 
                    {
                        scrollSmoothly(listItem);
                    }
        }
   /**********************************************************************/    


   // create funcrion to add a new section
      function addSection()
        {
            // check if the number of sections equal 8
            if(sectionsArr.length==8)
            {
                alert("The max number must be 8 sections");
            }
            else
            {
                // create a new section
                    const newSection = document.createElement("section");

                    const sectioName = "Section " + (sectionsArr.length + 1);
                    const sectionLink = "section" + (sectionsArr.length + 1);

                    // add 'data-nav' and 'id' attribute to the new section
                    newSection.setAttribute('data-nav', sectioName);
                    newSection.setAttribute('id', sectionLink);

                // add new section to the sectionsArr array
                    sectionsArr.push(newSection);

                // add new section to the main in html
                    main.appendChild(newSection);
                    newSection.innerHTML = `
                        <div class="landing__container">
                            <h2>${sectioName}</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

                            <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
                        </div>
                    `;
                     
                // add a new list item to the navbar   
                    addListItem(sectionLink,sectioName);

            }
        } 
   /******************************************************************************/


   // create funcrion to delete the last section
      function delSection()
        {
           // check if the number of sections equal 4 
            if(sectionsArr.length==4)
            {
                alert("There must be at least 4 sections ");
            }
            else
            {
                // remove the last section from the sectionsArr array
                const lastSection = sectionsArr.pop();
                   // remove the last section from main in html
                    main.removeChild(lastSection);

                // remove the last list item from the newListItemStack
                const lastListItem = newListItemStack.pop(); 
                   // remove the last list item from navbar
                    navMenu.removeChild(lastListItem);

                // show navbar after delete the last section 
                 nav.classList.remove(`hide`);

                // hide navbar again after 2s 
                   setTimeout(hideNav,2000)
            }
        }
   /******************************************************************************/


   // create function to scroll to the top
      function scrollTop()
        {
           const goTop = document.querySelector(`.totop`);

            // Check if the user scrolls the page down or not  
                window.onscroll = () => {
                    if(this.scrollY > 800)
                    {
                        goTop.classList.add(`show`);
                    }
                    else
                    {
                        goTop.classList.remove(`show`);
                    }
                };


            // Scroll to the top when clicking on toTop button 
                goTop.onclick = () => {
                    window.scrollTo({
                        top:0,
                        behavior: "smooth"
                    });
                };
        }
   /**************************************************************************/

/**
 * End Main Functions
 * Begin Events
 * 
*/

  // Build menu 
     createNavBar();

  // hide navbar after 3s from page download     
     setTimeout(hideNav,3000);

  // show navbar when scrolling   
     showNav();

  // Scroll smoothly to the target section on link click
     scrollToSection();   

  // Set sections as active when section is in viewport
     document.addEventListener("scroll",takeActiveState);  

  // scroll to top of page  
     scrollTop()
