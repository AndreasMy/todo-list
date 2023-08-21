import _ from "lodash";
import "./style.css";
import { filteredArrays, projects } from "./helpers/crud";
import { filterStaticTasks } from "./helpers/utils";
import { renderPage } from "./components/pageElements";
import { retrieveArray } from "./data/localStorage";
import { renderProjectTab } from "./components/tabElements";
import { eventDelegation } from "./helpers/eventDelegation";
import { defaultTab } from "./components/tabNavigation";

console.log(projects)

const staticTasks = filterStaticTasks();
const staticBtns = filteredArrays().static();
const dynamicBtns = filteredArrays().dynamic();

renderPage();
renderProjectTab(dynamicBtns, ".project-content-container");
renderProjectTab(staticBtns, ".static-tab-container");
eventDelegation();
defaultTab("tabinbox", staticTasks);
