import _ from "lodash";
import "./style.css";

import { renderPage } from "./modules/page";
import { renderTaskItems, renderProjectTab } from "./modules/component";
import { eventDelegation } from "./modules/eventDelegation";

renderPage();
renderTaskItems();
renderProjectTab();
eventDelegation();
