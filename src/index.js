import _ from "lodash";
import "./style.css";
import {  filteredArrays, retrieveArray, storeArray, tasks } from "./helpers/crud";
import { findTabArray } from "./helpers/utils";

import { renderPage } from "./components/pageElements";
import { renderTaskItems } from "./components/taskElements";
import { renderProjectTab } from "./components/tabElements";
import { eventDelegation } from "./helpers/eventDelegation";
import { pushToArr, } from "./data/taskData";

const staticBtns = filteredArrays().static()
const dynamicBtns = filteredArrays().dynamic()

renderPage();
renderTaskItems(tasks);
renderProjectTab(dynamicBtns, ".project-content-container");
renderProjectTab(staticBtns, ".static-tab-container");
eventDelegation();
