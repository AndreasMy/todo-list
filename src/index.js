import _ from "lodash";
import "./style.css";
import { filteredArrays } from "./helpers/crud";
import { filterStaticTasks } from "./helpers/utils";

import { renderPage } from "./components/pageElements";

import { renderProjectTab } from "./components/tabElements";
import { eventDelegation } from "./helpers/eventDelegation";
import { defaultTab } from "./components/tabNavigation";

const staticTasks = filterStaticTasks();
const staticBtns = filteredArrays().static();
const dynamicBtns = filteredArrays().dynamic();

renderPage();
renderProjectTab(dynamicBtns, ".project-content-container");
renderProjectTab(staticBtns, ".static-tab-container");
eventDelegation();
defaultTab("tabinbox", staticTasks);
