import _ from "lodash";
import "./style.css";
import {  filteredArrays, retrieveArray, storeArray, projects } from "./helpers/crud";
import { findTabArray } from "./helpers/utils";

import { renderPage } from "./components/pageElements";
import { renderTaskItems } from "./components/taskElements";
import { renderProjectTab } from "./components/tabElements";
import { eventDelegation } from "./helpers/eventDelegation";
import { pushToArr, } from "./data/taskData";


const staticBtns = filteredArrays().static()
const dynamicBtns = filteredArrays().dynamic()
const generalTab = findTabArray("tabgeneral");

/* storeArray(projects)
retrieveArray() */
renderPage();
renderTaskItems(generalTab);
renderProjectTab(dynamicBtns, ".project-content-container");
renderProjectTab(staticBtns, ".static-tab-container");
pushToArr();
eventDelegation();
