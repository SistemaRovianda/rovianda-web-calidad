import { NgModule } from "@angular/core";
import { DashboardRoutingModule } from './dashboard.routing';

const COMMON_DECLARATIONS = [];

const COMMON_IMPORTS = [DashboardRoutingModule];

@NgModule({
    declarations: COMMON_DECLARATIONS,
    imports: COMMON_IMPORTS,
    exports: COMMON_DECLARATIONS
})
export class LayoutModule {}
