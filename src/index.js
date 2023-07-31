import _ from "lodash";
import "./style.css";
import {  filteredArrays } from "./modules/crud";
import { findTabArray } from "./modules/utils";

import { renderPage } from "./modules/page";
import { renderTaskItems } from "./components/taskItems";
import { renderProjectTab } from "./components/sidebar";
import { eventDelegation } from "./modules/eventDelegation";
import { renderTabContent } from "./components/tabNavigation";

const staticBtns = filteredArrays().static()
const dynamicBtns = filteredArrays().dynamic()
const generalTab = findTabArray("tabgeneral");

renderPage();
renderTaskItems(generalTab);
renderProjectTab(dynamicBtns, ".project-content-container");
renderProjectTab(staticBtns, ".static-tab-container");
eventDelegation();
