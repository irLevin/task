import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { VenuesService } from '../venues.service';
var VenueDetailsComponent = /** @class */ (function () {
    function VenueDetailsComponent(_venueService) {
        this._venueService = _venueService;
        //create an array of venues' details 
        this.venues_details = [];
    }
    VenueDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._venueService.getVenues()
            .subscribe(function (data) { return _this.venues_details = data; });
    };
    VenueDetailsComponent = tslib_1.__decorate([
        Component({
            selector: 'app-venue-details',
            templateUrl: './venue-details.component.html',
            styleUrls: ['./venue-details.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [VenuesService])
    ], VenueDetailsComponent);
    return VenueDetailsComponent;
}());
export { VenueDetailsComponent };
//# sourceMappingURL=venue-details.component.js.map