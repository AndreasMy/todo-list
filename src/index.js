import _ from "lodash";
import "./style.css";
import {  filteredArrays, retrieveArray, storeArray, tasks } from "./helpers/crud";
import { findTabArray, filterStaticTasks } from "./helpers/utils";

import { renderPage } from "./components/pageElements";
import { renderTaskItems } from "./components/taskElements";
import { renderProjectTab } from "./components/tabElements";
import { eventDelegation } from "./helpers/eventDelegation";
import { defaultTab } from "./components/tabNavigation";


const staticTasks = filterStaticTasks()
const staticBtns = filteredArrays().static()
const dynamicBtns = filteredArrays().dynamic()


renderPage();
renderProjectTab(dynamicBtns, ".project-content-container");
renderProjectTab(staticBtns, ".static-tab-container");
eventDelegation();
defaultTab("tabinbox", staticTasks)
