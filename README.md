In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `How It Works`

1. The application uses React and the MapsIndoors library to display an interactive map.
2. The map is initialized with the provided API key (mapKey) and displayed in a <mi-map-googlemaps> component.
3. The initial zoom level is set to 19 and the center point is determined by the coordinates of the first venue obtained from the MapsIndoors service.
4. When the MapsIndoors library is ready, an event listener is added to the <mi-map-googlemaps> element to handle the "mapsIndoorsReady" event.
5. Once the map instance is available, it is used to set the zoom level and center point based on the coordinates of the first venue.
6. When a location on the map is clicked, the MapsIndoors instance listens for the "click" event and retrieves information about the clicked location.
7. The location details are stored in the locationDetails state variable and a modal window is opened to display the details.
8. Additionally, the display rules for the clicked location's polygon are set to customize its appearance on the map.
9. The modal window displays the name, building (if available), and venue of the clicked location.

### `Function use in mapsindoors`

1. The code begins with importing necessary dependencies, including React, useEffect, useRef, and useState, as well as a Modal component from an external file.

2. The mapsindoors variable is assigned the value of window?.mapsindoors. This ensures that the code only runs if the mapsindoors library is available.

3. The Maps component is defined as a functional component. It represents the main component of the application.

4. Within the Maps component, there are several hooks and variables defined:

    * mapElementReference is a useRef hook that creates a reference to the mi-map-googlemaps element in the DOM. This reference will be used to add event listeners to the map.
    * isOpen and setIsOpen are state variables that manage the visibility of the modal window.
    * locationDetails and setLocationDetails are state variables used to store information about the clicked location on the map.
    * mapKey is a string variable that holds the MapsIndoors API key used to display the map.
      
5. The first useEffect hook is used to set the initial center point and zoom level of the map. It listens for the "mapsIndoorsReady" event on the mapElementReference and runs the event callback when triggered. Inside the callback, it obtains the map instance using getMapInstance() and sets the zoom level to 19. Then, it fetches the venues using getVenues() and sets the center of the map based on the coordinates of the first venue.

6. The second useEffect hook is responsible for handling the "click" event on the map. It listens for clicks on the mapElementReference and runs the event callback when triggered. Inside the callback, it retrieves the MapsIndoors instance using getMapsIndoorsInstance(). If available, it adds a listener for the "click" event on the MapsIndoors instance. When a location is clicked, it sets the locationDetails state variable, opens the modal window by setting isOpen to true, and customizes the appearance of the clicked location's polygon on the map.

7. The return statement renders the JSX code that represents the component's UI. It includes the <mi-map-googlemaps> element, which is assigned the ref of mapElementReference. This element is responsible for displaying the MapsIndoors map. Additionally, it renders the Modal component with its isOpen prop set to the isOpen state variable. Inside the Modal, the location details are displayed using conditional rendering based on the locationDetails state variable.

### `Acknowledgments`

   MapsIndoors Documentation :- https://app.mapsindoors.com/mapsindoors/js/sdk/4.21.1/docs/
