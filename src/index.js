import _ from "lodash";
import "./style.css";
import { projects, staticTabs } from "./modules/crud";

import { renderPage } from "./modules/page";
import { renderTaskItems } from "./components/tabNavigation";
import { renderProjectTab } from "./components/sidebar";
import { eventDelegation } from "./modules/eventDelegation";
import { tasks } from "./modules/crud";

renderPage();
renderTaskItems(tasks);
renderProjectTab(projects, ".project-content-container");
renderProjectTab(staticTabs, ".static-tab-container");
eventDelegation();
