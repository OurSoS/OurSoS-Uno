import { Href } from "../link/href";
import type { RouterStore } from "./router-store";
export declare function push(this: RouterStore, url: Href): void;
export declare function replace(this: RouterStore, url: Href): void;
export declare function goBack(this: RouterStore): void;
export declare function canGoBack(this: RouterStore): boolean;
export declare function setParams(this: RouterStore, params?: Record<string, string | number>): any;
export declare function linkTo(this: RouterStore, href: string, event?: string): void;
//# sourceMappingURL=routing.d.ts.map