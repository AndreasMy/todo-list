import _ from "lodash";
import "./style.css";

import { renderPage } from "./modules/page";
import { renderTaskItems } from "./components/taskItems";
import { renderProjectTab } from "./components/sidebar";
import { eventDelegation } from "./modules/eventDelegation";
import { tasks } from "./modules/crud";

renderPage();
renderTaskItems(tasks);
renderProjectTab();
eventDelegation();
