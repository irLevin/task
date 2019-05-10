import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { VenuesService } from '../venues.service';
var VenueComponent = /** @class */ (function () {
    function VenueComponent(_venueService) {
        this._venueService = _venueService;
        //create an array of venues
        this.venues_list = [];
    }
    VenueComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._venueService.getVenues()
            .subscribe(function (data) { return _this.venues_list = data; });
    };
    VenueComponent = tslib_1.__decorate([
        Component({
            selector: 'app-venue',
            templateUrl: './venue.component.html',
            styleUrls: ['./venue.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [VenuesService])
    ], VenueComponent);
    return VenueComponent;
}());
export { VenueComponent };
//# sourceMappingURL=venue.component.js.map