import _ from "lodash";
import "./style.css";
<<<<<<< HEAD
import { filteredArrays } from "./modules/crud";
import { findTabArray } from "./modules/utils";
import { copyArray, localData, storeArray, fetchLocalStorage,  } from "./modules/localStorage";
import { projects } from "./modules/crud";
import { renderPage } from "./modules/page";
import { renderTaskItems } from "./components/taskItems";
import { renderProjectTab } from "./components/sidebar";
import { eventDelegation } from "./modules/eventDelegation";
import { renderTabContent } from "./components/tabNavigation";
import { pushToArr } from "./modules/sortTasks";

const retrievedArray = fetchLocalStorage();

const staticBtns = filteredArrays().static();
const dynamicBtns = filteredArrays().dynamic();
const generalTab = findTabArray(retrievedArray, "tabgeneral");


copyArray()
storeArray()
=======
import { filteredArrays } from "./helpers/crud";
import { filterStaticTasks } from "./helpers/utils";

import { renderPage } from "./components/pageElements";

import { renderProjectTab } from "./components/tabElements";
import { eventDelegation } from "./helpers/eventDelegation";
import { defaultTab } from "./components/tabNavigation";

const staticTasks = filterStaticTasks();
const staticBtns = filteredArrays().static();
const dynamicBtns = filteredArrays().dynamic();

>>>>>>> main
renderPage();
renderProjectTab(dynamicBtns, ".project-content-container");
renderProjectTab(staticBtns, ".static-tab-container");
<<<<<<< HEAD

eventDelegation();

=======
eventDelegation();
defaultTab("tabinbox", staticTasks);
>>>>>>> main
