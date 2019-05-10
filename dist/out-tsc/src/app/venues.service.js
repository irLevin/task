import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var VenuesService = /** @class */ (function () {
    function VenuesService(http) {
        this.http = http;
        //url path for file establishment-data.json
        this._urlVenuesJson = "/assets/data/establishment-data.json";
    }
    VenuesService.prototype.getVenues = function () {
        return this.http.get(this._urlVenuesJson);
    };
    VenuesService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], VenuesService);
    return VenuesService;
}());
export { VenuesService };
//# sourceMappingURL=venues.service.js.map